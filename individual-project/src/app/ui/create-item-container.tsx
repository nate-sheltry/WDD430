'use client'
import { AmmoCategory, incomingAmmo, incomingArmor } from "../lib/definitions";
import { ArmorCard } from "./armor-card";
import { LeftPanelButton } from "./left-panel-button";
import { usePathname, } from "next/navigation";
import { SearchHeader } from "./search-header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { filterAmmo, filterArmor } from "../lib/actions";
import { AmmoCardEdit } from "./ammo-card-edit";
import { AmmoCardCreate } from "./ammo-card-create";
import { ArmorCardCreate } from "./armor-card-create";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 1000;

export function CreateItemContainer({ammo, armor}:{ammo:Boolean, armor:Boolean}) {

  return (
    <>
    <div className="flex flex-col text-center align-middle justify-center bg-[var(--primary-color)] min-h-[80px] w-full border-2 border-[var(--highlight-color)] border-l-[1px] border-b-[1px] sm:min-h-[80px]">
      <h1 className=" w-fit ml-auto mr-auto">{ammo && "Ammo Editor" || armor && "Armor Editor"}</h1>
      </div>
      <div className="bg-[var(--third-color)] flex flex-col gap-4 pt-[.5rem] pb-[.5rem] pl-[.5rem] pr-[.5rem] overflow-y-auto max-h-[calc(100dvh-20.5rem)] min-h-[calc(100dvh-20.5rem)] sm:max-h-[calc(100dvh-10rem)] sm:min-h-[calc(100dvh-10rem)] border-2 border-[var(--highlight-color)] border-l-[1px] border-t-[1px]">
      <section><h2>New Item</h2>
      {ammo && <><h3>Categories:</h3>
        <p className="text-sm">An object may have as many categories as desired. If an object has no categories, it will not show up when searching by category.</p>
        </>
      }</section>
      {ammo && <AmmoCardCreate />}
      {armor && <ArmorCardCreate />}
    </div>
  </>
  );
}