'use client'
import { useState } from "react";
import Image from "next/image";
import { AmmoCategory, incomingAmmo, outgoingAmmo } from "@/app/lib/definitions"
import { getHost } from "../lib/common/get-host";
import { useRouter } from "next/navigation";
import { avoidCaching } from "../lib/common/cache-avoid";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export function AmmoCardEdit({ammoObj}:{ammoObj:incomingAmmo}) {

  const router = useRouter();

  const [name, setName] = useState<string>(ammoObj.name)
  const [cost, setCost] = useState<number>(ammoObj.data.value)
  const [ac, setAc] = useState<number>(ammoObj.data.ac)
  const [dr, setDr] = useState<number>(ammoObj.data.dr)
  const [vol, setVol] = useState<number>(ammoObj.data.vol)
  const [dmg, setDmg] = useState<string>(ammoObj.data.dmg)
  const [categories, setCategories] = useState<AmmoCategory[]>(ammoObj.data.category)

  function handleState(e:any){
    const value = e.target.value || e.target.getAttribute('data-category') || ' ';
    const itemName = e.target.parentElement.className;
    try{
      switch(true){
        case itemName.includes('name'):
          setName(value);
          return
        case itemName.includes('value'):
          setCost(parseInt(value))
          return
        case itemName.includes(('ac')):
          setAc(parseInt(value))
          return
        case itemName.includes(('dr')):
          setDr(parseInt(value))
          return    
        case itemName.includes(('vol')):
          setVol(parseInt(value))
          return    
        case itemName.includes('dmg'):
            setDmg(value)
            return
        case itemName.includes('categories'):
          if(!categories.includes(value)){
            setCategories([...categories, value])
          }
          else if(categories.includes(value)){
            const newArray = categories.filter(item => item != value);
            setCategories(newArray)
          }
          return
      }
    } catch(e:any){
      if(e instanceof SyntaxError) window.alert(`Invalid data type present in ${itemName}.\nValue: ${value}`)
    }
  }

  function handleSave(e:any){
    const ammo : outgoingAmmo = {
      name: name,
      data: {
        value:cost,
        ac:ac,
        dr:dr,
        vol:vol,
        dmg:dmg,
        category:categories,
        img:ammoObj.data.img
      }
    }
    fetch(`/api/resources/ammo/${ammoObj._id}/${avoidCaching()}`, {
      method: 'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(ammo)
    }).then(response => {if(response.status == 200){
      window.alert('Item was updated. The page will refresh.')
      window.location.reload()
      }
      else {
        response.json().then(body => {
          window.alert(body.message);
        })
      }
    })
  }

  return (
    <div className="bg-[var(--secondary-color)] text-black font-semibold relative text-md ammo-card-edit
    w-[19rem] min-h-[28.5rem] gap-[.6rem]">
        <label className="name text-lg sm:text-xl relative w-full">Name:<input type='text' className="data-value w-3/4 absolute right-0" value={name} onChange={handleState}/></label>
        <hr/>
        <label className="value">Cost:<input type='number' className='data-value w-1/2' value={cost} onChange={handleState}/></label>
        <label className="ac">AC:<input type='number' className='data-value' value={ac} onChange={handleState}/></label>
        <label className="dr">DR:<input type='number' className='data-value' value={dr} onChange={handleState}/></label>
        <label className="vol">Vol.<input type='number' className='data-value' value={vol} onChange={handleState}/></label>
        <label className="dmg">Dmg:<input className='data-value' value={dmg} onChange={handleState}/></label>
        <hr/>
        <label className="categories-title">Categories</label>
        <div className="categories w-full flex flex-row flex-wrap gap-[.5rem] justify-evenly">
        {['handguns', 'rifles', 'big guns', 'energy weapons', 'other'].map((item) => {
            if(categories.some(cat => cat == item)) return <button data-category={item} key={`${item} active`} onClick={handleState} className="category rounded-xl text-black bg-[var(--highlight2-color)] font-bold shadow-black shadow-sm">
            {item}
          </button>
          return <button data-category={item} onClick={handleState} key={`${item} inactive`} className="category rounded-xl font-semibold text-white bg-[var(--third-color)] shadow-black shadow-sm text-shadow-black">
          {item}
        </button>
          })}
        </div>
        <button className="absolute bg-[var(--third-color)] 
        text-white border-[1px] border-[var(--primary-color)] rounded-xl w-[7rem] bottom-2 left-[calc(50%-3rem)] shadow-black shadow-sm
        hover:bg-[var(--highlight2-color)] hover:text-black"
        onClick={handleSave}>Save Ammo</button>
    </div>
  );
}