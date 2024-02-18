import { Responses } from "@/app/lib/common/responses";
import { getAmmo } from "@/app/lib/database/get-actions";
import { BSON, ObjectId } from 'mongodb';

export async function GET(req:Request, {params}:{ params: {id: string}}){
    const id = params.id
    if(req.method !== 'GET'){
        return Responses(400)
    }
    try{
    const results = await getAmmo({_id: new ObjectId(id)})
    return Responses(200, {body: results})
    } catch(e:any){
        if(e instanceof BSON.BSONError){
            console.error('MongoDB ObjectId Error: Invalid Id type was passed.\n\tfrom ./src/app/api/resources/ammo/[id]/route.ts')
            return Responses(404, {msg:'Error: Invalid Ammo ID.'})
        }
        else{
            console.error(e)
            return Responses(404, {msg:'Error: Ammo ID was not found.'})
        }
    }
}