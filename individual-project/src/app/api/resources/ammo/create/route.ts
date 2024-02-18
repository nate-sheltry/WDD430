import { Responses } from "@/app/lib/common/responses";
import { getAmmo } from "@/app/lib/database/get-actions";
import { outgoingAmmo } from "@/app/lib/definitions";
import { validateAmmo } from "@/app/lib/validation";
import { BSON, ObjectId } from 'mongodb';

export async function POST(req:Request){
    if(req.method !== 'POST'){
        return Responses(400)
    }
    const body : outgoingAmmo = await req.json();
    if(!validateAmmo(body))return Responses(400, {msg:'Object posted does not meet the necessary format.'});
    console.log(body)
    return Responses(200)
    // try{
    // const results = await getAmmo({_id: new ObjectId()})
    // return Responses(200, {body: results})
    // } catch(e:any){
    //     if(e instanceof BSON.BSONError){
    //         console.error('MongoDB ObjectId Error: Invalid Id type was passed.\n\tfrom ./src/app/api/resources/ammo/[id]/route.ts')
    //         return Responses(404, {msg:'Error: Invalid Ammo ID.'})
    //     }
    //     else{
    //         console.error(e)
    //         return Responses(404, {msg:'Error: Ammo ID was not found.'})
    //     }
    // }
}