import { Responses } from "@/app/lib/common/responses";
import { getAmmo } from "@/app/lib/database/get-actions";
import { createAmmoItem } from "@/app/lib/database/post-put-actions";
import { outgoingAmmo } from "@/app/lib/definitions";
import { validateAmmo } from "@/app/lib/validation";
import { BSON, ObjectId } from 'mongodb';

export async function POST(req:Request){
    if(req.method !== 'POST'){
        return Responses(400)
    }
    const body : outgoingAmmo = await req.json();
    if(!validateAmmo(body))return Responses(400, {msg:'Object posted does not meet the necessary format.'});
    try{
        const results = await createAmmoItem(body)
        return Responses(200, {body: results})
    } catch(e:any){
        if(e instanceof BSON.BSONError){
            console.error('MongoDB ObjectId Error: Invalid object type was passed.\n\tfrom ./src/app/api/resources/ammo/create/route.ts')
            return Responses(404, {msg:'Error: Ammo Object failed to be created due invalid data being passed.'})
        }
        else{
            console.error(e)
            return Responses(404, {msg:'Error: Ammo object failed to be created.'})
        }
    }
}