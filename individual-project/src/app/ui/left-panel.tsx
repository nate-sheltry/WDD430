import { useState } from "react";
import { LeftPanelButton } from "./left-panel-button";

export function LeftPanel({}:any) {
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const handleDatabaseButtonClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };
  const handleButtonClick = () => {
    console.log('clicked');
  };

  return (
    <div className="fixed bg-gray-900 bottom-0 m-0 p-0 flex-col gap-1
          min-w-full min-h-20 left-0 sm:static
          sm:left-0 sm:right-auto sm:min-h-full
          ">
            <button className="flex p-4 min-w-full justify-center">
              <span>Home</span>
            </button>
            <button className="flex p-4 min-w-full justify-center">
              <span>Generate Character</span>
            </button>
            <button className="flex p-4 min-w-full justify-center"
              onClick={handleDatabaseButtonClick}>
              <span>Search Database</span>
            </button>
            {(isContainerVisible) &&(
              <>
                <div className="absolute top-[-224px] justify-center min-w-full bg-gray-900
                sm:top-auto sm:static">
                  <LeftPanelButton title="Critter Data" onClick={handleButtonClick}/>
                  <LeftPanelButton title="Weapon Data" onClick={handleButtonClick}/>
                  <LeftPanelButton title="Ammo Data" onClick={handleButtonClick}/>
                  <LeftPanelButton title="Armor Data" onClick={handleButtonClick}/>
                </div>
              </>
            )}
        </div>
  );
}