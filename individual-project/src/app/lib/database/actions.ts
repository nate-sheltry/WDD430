'use server'
import { MongoClient, ObjectId} from 'mongodb'
import connectToDB from './connect'
import { unstable_noStore as noStore } from 'next/cache';

const ResourcesDB = process.env.MONGODB_RESOURCES_DB as string
const AmmoCollection = process.env.RESOURCES_AMMO as string
const ArmorCollection = process.env.RESOURCES_ARMOR as string
const MiscCollection = process.env.RESOURCES_MISC as string

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

async function createDataPoint(databaseString: string, collectionString:string, data:any = {}){
    noStore();
    try{
        const mongoClient = await connectToDB();
        if(!(mongoClient instanceof MongoClient)){
            throw new Error('error connecting to the database.')
        }
        const db = mongoClient.db(databaseString);
        const collection = db.collection(collectionString);
        const results = await collection.insertOne(data)
        return results;
    } catch(e:any){
        return {error: e};
    }
}

async function modifyDataPoint(databaseString: string, collectionString:string, data:any, id:string){
    noStore();
    try{
        const mongoClient = await connectToDB();
        if(!(mongoClient instanceof MongoClient)){
            throw new Error('error connecting to the database.')
        }
        const db = mongoClient.db(databaseString);
        const collection = db.collection(collectionString);
        const update = {
            $set: data
        }
        const filter = {
            _id: new ObjectId(id)
        }
        const results = await collection.updateOne(filter, update)
        return results;
    } catch(e:any){
        return {error: e};
    }
}

async function deleteDataPoint(databaseString: string, collectionString:string, id:string){
    noStore();
    try{
        const mongoClient = await connectToDB();
        if(!(mongoClient instanceof MongoClient)){
            throw new Error('error connecting to the database.')
        }
        const db = mongoClient.db(databaseString);
        const collection = db.collection(collectionString);
        const filter = {
            _id: new ObjectId(id)
        }
        const results = await collection.deleteOne(filter)
        return results;
    } catch(e:any){
        return {error: e};
    }
}

export async function getAmmo(search:any = {}){
    return await getData(ResourcesDB, AmmoCollection, search)
}

export async function getArmor(search:any = {}){
    return await getData(ResourcesDB, ArmorCollection, search)
}

export async function getResources(search1:any = {}, search2:any = {}){
    return {Ammo: await getData(ResourcesDB, AmmoCollection, search1), Armor: await getData(ResourcesDB, ArmorCollection, search2)}
}

export async function createAmmoItem(data:any){
    return await createDataPoint(ResourcesDB, AmmoCollection, data)
}

export async function createArmorItem(data:any){
    return await createDataPoint(ResourcesDB, ArmorCollection, data)
}


export async function modifyAmmoItem(data:any,id:string){
    return await modifyDataPoint(ResourcesDB, AmmoCollection, data, id)
}

export async function modifyArmorItem(data:any,id:string){
    return await modifyDataPoint(ResourcesDB, ArmorCollection, data, id)
}

export async function deleteAmmoItem(id:string){
    deleteDataPoint(ResourcesDB, AmmoCollection, id)
}

export async function deleteArmorItem(id:string){
    deleteDataPoint(ResourcesDB, ArmorCollection, id)
}

/*Global Resource Calls*/
async function getMiscData(search:string){
    return await getData(ResourcesDB, MiscCollection, search)
}

async function getAmmoCategories(){
    return await getMiscData('ammo-categories')
}