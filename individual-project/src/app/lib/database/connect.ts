'use server'
import { MongoClient } from 'mongodb';

let mongoClient: MongoClient;
const uri = process.env.MONGODB_URI;
const options = {}

if(!uri){
    throw new Error('No MongoDB Database connection string was found.')
}

export default async function connectToDB(){
    try{
        if(mongoClient){
            return mongoClient
        }
        mongoClient = await (new MongoClient(uri as string, options)).connect();
        console.log('Just connected')
        return mongoClient
    } catch(e:any){
        console.error(e)
        return {error: e}
    }
}