import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Select from 'react-select'
import { IoSparklesOutline } from 'react-icons/io5'
import { IoMdCopy } from "react-icons/io";
import { CiSaveUp2 } from "react-icons/ci";
import { GoCodescan } from "react-icons/go";
import Editor from "@monaco-editor/react";

const options = [
  { value: 'html-css', label: 'HTML + CSS' },
  { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
  { value: 'html-css-js', label: 'HTML + CSS + JS' },
  { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
  { value: 'react', label: 'React' },
  { value: 'react-tailwind', label: 'React + Tailwind CSS' },
];

const Aiprompt = () => {
  const [selectedOption, setSelectedOption] = useState(options[1])
  const [generate, setgenerate] = useState(false)
  const [activeTab, setActiveTab] = useState("code")
  const [outputscreen, setoutputscreen] = useState(true);
    const [code, setCode] = useState("// Write your code here...");
      const [description, setDescription] = useState("");
  const loading = () => {
    setgenerate(true);
  }

  return (
    <div>
      <Navbar />
      <br />
      {/* Container */}
      <div className="flex min-h-screen gap-10">
        {/* Left side panel */}
        <div className="bg-[#141319] w-1/2 px-6 py-8 flex flex-col">
          <h1 className="text-white text-center text-2xl font-semibold mb-6">
            Bring your ideas to life
          </h1>

          <label htmlFor="framework-select" className="text-white mb-2 block">
            Framework
          </label>
          <Select
            inputId="framework-select"
            className="mb-6"
            defaultValue={selectedOption}
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

          <p className="text-white text-center mb-4 pt-4" >
            Describe your component and let AI code it for you.
          </p>

          <fieldset className="border border-gray-600 rounded-lg p-4 mb-6">
            <legend className="text-purple-400 px-2 font-semibold">
              Your Description
            </legend>
            <textarea
              className="w-full h-[60vh] resize-none rounded-lg bg-[#181820] text-white placeholder-gray-400 px-4 py-3 focus:ring-2 focus:ring-purple-500 border-none outline-none"
              placeholder="Describe what component you want to build"
              spellCheck={false}
              rows={15}
            />
          </fieldset>

          {/* Button aligned to end with spacing */}
          <div className="flex justify-end">
            <button onClick={loading} className="flex h-14 w-32 text-black rounded-2xl justify-center items-center bg-gradient-to-r from-blue-400 to-pink-400 mr-4 hover:opacity-[70%] active:translate-x-1">
              {generate ?
                (
                  <span className="loading loading-dots loading-md"></span>
                )
                : (
                  <IoSparklesOutline className="mr-2 text-lg" />
                )}
              <span className="text-sm font-medium">Generate</span>
            </button>
          </div>
        </div>


        <div className="w-1/2  px-6 py-8 flex flex-col">
          <div className=' bg-[#141319] h-10 flex w-full gap-4'>
            <div className=' bg-[#141319] h-10 flex w-full gap-4 items-center'>

              <p
                onClick={() => setActiveTab("code")}
                className={`cursor-pointer px-4 ${activeTab === "code" ? "border-b-2 border-white text-white" : "text-white"
                  }`}
              >
                CODE
              </p>
              <p
                onClick={() => setActiveTab("preview")}
                className={`cursor-pointer px-4 ${activeTab === "preview" ? "border-b-2 border-white text-white" : "text-white"
                  }`}
              >
                PREVIEW
              </p>

            </div>

            <div className=' flex w-full justify-end gap-4'>
              <div className='text-4xl hover:opacity-35'><IoMdCopy /></div>
              <div className='text-4xl hover:opacity-35'><CiSaveUp2 /></div>
            </div>
          </div>
          {outputscreen ?
            (
             activeTab === 'code'&&(
               <div className="h-screen w-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
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
             )
            )
            : (
              activeTab === "code" && (
                <div className="flex bg-[#3f21d4] flex-1 justify-center items-center gap-4 text-9xl">
                  <GoCodescan />
                </div>
              )
            )}


        </div>
      </div>
    </div>
  )
}

export default Aiprompt 
