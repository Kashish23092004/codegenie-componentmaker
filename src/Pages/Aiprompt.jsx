import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Components/Navbar'
import Select from 'react-select'
import { IoSparklesOutline } from 'react-icons/io5'
import { IoMdCopy } from "react-icons/io";
import { CiSaveUp2 } from "react-icons/ci";
import { GoCodescan } from "react-icons/go";
import Editor from "@monaco-editor/react";
import { GoogleGenAI } from "@google/genai";
import { toast } from 'react-toastify';

const options = [
  { value: 'html-css', label: 'HTML + CSS' },
  { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
  { value: 'html-css-js', label: 'HTML + CSS + JS' },
  { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
];

const frameworkToLanguage = {
  "html-css": "html",
  "html-tailwind": "html",
  "html-css-js": "html",
  "html-bootstrap": "html",
  "react": "javascript",
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
  const [selectedOption, setSelectedOption] = useState(options[1]);
  const [generate, setGenerate] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [outputScreen, setOutputScreen] = useState(false);
  const [code, setCode] = useState("// Write your code here...");
  const [framework, setFramework] = useState(options[0]);
  const [prompt, setPrompt] = useState('');

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_REACT_APP_GEMINI_API_KEY });

  const previewWindowRef = useRef(null);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy: " + err);
    }
  };

  // Extract code from markdown fenced block (``````)
  function extractCode(response) {
    const match = response.match(/``````/);
    return match ? match[1].trim() : response.trim();
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const extension = frameworkToLanguage[framework.value] === "html" ? "html" : "js";
    link.href = url;
    link.download = `generated-code.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  async function getresponse() {
    if (!prompt.trim()) {
      toast.error("Please enter a component description.");
      return;
    }
    setGenerate(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
         You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

         Now, generate a UI component for: ${prompt}  
         Framework to use: ${framework.value}  

         Requirements:  
         - The code must be clean, well-structured, and easy to understand.  
         - Optimize for SEO where applicable.  
         - Focus on creating a modern, animated, and responsive UI design.  
         - Include high-quality hover effects, shadows, animations, colors, and typography.  
         - Return ONLY the code, formatted properly in Markdown fenced code blocks.  
         - Do NOT include explanations, text, comments, or anything else besides the code.  
         - And give the whole code in a single HTML file.
        `,
      });
      if (!response || typeof response.text !== "string") {
        throw new Error("No response text received from AI");
      }
      const cleanedCode = extractCode(response.text);
      setCode(cleanedCode);
      setOutputScreen(true);
      setActiveTab("code");
    } catch (error) {
      toast.error("Failed to generate code: " + (error.message || error));
    }
    setGenerate(false);
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'preview') {
      openOrUpdatePreviewWindow();
    } else {
      if (previewWindowRef.current && !previewWindowRef.current.closed) {
        previewWindowRef.current.close();
        previewWindowRef.current = null;
      }
    }
  };

  const openOrUpdatePreviewWindow = () => {
    const content = wrapHtmlForPreview(code);
    const width = 900;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    if (!previewWindowRef.current || previewWindowRef.current.closed) {
      previewWindowRef.current = window.open(
        "",
        "ComponentPreview",
        `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`
      );
    }

    if (previewWindowRef.current) {
      previewWindowRef.current.document.title = "Component Preview";
      previewWindowRef.current.document.body.style.margin = "0";
      previewWindowRef.current.document.body.style.background = "#fff";
      previewWindowRef.current.document.documentElement.innerHTML = content;
      previewWindowRef.current.focus();
    }
  };

  useEffect(() => {
    return () => {
      if (previewWindowRef.current && !previewWindowRef.current.closed) {
        previewWindowRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <div className="flex min-h-screen gap-10 px-4">
        <div className="bg-[#141319] w-1/2 px-6 py-8 flex flex-col rounded-lg">
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
            onChange={(selected) => {
              setFramework(selected);
              setSelectedOption(selected);
            }}
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
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-[60vh] resize-none rounded-lg bg-[#181820] text-white placeholder-gray-400 px-4 py-3 focus:ring-2 focus:ring-purple-500 border-none outline-none"
              placeholder="Describe what component you want to build"
              spellCheck={false}
              rows={15}
              value={prompt}
            />
          </fieldset>

          <div className="flex justify-end">
            <button
              onClick={getresponse}
              className="flex h-14 w-32 text-black rounded-2xl justify-center items-center bg-gradient-to-r from-blue-400 to-pink-400 mr-4 hover:opacity-[70%] active:translate-x-1 transition"
              disabled={generate}
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

        <div className="w-1/2 px-6 py-8 flex flex-col rounded-lg">
          <div className="bg-[#141319] h-10 flex w-full gap-4 border-b border-gray-800">
            <div className="h-10 flex w-full gap-4 items-center">
              <p
                onClick={() => handleTabChange("code")}
                className={`cursor-pointer px-4 ${
                  activeTab === "code"
                    ? "border-b-2 border-white text-white"
                    : "text-white hover:text-gray-300"
                }`}
              >
                CODE
              </p>
              <p
                onClick={() => handleTabChange("preview")}
                className={`cursor-pointer px-4 ${
                  activeTab === "preview"
                    ? "border-b-2 border-white text-white"
                    : "text-white hover:text-gray-300"
                }`}
              >
                PREVIEW
              </p>
            </div>

            <div className="flex w-full justify-end gap-6 pr-2">
              <div
                className="text-4xl hover:opacity-70 cursor-pointer text-white transition"
                onClick={copyCode}
                title="Copy code"
              >
                <IoMdCopy />
              </div>
              <div
                className="text-4xl hover:opacity-70 cursor-pointer text-white transition"
                onClick={downloadCode}
                title="Download code"
              >
                <CiSaveUp2 />
              </div>
            </div>
          </div>

          {outputScreen ? (
            activeTab === "code" ? (
              <div className="h-[68vh] w-full">
                <Editor
                  height="100%"
                  defaultLanguage={frameworkToLanguage[framework.value] || "javascript"}
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
              <div className="flex h-[68vh] w-full bg-[#fafafa] text-black justify-center items-center border border-gray-300 rounded-md">
                <p className="text-gray-600 text-center px-4">
                  The preview is displayed in a separate window. If the preview window is not visible, please allow popups or switch back to the main tab and click PREVIEW again.
                </p>
              </div>
            )
          ) : (
            activeTab === "code" && (
              <div className="flex bg-[#3f21d4] flex-1 justify-center items-center gap-4 text-9xl rounded-md">
                <GoCodescan className="text-white" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Aiprompt;
