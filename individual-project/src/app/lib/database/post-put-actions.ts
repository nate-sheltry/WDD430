'use server'
import { MongoClient, ObjectId} from 'mongodb'
import connectToDB from './connect'

async function createDataPoint(databaseString: string, collectionString:string, data:any = {}){
    try{
        const mongoClient = await connectToDB();
        if(!(mongoClient instanceof MongoClient)){
            throw new Error('error connecting to the database.')
        }
        const db = mongoClient.db(databaseString);
        const collection = db.collection(collectionString);
        const results = await collection
            .insertOne(data)
        return results;
    } catch(e:any){
        return {error: e};
    }
}

async function modifyDataPoint(databaseString: string, collectionString:string, data:any, id:string){
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
        console.log(update)
        const filter = {
            _id: new ObjectId(id)
        }
        console.log(filter)
        const results = await collection
            .updateOne(filter, update)
        return results;
    } catch(e:any){
        return {error: e};
    }
}

export async function createAmmoItem(data:any){
    return await createDataPoint('Resources', 'Ammo-2.0', data)
}

export async function createArmorItem(data:any){
    return await createDataPoint('Resources', 'Armor-2.0', data)
}


export async function modifyAmmoItem(data:any,id:string){
    return await modifyDataPoint('Resources', 'Ammo-2.0', data, id)
}

export async function modifyArmorItem(data:any,id:string){
    return await modifyDataPoint('Resources', 'Armor-2.0', data, id)
}