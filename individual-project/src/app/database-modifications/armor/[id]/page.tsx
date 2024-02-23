'use server'
import { Metadata } from "next";
import { LeftPanel } from "../../../ui/left-panel";
import { SearchResults } from "../../../ui/search-results";
import { getHost } from "@/app/lib/common/get-host";
import { EditItemContainer } from "@/app/ui/edit-item-container";

export default async function Home({params}:{params: {id: string, query:string}}) {

  const itemId : string = params.id
  const ammo = false;
  const armor = true;


  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-0 lg:ml-[10%] lg:mr-[10%] ">
      <div className="decorative-font flex items-center justify-center font-semibold text-[2rem] min-w-full min-h-20 bg-[var(--highlight-color)] border-4 border-[var(--highlight-color)]">
        Fallout PnP Project
      </div>
      <div className="relative min-w-full max-h-[calc(100vh - 5rem)] top-0 flex-col items-center justify-between p-0 m-0 overflow-hidden sm:grid sm:static mainPageLayout">
        <LeftPanel />
        <div className="h-full w-full overflow-hidden z-0">
          <EditItemContainer itemId={itemId} ammo={ammo} armor={armor}/>
        </div>
      </div>

    </main>
  );
}
