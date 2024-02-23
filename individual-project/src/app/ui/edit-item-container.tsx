'use client'
import { AmmoCategory, incomingAmmo, incomingArmor } from "../lib/definitions";
import { LeftPanelButton } from "./left-panel-button";
import { usePathname, } from "next/navigation";
import { SearchHeader } from "./search-header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { filterAmmo, filterArmor } from "../lib/actions";
import { AmmoCardEdit } from "./ammo-card-edit";
import { ArmorCardEdit } from "./armor-card-edit";

export function EditItemContainer({itemId, ammo, armor}:{itemId: string, ammo:Boolean, armor:Boolean}) {
  const [Data, setData] = useState<incomingAmmo[]|incomingArmor[]>([])
  const [filteredData, setFilter] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('. ')

  useEffect (() => {
    const timeout = setInterval(()=>{
        setLoadingText(loadingText+'. ')
      },200)
    if(!isLoading){
      clearInterval(timeout)
    }
    return () => {
      clearInterval(timeout)
    }
  }, [isLoading, loadingText])

  useEffect(() => {
    if(ammo){
      fetch(`/api/resources/ammo/${itemId}/`).then((res)=>res.json()).then((data)=>{
        let processedData = data;
        setData(processedData)
        setFilter(processedData)
        setLoading(false)})
    }
    else if(armor){
      fetch(`/api/resources/armor/${itemId}/`).then((res)=>res.json()).then((data)=>{
        let processedData = data;
        setData(processedData)
        setFilter(processedData)
        setLoading(false)})
    }
  }, [])

  return (
    <>
    <div className="flex flex-col text-center align-middle justify-center bg-[var(--primary-color)] min-h-[80px] w-full border-2 border-[var(--highlight-color)] border-l-[1px] border-b-[1px] sm:min-h-[80px]">
      <h1 className=" w-fit ml-auto mr-auto">{ammo && "Ammo Editor" || armor && "Armor Editor"}</h1>
      </div>
    <div className="bg-[var(--third-color)] flex flex-col gap-4 pt-[.5rem] pb-[.5rem] pl-[.5rem] pr-[.5rem] overflow-y-auto max-h-[calc(100dvh-20.5rem)] min-h-[calc(100dvh-20.5rem)] sm:max-h-[calc(100dvh-10rem)] sm:min-h-[calc(100dvh-10rem)] border-2 border-[var(--highlight-color)] border-l-[1px] border-t-[1px]">
      <section><h2>Current Item : {isLoading && loadingText}{!isLoading && Data[0].name}</h2>
      {ammo && <><h3>Categories:</h3>
        <p className="text-sm">An object may have as many categories as desired. If an object has no categories, it will not show up when searching by category.</p>
        </>
      }</section>
      {isLoading && <p className="mt-auto mb-auto ml-auto mr-auto">Loading...</p>}
      {!filteredData && <p className="mt-auto mb-auto ml-auto mr-auto">No data was found...</p>}
      {ammo && filteredData.map((item:incomingAmmo) => (
        <AmmoCardEdit ammoObj={item}  key={item.name}/>
      ))}
      {armor && filteredData.map((item:incomingArmor) => (
        <ArmorCardEdit armorObj={item} key={item.name}/>
      ))}
      {!isLoading && filteredData && filteredData.length < 1 && <p className="mt-auto mb-auto ml-auto mr-auto">No data found matching search and/or category combination.</p>}
    </div>
  </>
  );
}