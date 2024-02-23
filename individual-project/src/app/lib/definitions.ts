import { ObjectId } from "mongodb";

export type AmmoCategory = 'handguns' | 'rifles' | 'big guns' | 'energy weapons' | 'other';
export type dtdr = {
    [key:string]: number;
    normal: number;
    fire: number;
    plasma: number;
    laser: number;
    explosion: number;
}

export type outgoingAmmo = {
    name: string;
    data: {
        value: number;
        ac: number;
        dr: number;
        vol: number;
        dmg: string;
        category: AmmoCategory[];
        img: string;
    }
}

export type incomingAmmo = {
    _id: ObjectId;
    name: string;
    data: {
        value: number;
        ac: number;
        dr: number;
        vol: number;
        dmg: string;
        category: AmmoCategory[];
        img: string;
    }
}

export type outgoingArmor = {
    name: string;
    data: {
        value: number;
        ac: number;
        dr: dtdr;
        dt: dtdr;
        elecRes: number;
        poisRes: number;
        radRes: number;
        weight: number;
        otherBonuses: string;
    }
}


export type incomingArmor = {
    _id: ObjectId;
    name: string;
    data: {
        value: number;
        ac: number;
        dr: dtdr;
        dt: dtdr;
        elecRes: number;
        poisRes: number;
        radRes: number;
        weight: number;
        otherBonuses: string;
    }
}