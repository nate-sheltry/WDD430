import { outgoingAmmo, AmmoCategory } from "./definitions";

export function validateObject(object: any, expectedTypes: any){
    const keys = Object.keys(object);
    for(let i = 0; i < keys.length; i++){
        if(!typeof(object[keys[i]]) == expectedTypes[keys[i]]){
            return false
        }
    }
}

export function validateAmmo(ammo: outgoingAmmo){
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
}

// export function validateArmor(armor: outgoingArmor){
//     if( typeof armor.name !== 'string' ||
//         typeof armor.data.value !== 'number' ||
//         typeof armor.data.ac !== 'number' ||
//         armor.data.dr.every((item) => typeof item == 'number') ||
//         typeof armor.data.vol !== 'number' ||
//         typeof armor.data.dmg !== 'string' ||
//         typeof armor.data.img !== 'string'){
//         return false
//     }
//     return true
//}