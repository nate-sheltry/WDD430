import { AmmoCategory, incomingAmmo, incomingArmor } from "./definitions"

export async function filterData(){

}


export function filterAmmo(data:any, search:string, category:AmmoCategory|null = null){
    let results:any;
    if(category != null){
        if(search != '') {
            results = data.filter((item:incomingAmmo) => {
                const formatted = item.name.toLowerCase()
                return ((formatted.includes(search) || search.includes(formatted)) && item.data.category.includes(category))
            })
        }
        else {
            results = data.filter((item:incomingAmmo) => (item.data.category.includes(category)))
        }
    }
    else{
        results = data.filter((item:incomingAmmo) => {
            const formatted = item.name.toLowerCase()
            return formatted.includes(search) || search.includes(formatted)
        })
    }
    return results
}

export function filterArmor(data:any, search:string){
    let results:any;
        results = data.filter((item:incomingArmor) => {
            const formatted = item.name.toLowerCase()
            return formatted.includes(search) || search.includes(formatted)
        })
    return results
}