import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Select from 'react-select'
import { IoSparklesOutline } from 'react-icons/io5'

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
const loading=()=>{
  setgenerate(true);
}

  return (
    <div>
      <Navbar />
      <br />
      {/* Container */}
      <div className="flex min-h-screen">
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

          <p className="text-white text-center mb-4">
            Describe your component and let AI code it for you.
          </p>

          <fieldset className="border border-gray-600 rounded-lg p-4 mb-6">
            <legend className="text-purple-400 px-2 font-semibold">
              Your bio
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
              {generate?
              (
                <span className="loading loading-dots loading-md"></span>
              )
              :(
                <IoSparklesOutline className="mr-2 text-lg" />
              )}
              <span className="text-sm font-medium">Generate</span>
            </button>
          </div>
        </div>

        {/* Right side (empty or for future use) */}
        <div className="w-1/2"></div>
      </div>
    </div>
  )
}

export default Aiprompt
