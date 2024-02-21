import { Responses } from "@/app/lib/common/responses";
import { createArmorItem } from "@/app/lib/database/post-put-actions";
import { outgoingArmor } from "@/app/lib/definitions";
import { validateArmor } from "@/app/lib/validation";
import { BSON, ObjectId } from 'mongodb';

export async function POST(req:Request){
    if(req.method !== 'POST'){
        return Responses(400)
    }
    const body : outgoingArmor = await req.json();
    if(!validateArmor(body))return Responses(400, {msg:'Object posted does not meet the necessary format.'});
    console.log(body)
    try{
        const results = await createArmorItem(body)
        return Responses(200, {body: results})
    } catch(e:any){
        if(e instanceof BSON.BSONError){
            console.error('MongoDB ObjectId Error: Invalid object type was passed.\n\tfrom ./src/app/api/resources/armor/create/route.ts')
            return Responses(404, {msg:'Error: Armor Object failed to be created due invalid data being passed.'})
        }
        else{
            console.error(e)
            return Responses(404, {msg:'Error: Armor object failed to be created.'})
        }
    }
}