'use client'
import { AmmoCategory, incomingAmmo, incomingArmor } from "../lib/definitions";
import { AmmoCard } from "./ammo-card";
import { ArmorCard } from "./armor-card";
import { LeftPanelButton } from "./left-panel-button";
import { usePathname, } from "next/navigation";
import { SearchHeader } from "./search-header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { filterAmmo, filterArmor } from "../lib/actions";
import { avoidCaching } from "../lib/common/cache-avoid";

export function SearchResults({ammo, armor}:{ammo:Boolean, armor:Boolean}) {
  const [Data, setData] = useState([])
  const [filteredData, setFilter] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchValue, setSearch] = useState('')
  const [category, setCategory] = useState(null)

  useEffect(() => {
    if(ammo){
      fetch(`/api/resources/ammo/all/${avoidCaching()}`).then((res)=>res.json()).then((data)=>{
        let processedData = data;
        if(searchValue != ''){
          processedData = filterAmmo(data, searchValue, category)
        }
        setData(processedData)
        setFilter(processedData)
        setLoading(false)})
    }
    else if(armor){
      fetch(`/api/resources/armor/all/${avoidCaching()}`).then((res)=>res.json()).then((data)=>{
        let processedData = data;
        if(searchValue != ''){
          processedData = filterArmor(data, searchValue)
        }
        setData(processedData)
        setFilter(processedData)
        setLoading(false)})
    }
  }, [])

  useEffect(() => {
    let processedData;
    if(ammo){
      if(category != null || searchValue != ''){
        processedData = filterAmmo(Data, searchValue.toLowerCase().trim(), category)
        setFilter(processedData)
      }
      else{
        setFilter(Data)
      }
    }
    else if(armor){
      if(searchValue != ''){
        processedData = filterArmor(Data, searchValue.toLowerCase().trim())
        setFilter(processedData)
      }
      else{
        setFilter(Data)
      }
    }
  }, [searchValue, category])

  return (
    <>
    <SearchHeader ammo={ammo} armor={armor} search={{value:searchValue, set:setSearch}} category={{value:category, set:setCategory}}/>
    <div className="bg-[var(--third-color)] flex flex-row flex-wrap gap-4 pt-[.5rem] pb-[.5rem] pl-[.5rem] pr-[.5rem] overflow-y-scroll max-h-[calc(100dvh-20.5rem-35px)] min-h-[calc(100dvh-20.5rem-35px)] sm:max-h-[calc(100dvh-10rem)] sm:min-h-[calc(100dvh-10rem)] border-2 border-[var(--highlight-color)] border-l-[1px] border-t-[1px]">
      {isLoading && <p className="mt-auto mb-auto ml-auto mr-auto">Loading...</p>}
      {!filteredData && <p className="mt-auto mb-auto ml-auto mr-auto">No data was found...</p>}
      {ammo && filteredData.map((item:incomingAmmo) => (
        <AmmoCard ammoObj={item}  key={item.name}/>
      ))}
      {armor && filteredData.map((item:incomingArmor) => (
        <ArmorCard armorObj={item} key={item.name}/>
      ))}
      {!isLoading && filteredData && filteredData.length < 1 && <p className="mt-auto mb-auto ml-auto mr-auto">No data found matching search and/or category combination.</p>}
    </div>
  </>
  );
}