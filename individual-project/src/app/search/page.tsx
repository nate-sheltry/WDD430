'use client';
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from 'react';
import { LeftPanelButton } from "../ui/left-panel-button";
import { LeftPanel } from "../ui/left-panel";
import { SearchHeader } from "../ui/search-header";

export default function Home() {
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 m-0">
      <div className="flex min-w-full min-h-20 bg-gray-400">

      </div>
      <div className="relative grid min-w-full min-h-screen top-0 flex-col items-center justify-between p-0 m-0 sm:static sm:mainPageLayout">
        <LeftPanel />
        <SearchHeader />
      </div>

    </main>
  );
}
