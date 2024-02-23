'use client'
import { useState } from "react";
import Image from "next/image";
import { incomingAmmo } from "@/app/lib/definitions"
import { getHost } from "../lib/common/get-host";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 1000;

export function AmmoCard({ammoObj}:{ammoObj:incomingAmmo}) {
  const router = useRouter()
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  
  const handleDatabaseButtonClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };
  const handleButtonClick = () => {
    console.log('clicked');
  };

  function handleEditAmmo(){
    router.push(`/database-modifications/ammo/${ammoObj._id}/`)
  }

  return (
    <div className="bg-[var(--secondary-color)] text-black font-semibold relative text-md ammo-card sm:ammo-card-sm">
        <label className="name text-lg sm:text-xl">{ammoObj.name}</label>
        <hr/>
        <label className="value">Cost:<span className='data-value'>{ammoObj.data.value}</span></label>
        <label className="ac">AC:<span className='data-value'>{ammoObj.data.ac}</span></label>
        <label className="dr">DR:<span className='data-value'>{ammoObj.data.dr}</span></label>
        <label className="vol">Vol.<span className='data-value'>{ammoObj.data.vol}</span></label>
        <label className="dmg">Dmg:<span className='data-value'>{ammoObj.data.dmg}</span></label>
        <hr/>
        <label className="categories-title">Categories</label>
        <div className="categories w-full flex flex-row flex-wrap justify-evenly">
            {ammoObj.data.category.map(item => (<span key={ammoObj.data.category.indexOf(item)} className='category rounded-md font-semibold text-white bg-[var(--primary-color)]'>{item}</span>))}
        </div>
        <div className="absolute
        w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]
        right-3 top-[calc(40%-60px)] sm:top-12 sm:right-3">
        <Image width="100" height="100" src={`/ammunition/${ammoObj.data.img}`} alt={`${ammoObj.name} image`}
          loading="lazy" className="object-scale-down w-full h-full"/>
        </div>
        <button className="absolute bg-[var(--third-color)] 
        text-white border-[1px] border-[var(--primary-color)] rounded-xl w-[7rem] bottom-2 left-[calc(50%-3rem)] shadow-black shadow-sm
        hover:bg-[var(--highlight2-color)] hover:text-black hover:font-semibold"
        onClick={handleEditAmmo}>Edit Ammo</button>
    </div>
  );
}