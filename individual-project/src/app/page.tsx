"use server"
import Image from "next/image";
import { useState } from 'react';
import { LeftPanelButton } from "./ui/left-panel-button";
import { LeftPanel } from "./ui/left-panel";

export default async function Home() {

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-0 lg:ml-[10%] lg:mr-[10%] ">
      <div className="relative min-w-full max-h-[calc(100vh - 5rem)] top-0 flex-col items-center justify-between p-0 m-0 overflow-hidden sm:grid sm:static mainPageLayout">
        <LeftPanel />
        <section className="bg-[var(--third-color)] flex flex-col gap-4 pt-[.5rem] pb-[.5rem] pl-[.5rem] pr-[.5rem] overflow-x-hidden overflow-y-auto max-h-[calc(100dvh-20.5rem-35px)] min-h-[calc(100dvh-15.5rem)] sm:max-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-5rem)] border-2 border-[var(--highlight-color)] border-l-[1px] border-t-[2px]">
          <h1 className="text-2xl text-center font-bold mb-[.5rem] mt-[.5rem]">Welcome to Fallout Pen-and-Paper Project</h1>
          <section>
            <h2 className="text-xl font-semibold">What is Fallout PnP Project?</h2>
            <p className=" indent-3">Fallout PnP Project is a web project with the goal to deliver the resource needs of those who want to run a fallout tabletop role playing game. The goal is to have resources available for all of the following:</p>
            <ul className="ml-[2rem] mr-[2rem] mt-[1rem] mb-[1rem] w-full flex flex-row flex-wrap items-center text-left list-disc">
              <li className="w-1/4 mr-[25%]">Ammo</li>
              <li className="w-1/4 mr-[25%]">Armor</li>
              <li className="w-1/4 mr-[25%]">Critter {"(Enemies and NPCs)"}</li>
              <li className="w-1/4 mr-[25%]">Combat Mechanics</li>
              <li className="w-1/4 mr-[25%]">Character Creation</li>
              <li className="w-1/4 mr-[25%]">Leveling</li>
              <li className="w-1/4 mr-[25%]">Weapons</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold">What do you have?</h2>
            <p>
              Currently, the Ammo and Armor database is up! You can navigate to them using the nav-menu.
            </p>
          </section>
        </section>
      </div>

    </main>
  );
}
