'use client'
import { useState } from "react";
import { LeftPanelButton } from "./left-panel-button";
import { useRouter } from "next/navigation";

export function LeftPanel() {
  const router = useRouter()
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [isModifyContainerVisible, setIsModifyContainerVisible] = useState(false);

  const handleDatabaseButtonClick = () => {
    setIsContainerVisible(!isContainerVisible);
    if(window.innerWidth < 640) setIsModifyContainerVisible(false);
  };
  const handleModifyDatabaseButtonClick = () => {
    setIsModifyContainerVisible(!isModifyContainerVisible);
    if(window.innerWidth < 640) setIsContainerVisible(false);
  };
  const handleHomeButtonClick = () =>{
    router.push('/')
  }

  const handleAmmoButtonClick = () => {
    router.push('/search/ammo')
  };
  const handleArmorButtonClick = () => {
    router.push('/search/armor')
  };
  const handleAmmoCreateClick = () => {
    router.push('/database-modifications/ammo/create/')
  };
  const handleArmorCreateClick = () => {
    router.push('/database-modifications/armor/create/')
  };

  return (
    <div className="fixed font-semibold z-20 bg-[var(--primary-color)] bottom-0 m-0 p-0 flex-col gap-1 sm:border-2 sm:border-t-0 sm:border-r-1 border-[var(--highlight-color)]
          min-w-full h-50 left-0 sm:static
          sm:left-0 sm:right-auto sm:min-h-full
          ">
            <button className="left-panel-button flex p-4 min-w-full justify-center border-t-2 border-[var(--highlight-color)]" onClick={handleHomeButtonClick}>
              <span>Home</span>
            </button>
            {/* <button className="flex p-4 min-w-full justify-center" onClick={handleGenerateCharacter}>
              <span>Generate Character</span>
            </button> */}
            {(!isContainerVisible) &&
            <button className="hover:bg-[var(--third-color)] flex p-4 min-w-full justify-center"
              onClick={handleDatabaseButtonClick}>
              <span>Search Database</span>
            </button>}
            {(isContainerVisible) &&
            <button className="bg-[var(--secondary-color)] text-black flex p-4 min-w-full justify-center"
              onClick={handleDatabaseButtonClick}>
              <span>Search Database</span>
            </button>}
            {(isContainerVisible) &&(
              <>
                <div className="absolute top-[-114px] justify-center min-w-full bg-[var(--primary-color)]
                sm:top-auto sm:static border-t-2 border-[var(--highlight-color)]">
                  <LeftPanelButton title="Ammo Data" onClick={handleAmmoButtonClick}/>
                  <LeftPanelButton title="Armor Data" onClick={handleArmorButtonClick}/>
                </div>
              </>
            )}
            {(!isModifyContainerVisible) &&
            <button className="hover:bg-[var(--highlight2-color)] flex p-4 min-w-full justify-center"
              onClick={handleModifyDatabaseButtonClick}>
              <span>Modify Database</span>
            </button>}
            {(isModifyContainerVisible) &&
            <button className="bg-[var(--secondary-color)] text-black flex p-4 min-w-full justify-center"
              onClick={handleModifyDatabaseButtonClick}>
              <span>Modify Database</span>
            </button>}
            {(isModifyContainerVisible) && (
              <>
                <div className="absolute top-[-114px] justify-center min-w-full bg-[var(--primary-color)] border-t-2 border-[var(--highlight-color)]
                sm:top-auto sm:static">
                  <LeftPanelButton title="Create Ammo" onClick={handleAmmoCreateClick}/>
                  <LeftPanelButton title="Create Armor" onClick={handleArmorCreateClick}/>
                </div>
              </>
            )}
        </div>
  );
}