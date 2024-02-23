'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"
import { LeftPanelButton } from "./left-panel-button";

let timer : NodeJS.Timeout | null = null

export function SearchHeader({ammo, armor, search, category = null}:{ammo:Boolean, armor:Boolean, search:any, category:any|null}) {
  const [searchInput, setSearchInput] = useState('');

  const handleInput = (e:any) => {
    search.set(e.target.value)
  };
  const handleClick = (e:any) =>{
    const dataValue = e.target.getAttribute('data-category');
    if(category.value == dataValue) category.set(null)
    else category.set(dataValue)
  }

  return (
    <div className="flex flex-col align-middle justify-center bg-[var(--primary-color)] min-h-[115px] min-w-full border-2 border-[var(--highlight-color)] border-l-[1px] border-b-[1px] sm:min-h-[80px]">
      <div className="w-[80%] ml-4 mr-auto">
        <label className="ml-0 mr-2 text-white font-semibold min-w-[4rem] h-5">Search</label>
        <input type="text" id="searchBox" className="mt-2 mb-2 pl-1 w-[calc(100%-4rem)] h-5 text-black search-input" value={search.value} onChange={handleInput} ></input>
      </div>
      {ammo && <>
        <div className="flex flex-wrap max-w-[32rem] ml-4 mr-auto sm:gap-2">
          {['handguns', 'rifles', 'energy weapons', 'big guns', 'other'].map((item) => {
            if(category.value == item) return <button data-category={item} key={`${item} active`} onClick={handleClick} className="category rounded-xl text-black bg-[var(--highlight2-color)] font-bold shadow-black shadow-sm ">
            {item}
          </button>
          return <button data-category={item} onClick={handleClick} key={`${item} inactive`} className="category rounded-xl font-semibold text-white bg-[var(--third-color)] shadow-black shadow-sm text-shadow-black">
          {item}
        </button>
          })}
        </div>
      </>}
    </div>
  );
}