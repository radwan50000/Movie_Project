import React from 'react'

function Search({search,setSearch}) {



  return (
    <>
    <div className='flex flex-row ltr py-3 px-5 bg-[#0F0D23] rounded-md gap-2 w-full mx-auto my-10'>
      <img src='search.svg' alt='search image' className='w-5'/>
      <input 
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Search through 300+ movies online' 
        className='w-[92%] h-fit text-xl text-[#A8B5DB] p-2 outline-none max-sm:text-sm max-sm:w-[95%]'
        />
    </div>
    </>
  )
}

export default Search