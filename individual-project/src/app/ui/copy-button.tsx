import { incomingAmmo, incomingArmor } from "../lib/definitions";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }
  
  export function CopyButton({armor, ammo, obj}:{armor:boolean, ammo:boolean, obj:any}) {

    const navigatorAPI = !!navigator.clipboard;

    async function moveDataToClipboard(e:any){
        let dataCopy = ''

        if(ammo)
            dataCopy = `\`\`\`AMMO: ${obj.name}\n   Cost: ${obj.data.value}\n\n   AC: ${obj.data.ac}\n   DR: ${obj.data.dr}\n   Dmg: ${obj.data.dmg}\n   Vol: ${obj.data.vol}\n\`\`\``;
        else if(armor){
            dataCopy = `\`\`\`ARMOR: ${obj.name}\n   Value: ${obj.data.value}\n   AC: ${obj.data.ac}\n   Elec. Res: ${obj.data.elecRes}\n   Pois. Res: ${obj.data.poisRes}\n   Rad. Res:  ${obj.data.radRes}\n   Weight: ${obj.data.weight}\n`
                     +`\n   DT | DR\n   Normal:    ${obj.data.dt.normal}|${obj.data.dr.normal}\n   Fire:      ${obj.data.dt.fire}|${obj.data.dr.fire}\n   Plasma:    ${obj.data.dt.plasma}|${obj.data.dr.plasma}\n   Laser:     ${obj.data.dt.laser}|${obj.data.dr.laser}\n   Explosion: ${obj.data.dt.explosion}|${obj.data.dr.explosion}\n`
                     +`\n   Other Bonuses: ${obj.data.otherBonuses}\n \`\`\``
        }



        if(navigatorAPI){
            if(e.ctrlKey) {
                let clipboardData:string = '';
                if(!!navigator.clipboard.readText)
                    clipboardData = await navigator.clipboard.readText();
                else alert("Browser does not support multiple item copy.")

                console.log(clipboardData);
                navigator.clipboard.writeText(clipboardData +'\n'+ dataCopy)
            }
            else {
                navigator.clipboard.writeText(dataCopy)
            }
        }
        else{
            let copyElem = document.createElement('textarea')
            copyElem.value = dataCopy; copyElem.style.maxHeight = '0px';
            document.body.append(copyElem)
            copyElem.select();
            document.execCommand("copy");
            copyElem.remove();
        }
    }

    return (
        <>
        <button className="absolute bg-[var(--third-color)] 
        text-white border-[1px] border-[var(--primary-color)] rounded-xl w-[3.5rem] bottom-2 right-[calc(90%-3rem)] shadow-black shadow-sm
        hover:bg-[var(--highlight2-color)] hover:text-black hover:font-semibold"
        onClick={moveDataToClipboard}>Copy</button>
        </>
    );
  }