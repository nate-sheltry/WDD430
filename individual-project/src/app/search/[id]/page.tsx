'use server'
import { Metadata } from "next";
import { LeftPanel } from "../../ui/left-panel";
import { SearchResults } from "../../ui/search-results";
import { getHost } from "@/app/lib/common/get-host";

export default async function Home({params}:{params: {id: string, query:string}}) {

  const page : string = params.id.toLowerCase()
  let ammo = false;
  let armor = false;
  if(page == 'ammo')ammo = true;
  else if(page == 'armor')armor = true;

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-0 lg:ml-[10%] lg:mr-[10%] ">

      <div className="relative min-w-full max-h-[calc(100vh - 5rem)] top-0 flex-col items-center justify-between p-0 m-0 overflow-hidden sm:grid sm:static mainPageLayout">
        <LeftPanel />
        <div className="h-full w-full overflow-hidden z-0">
          <SearchResults ammo={ammo} armor={armor}/>
        </div>
      </div>

    </main>
  );
}
