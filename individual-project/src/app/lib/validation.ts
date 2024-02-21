import { outgoingAmmo, outgoingArmor, dtdr, AmmoCategory } from "./definitions";

export function validateObject(object: any, expectedTypes: any){
    const keys = Object.keys(object);
    for(let i = 0; i < keys.length; i++){
        if(!typeof(object[keys[i]]) == expectedTypes[keys[i]]){
            return false
        }
    }
}

export function validateAmmo(ammo: outgoingAmmo){
    try {
        if( typeof ammo.name !== 'string' ||
            typeof ammo.data.value !== 'number' ||
            typeof ammo.data.ac !== 'number' ||
            typeof ammo.data.dr !== 'number' ||
            typeof ammo.data.vol !== 'number' ||
            typeof ammo.data.dmg !== 'string' ||
            !ammo.data.category.every((item) => ['handguns', 'rifles', 'big guns', 'energy weapons', 'other'].includes(item)) ||
            typeof ammo.data.img !== 'string'){
            return false
        }
        return true
    } catch(e:any){
        console.error('Error occurred on validating new ammo datapoint.')
        return false
    }
}

function checkDRDT(data:dtdr){
    try{
        const condition:Boolean = ('normal' in data && 'fire' in data && 'plasma' in data && 'laser' in data && 'explosion' in data)
        if(!condition) return false
        if(
            typeof data.normal !== 'number' ||
            typeof data.fire !== 'number' ||
            typeof data.plasma !== 'number' ||
            typeof data.laser !== 'number' ||
            typeof data.explosion !== 'number'
        ) return false
        return true
    }catch(e:any){
        console.error('Error occurred validating DT/DR object in datapoint.')
        return false
    }
}

export function validateArmor(armor: outgoingArmor){
    try {
        if( typeof armor.name !== 'string' ||
            typeof armor.data.value !== 'number' ||
            typeof armor.data.ac !== 'number' ||
            !checkDRDT(armor.data.dr) ||
            !checkDRDT(armor.data.dt) ||
            typeof armor.data.elecRes !== 'number' ||
            typeof armor.data.poisRes !== 'number' ||
            typeof armor.data.radRes !== 'number' ||
            typeof armor.data.weight !== 'number' ||
            typeof armor.data.otherBonuses !== 'string'){
            return false
        }
        return true
    } catch(e:any){
        console.error('Error occurred validating new armor datapoint.')
        return false
    }
}