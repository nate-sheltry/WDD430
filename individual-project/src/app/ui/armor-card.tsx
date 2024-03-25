import { useState } from "react";
import { dtdr, incomingArmor } from "@/app/lib/definitions"
import { useRouter } from "next/navigation";
import { CopyButton } from "./copy-button";

export function ArmorCard({armorObj}:{armorObj:incomingArmor}) {
  const router = useRouter()
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const handleDatabaseButtonClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };
  const handleButtonClick = () => {
    console.log('clicked');
  };
  function handleEditArmor(){
    router.push(`/database-modifications/armor/${armorObj._id}/`)
    router.refresh();
  }

  return (
    <div className="armor-card relative sm:armor-card-sm md:armor-card-md lg:armor-card-lg text-black">
        <label className="name text-lg sm:text-xl font-semibold">{armorObj.name}</label>
        <hr/>
        <div className="grid grid-cols-2 w-full">
          <label className="value w-full relative">Cost:<span className='data-value w-[60%] absolute right-0'>{armorObj.data.value}</span></label>
          <label className="ac w-full relative">AC:<span className='data-value w-[70%] absolute right-0'>{armorObj.data.ac}</span></label>
        </div>
        <hr/>
        <div className="grid grid-cols-2 w-full">
          <div className="dr flex flex-col">
            {Object.keys(armorObj.data.dr).map((item:string) => {
              const drItem = armorObj.data.dr[item]
              const title = item[0].toUpperCase() + item.slice(1)
              return <label key={`${title} label`} className='drdt w-full relative'>{title}:<span key={`${title} span`}  className='data-value w-1/4 absolute right-0'>{drItem}</span></label>
            })}
          </div>
          <div className="dt flex flex-col">
            {Object.keys(armorObj.data.dt).map((item:string) => {
              const dtItem = armorObj.data.dt[item]
              const title = item[0].toUpperCase() + item.slice(1)
              return <label key={`${title} label`}  className='drdt w-full relative'>{title}:<span key={`${title} span`} className='data-value w-1/4 absolute right-0'>{dtItem}</span></label>
            })}
          </div>
        </div>
        <hr/>
        <div className="flex flex-row flex-wrap">
          <label className="elecRes w-1/2 relative">Elec. Res.<span className='data-value w-1/3 absolute right-0'>{armorObj.data.elecRes}</span></label>
          <label className="poisRes w-1/2 relative">Pois. Res.<span className='data-value w-1/3 absolute right-0'>{armorObj.data.poisRes}</span></label>
          <label className="radRes w-1/2 relative">Rad. Res.<span className='data-value w-[38%] absolute right-0'>{armorObj.data.radRes}</span></label>
          <label className="weight w-1/2 relative">Weight:<span className='data-value w-1/2 absolute right-0'>{armorObj.data.weight}</span></label>
        </div>
        <hr/>
        <label className="otherBonuses w-full">Other Bonuses:<br/><span
        className='data-value bg-[rgba(255,255,255,.6)] border-[.2rem] border-[var(--highlight2-color)] rounded-lg inline-block min-h-[5rem] min-w-full text-black pl-1 pr-1'>
          {armorObj.data.otherBonuses}</span></label>
        <button className="absolute bg-[var(--third-color)] 
        text-white border-[1px] border-[var(--primary-color)] rounded-xl w-[7rem] bottom-2 left-[calc(50%-3rem)] shadow-black shadow-sm
        hover:bg-[var(--highlight2-color)] hover:text-black hover:font-semibold"
        onClick={handleEditArmor}>Edit Armor</button>
        <CopyButton ammo={false} armor={true} obj={armorObj}/>
    </div>
  );
}