import { useState } from "react";
import { LeftPanelButton } from "./left-panel-button";

export function SearchHeader({}:any) {
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const handleDatabaseButtonClick = () => {
    setIsContainerVisible(!isContainerVisible);
  };
  const handleButtonClick = () => {
    console.log('clicked');
  };

  return (
    <div className="bg-gray-600 min-h-20 min-w-full">
      <input type="text" id="searchBox"></input>
    </div>
  );
}