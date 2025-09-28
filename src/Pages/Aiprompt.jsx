import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Select from 'react-select'
import { IoSparklesOutline } from 'react-icons/io5'
import { IoMdCopy } from "react-icons/io";
import { CiSaveUp2 } from "react-icons/ci";
import { GoCodescan } from "react-icons/go";
import Editor from "@monaco-editor/react";
import { GoogleGenAI } from "@google/genai";
import { toast } from 'react-toastify';
import { ImNewTab } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";

const options = [
  { value: 'html-css', label: 'HTML + CSS' },
  { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
  { value: 'html-css-js', label: 'HTML + CSS + JS' },
  { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
  { value: 'react-tailwind', label: 'REACT + Tailwind CSS' },
  { value: 'react-css', label: 'REACT + CSS' },
];

const frameworkToLanguage = {
  "html-css": "html",
  "html-tailwind": "html",
  "html-css-js": "html",
  "html-bootstrap": "html",
  "react-css": "javascript",
  "react-tailwind": "javascript",
};

function wrapHtmlForPreview(code) {
  if (/<html[\s\S]*?>/i.test(code)) return code;

  const importRegex = /@import[\s\S]*?;/g;
  const imports = code.match(importRegex) || [];
  code = code.replace(importRegex, "");

  const styleRegex = /<style[\s\S]*?>[\s\S]*?<\/style>/gi;
  const styles = code.match(styleRegex) || [];
  code = code.replace(styleRegex, "");

  let looseCss = "";
  const cssVarRegex = /:root\s*{[\s\S]*?}/g;
  const cssVars = code.match(cssVarRegex) || [];
  looseCss += cssVars.join("\n");
  code = code.replace(cssVarRegex, "");

  const htmlContent = code;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Component Preview</title>
        ${imports.length > 0 ? `<style>${imports.join('\n')}</style>` : ""}
        ${styles.join('\n')}
        ${looseCss ? `<style>${looseCss}</style>` : ""}
        <style>body { margin: 0; background: #fff; }</style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;
}

const Aiprompt = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [generate, setgenerate] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [outputscreen, setoutputscreen] = useState(false);
  const [code, setCode] = useState("// Write your code here...");
  const [prompt, setprompt] = useState('');
  const [newtab, setnewtab] = useState(false);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_REACT_APP_GEMINI_API_KEY });

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy:", err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const extension = frameworkToLanguage[selectedOption.value] === "html" ? "html" : "js";
    link.href = url;
    link.download = `generated-code.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  async function getresponse() {
  setgenerate(true);

  let codePrompt;
  if(selectedOption.value === "react-css" || selectedOption.value === "react-tailwind") {
    codePrompt = `
You are an experienced React developer. Generate a modern, responsive login page as a functional React component using JSX syntax${selectedOption.value === "react-tailwind" ? " with Tailwind CSS classes" : ""}.
- Do NOT include any HTML, <html>, <head> or <body> tags.
- Return ONLY the React component code inside **Markdown fenced code blocks**.
- Do NOT include explanations, text, comments, or anything else besides the component code.
`;
  } else {
    codePrompt =    ` You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${selectedOption.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.`
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: codePrompt,
  });

  let cleaned = response.text?.match(/```(?:\w+)?\n([\s\S]*?)```/i);
let finalCode = cleaned && cleaned[1] ? cleaned[1].trim() : "// Unable to parse code from response.";

setCode(finalCode);
setoutputscreen(true);
setgenerate(false);

}


  return (
    <div>
      <Navbar />
      <br />
      <div className="flex flex-col lg:flex-row min-h-screen gap-4 md:gap-8 lg:gap-10 px-2 md:px-4 lg:px-10">
        <div className="bg-[#141319] w-full lg:w-1/2 px-2 md:px-6 py-6 md:py-8 flex flex-col rounded-xl max-w-full">
          <h1 className="text-white text-center text-2xl font-semibold mb-6">
            Bring your ideas to life
          </h1>

          <label htmlFor="framework-select" className="text-white mb-2 block">
            Framework
          </label>
          <Select
            inputId="framework-select"
            className="mb-6"
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="Select..."
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: '#181820',
                border: 'none',
                boxShadow: 'none',
                color: 'white',
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: '#181820',
                color: 'white',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'white',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#9ca3af',
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#7c3aed44',
                primary: '#7c3aed',
              },
            })}
          />

          <p className="text-white text-center mb-4 pt-4">
            Describe your component and let AI code it for you.
          </p>

          <fieldset className="border border-gray-600 rounded-lg p-4 mb-6">
            <legend className="text-purple-400 px-2 font-semibold">
              Your Description
            </legend>
            <textarea
              onChange={(e) => setprompt(e.target.value)}
              className="w-full h-[60vh] resize-none rounded-lg bg-[#181820] text-white placeholder-gray-400 px-4 py-3 focus:ring-2 focus:ring-purple-500 border-none outline-none"
              placeholder="Describe what component you want to build"
              spellCheck={false}
              rows={15}
            />
          </fieldset>

          <div className="flex justify-end">
            <button
              onClick={getresponse}
              className="flex h-14 w-32 text-black rounded-2xl justify-center items-center bg-gradient-to-r from-blue-400 to-pink-400 mr-4 hover:opacity-[70%] active:translate-x-1"
            >
              {generate ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <IoSparklesOutline className="mr-2 text-lg" />
              )}
              <span className="text-sm font-medium">Generate</span>
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-2 md:px-6 py-6 md:py-8 flex flex-col mt-6 lg:mt-0 rounded-xl max-w-full">
          <div className="bg-[#141319] h-10 flex w-full gap-2 md:gap-4 rounded-t-xl">
            <div className="bg-[#141319] h-10 flex w-full gap-2 md:gap-4 items-center rounded-t-xl">
              <p
                onClick={() => setActiveTab("code")}
                className={`cursor-pointer px-4 ${
                  activeTab === "code"
                    ? "border-b-2 border-white text-white"
                    : "text-white"
                }`}
              >
                CODE
              </p>
              <p
                onClick={() => setActiveTab("preview")}
                className={`cursor-pointer px-4 ${
                  activeTab === "preview"
                    ? "border-b-2 border-white text-white"
                    : "text-white"
                }`}
              >
                PREVIEW
              </p>
            </div>

            <div className="flex w-full justify-end gap-4">
              <div
                className="text-4xl hover:opacity-35 cursor-pointer"
                onClick={copyCode}
              >
                <IoMdCopy />
              </div>
              <div
                className="text-4xl hover:opacity-35 cursor-pointer"
                onClick={downloadCode}
              >
                <CiSaveUp2 />
              </div>
              <div
                onClick={() => {
                  setnewtab(true);
                }}
                className="text-4xl hover:opacity-35 cursor-pointer"
              >
                <ImNewTab />
              </div>
            </div>
          </div>
{outputscreen ? (
  activeTab === "code" ? (
  <div className="h-[40vh] md:h-screen w-full">
      <Editor
        height="100%"
        defaultLanguage={
          frameworkToLanguage[selectedOption.value] || "javascript"
        }
        value={code}
        onChange={(newValue) => setCode(newValue)}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  ) : (
    (selectedOption.value === "react-css" || selectedOption.value === "react-tailwind") ? (
  <div className="flex flex-col justify-center items-center h-[40vh] md:h-screen w-full bg-white rounded-xl">
        <p className="text-lg text-gray-800 font-semibold mt-10">
          Preview not supported for React components.<br/>
          Copy and run the code in your local React app.
        </p>
      </div>
    ) : (
  <div className="h-[40vh] md:h-screen w-full bg-white rounded-xl">
        <iframe
          srcDoc={wrapHtmlForPreview(code)}
          className="preview w-full h-full border-none bg-white text-black flex flex-1 items-center justify-center"
          title="Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    )
  )
) : (
  activeTab === "code" && (
  <div className="flex bg-[#3f21d4] flex-1 justify-center items-center gap-4 text-5xl md:text-7xl lg:text-9xl rounded-xl">
      <GoCodescan />
    </div>
  )
)}

        </div>
      </div>

      {newtab && (
  <div className="absolute inset-0 bg-white w-screen h-screen overflow-auto rounded-xl">
          <div
            className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100 relative z-20"
          >
            <p className="font-bold">Preview</p>
            <button
              onClick={() => setnewtab(false)}
              className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200"
            >
              <RxCross2 />
            </button>
          </div>
          <iframe
            srcDoc={wrapHtmlForPreview(code)}
            className="container absolute left-0 top-[60px] right-0 bottom-0 bg-white w-screen min-h-[calc(100vh-60px)] overflow-auto z-10"
            title="Preview"
            sandbox="allow-scripts allow-same-origin"
            style={{ position: "absolute" }}
          />
        </div>
      )}
    </div>
  );
};

export default Aiprompt;
