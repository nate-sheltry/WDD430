import Image from "next/image";
import { useState } from 'react';
import { LeftPanelButton } from "./ui/left-panel-button";
import { LeftPanel } from "./ui/left-panel";

export default function Home() {
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 m-0">
      <div className="decorative-font flex items-center justify-center font-semibold text-[2rem] min-w-full min-h-20 bg-[var(--highlight-color)] border-4 border-[var(--highlight-color)]">
        Fallout PnP Project
      </div>
      <div className="relative grid min-w-full min-h-screen top-0 flex-col items-center justify-between p-0 m-0 sm:static ">
        <LeftPanel />
      </div>

    </main>
  );
}
