'use server'
import { MongoClient} from 'mongodb'
import connectToDB from './connect'
import { unstable_noStore as noStore } from 'next/cache';

async function getData(databaseString: string, collectionString:string, search:any = {}){
    noStore();
    try{
        const mongoClient = await connectToDB();
        if(!(mongoClient instanceof MongoClient)){
            throw new Error('error connecting to the database.')
        }
        const db = mongoClient.db(databaseString);
        const collection = db.collection(collectionString);
        const results = await collection
            .find(search)
            .toArray();
        return results;
    } catch(e:any){
        return {error: e};
    }
}

async function getDataLimit(databaseString: string, collectionString:string, limit:number, search:any = {}){
    noStore();
    try{
        const mongoClient = await connectToDB();
        if(!(mongoClient instanceof MongoClient)){
            throw new Error('error connecting to the database.')
        }
        const db = mongoClient.db(databaseString);
        const collection = db.collection(collectionString);
        const results = await collection
            .find(search)
            .limit(limit)
            .toArray();
        return results;
    } catch(e:any){
        return {error: e};
    }
}

export async function getAmmo(search:any = {}){
    return await getData('Resources', 'Ammo-2.0', search)
}

export async function getArmor(search:any = {}){
    return await getData('Resources', 'Armor-2.0', search)
}

export async function getResources(search1:any = {}, search2:any = {}){
    return {Ammo: await getData('Resources', 'Ammo-2.0', search1), Armor: await getData('Resources', 'Armor-2.0', search2)}
}