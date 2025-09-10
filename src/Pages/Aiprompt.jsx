import React from 'react'
import Navbar from '../Components/Navbar'
import Select from 'react-select';
import { useState } from 'react';
import { IoSparklesOutline } from "react-icons/io5";
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Aiprompt = () => {

  
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
        <Navbar/>
         <br/>
          {/*left */}
       <div className='bg-[#141319] h-[200vh] w-1/2'>
       <h1 className='white text-center'>Bring your ideas to life</h1>
       <p>Framework</p>
       <div>
           <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
    <p>Describe your component and let AI code it for you.</p>
    <p className='flex radius-none '>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Your bio</legend>
  <textarea className="pl-7 textarea h-[60vh] w-2xl px-4 py-3 rounded-lg bg-[#181820] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 border-none outline-none resize-none" placeholder="describe what component you want to build"></textarea>
</fieldset>
    </p>
    <button className='flex h-14 w-28 text-black rounded-2xl justify-center items-center bg-gradient-to-r from-blue-400 to-pink-400 text-sm'>
      <div className='text-sm'><IoSparklesOutline /></div>
      <div>generate</div>
      </button>
       </div>

    </div>
  )
}

export default Aiprompt