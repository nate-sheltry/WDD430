import { useState } from "react";
import { dtdr, incomingArmor, outgoingArmor } from "@/app/lib/definitions"

import { useRouter } from "next/navigation";

export function ArmorCardCreate() {
  const router = useRouter()

  const [name, setName] = useState<string>('Armor Piece')
  const [cost, setCost] = useState<number>(200)
  const [ac, setAc] = useState<number>(5)
  const [dr, setDr] = useState<dtdr>({normal: 0, fire: 0, plasma: 0, laser: 0, explosion: 0})
  const [dt, setDt] = useState<dtdr>({normal: 0, fire: 0, plasma: 0, laser: 0, explosion: 0})
  const [elecRes, setElecRes] = useState<number>(10)
  const [poisRes, setPoisRes] = useState<number>(0)
  const [radRes, setRadRes] = useState<number>(0)
  const [weight, setWeight] = useState<number>(10)
  const [otherBonuses, setBonuses] = useState<string>('')

  function handleDtDrStates(name:string, value:number, object:dtdr, setFunc: Function){
    try{
      const tempObj = {...object}
      switch(true){
        case name.includes('normal'):
          tempObj.normal = value;
          setFunc(tempObj)
          return
        case name.includes('fire'):
          tempObj.fire = value;
          setFunc(tempObj)
          return
        case name.includes('plasma'):
          tempObj.plasma = value;
          setFunc(tempObj)
          return
        case name.includes('laser'):
          tempObj.laser = value;
          setFunc(tempObj)
          return
        case name.includes('explosion'):
          tempObj.explosion = value;
          setFunc(tempObj)
          return
        default:
          console.log('error')
          return
      }
    } catch(e:any){
      window.alert(`Invalid data type present in ${name}\nValue: ${e.target.value}`)
    }
  }


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
        case itemName.includes('ac'):
          setAc(parseInt(value))
          return
        case itemName.includes('dr-edit'):
          handleDtDrStates(e.target.getAttribute('data-dmg-type'), parseInt(value), dr, setDr)
          return
        case itemName.includes('dt-edit'):
          handleDtDrStates(e.target.getAttribute('data-dmg-type'), parseInt(value), dt, setDt)
          return
        case itemName.includes('elecRes'):
          setElecRes(parseInt(value))
          return    
        case itemName.includes('poisRes'):
          setPoisRes(parseInt(value))
          return
        case itemName.includes('radRes'):
          setRadRes(parseInt(value))
          return
        case itemName.includes('weight'):
          setWeight(parseInt(value))
          return
        case itemName.includes('otherBonuses'):
          setBonuses(value)
          return
      }
    } catch(e:any){
      if(e instanceof SyntaxError) window.alert(`Invalid data type present in ${itemName}.\nValue: ${value}`)
    }
  }

  function handleSaveArmor(e:any){
    const ammo : outgoingArmor = {
      name: name,
      data: {
        value:cost,
        ac:ac,
        dr:dr,
        dt:dt,
        elecRes:elecRes,
        poisRes:poisRes,
        radRes:radRes,
        weight:weight,
        otherBonuses:otherBonuses
      }
    }
    fetch(`/api/resources/armor/create/`, {
      method: 'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(ammo)
    }).then(response => {if(response.status == 200){
      window.alert('Item was updated. You will now be redirected to it.')
      return response.json()
      }
      else {
        response.json().then(body => {
          window.alert(body.message);
        })
      }
    }).then(data => {
      router.push(`/database-modifications/armor/${data.insertedId}/`)
    })
  }

  return (
    <div className="armor-card-edit relative text-black gap-[.6rem]
        w-[17rem] min-h-[36rem] mb-[10rem] sm:w-[22rem] sm:min-h-[35rem]">
        <label className="name text-lg sm:text-xl font-semibold"><input type='string' onChange={handleState} className="data-value w-[98%]" value={name}/></label>
        <hr/>
        <div className="grid grid-cols-2 w-full">
          <label className="value w-full relative">Cost:<input type='number' className='data-value w-4/6 absolute right-0 mr-[.3rem]' value={cost} onChange={handleState}/></label>
          <label className="ac w-full relative">AC:<input type='number' className='data-value w-9/12 absolute right-0 mr-[.3rem]' value={ac} onChange={handleState}/></label>
        </div>
        <hr/>
        <div className="grid grid-cols-2 w-full">
          <div className="dr flex flex-col gap-[.6rem]">
            {Object.keys(dr).map((item:string) => {
              const drItem = dr[item]
              const title = item[0].toUpperCase() + item.slice(1)
              return <label key={`${title} label`} className='dr-edit drdt w-full relative'>{title}:<input type='number' key={`${item} span`}  data-dmg-type={item} className='data-value w-[30%] absolute right-0 mr-[.3rem]' value={dr[item]} onChange={handleState}/></label>
            })}
          </div>
          <div className="dt flex flex-col gap-[.6rem]">
            {Object.keys(dt).map((item:string) => {
              const dtItem = dt[item]
              const title = item[0].toUpperCase() + item.slice(1)
              return <label key={`${title} label`}  className='dt-edit drdt w-full relative'>{title}:<input type='number' key={`${item} span`} data-dmg-type={item} className='data-value w-[30%] absolute right-0 mr-[.3rem]' value={dt[item]} onChange={handleState}/></label>
            })}
          </div>
        </div>
        <hr/>
        <div className="flex flex-row flex-wrap w-full">
          <label className="elecRes w-1/2 relative mt-[.3rem] mb-[.3rem]">Elec. Res.<input className="data-value w-1/3 absolute right-0 mr-[.3rem]" type="number" value={elecRes} onChange={handleState} /></label>
          <label className="poisRes w-1/2 relative mt-[.3rem] mb-[.3rem]">Pois. Res.<input className="data-value w-1/3 absolute right-0 mr-[.3rem]" type="number" value={poisRes} onChange={handleState} /></label>
          <label className="radRes w-1/2 relative mt-[.3rem] mb-[.3rem]">Rad. Res.<input className="data-value w-1/3 absolute right-0 mr-[.3rem]" type="number" value={radRes} onChange={handleState} /></label>
          <label className="weight w-1/2 relative mt-[.3rem] mb-[.3rem]">Weight:<input className="data-value w-1/3 absolute right-0 mr-[.3rem]" type="number" value={weight} onChange={handleState} /></label>
        </div>
        <hr/>
        <label className="otherBonuses w-full">Other Bonuses:<br/>
        <textarea onChange={handleState}
        className="data-value bg-[rgba(255,255,255,.6)] border-[.2rem] border-[var(--highlight2-color)] rounded-lg inline-block min-h-[5rem] min-w-full text-black pl-1 pr-1" value={otherBonuses}/></label>
        <button className="absolute bg-[var(--third-color)] 
        text-white border-[1px] border-[var(--primary-color)] rounded-xl w-[7rem] bottom-2 left-[calc(50%-3rem)] shadow-black shadow-sm
        hover:bg-[var(--highlight2-color)] hover:text-black"
        onClick={handleSaveArmor}>Create Armor</button>
    </div>
  );
}