import { Responses } from "@/app/lib/common/responses";
import { getArmor } from "@/app/lib/database/get-actions";
import { modifyArmorItem } from "@/app/lib/database/post-put-actions";
import { outgoingArmor } from "@/app/lib/definitions";
import { validateArmor } from "@/app/lib/validation";
import { BSON, ObjectId } from 'mongodb';

export async function GET(req:Request, {params}:{ params: {id: string}}){
    const id = params.id
    if(req.method !== 'GET'){
        return Responses(400)
    }
    try{
    const results = await getArmor({_id: new ObjectId(id)})
    return Responses(200, {body: results})
    } catch(e:any){
        if(e instanceof BSON.BSONError){
            console.error('MongoDB ObjectId Error: Invalid Id type was passed.\n\tfrom ./src/app/api/resources/armor/[id]/route.ts')
            return Responses(404, {msg:'Error: Invalid Armor ID.'})
        }
        else{
            console.error(e)
            return Responses(404, {msg:'Error: Armor ID was not found.'})
        }
    }
}

export async function PUT(req:Request, {params}:{ params: {id: string}}){
    const id = params.id
    if(req.method !== 'PUT'){
        return Responses(400)
    }
    try{
        const body : outgoingArmor = await req.json();
        if(!validateArmor(body))return Responses(400, {msg:'Object posted does not meet the necessary format.'});
        const results = await modifyArmorItem(body, id)
        return Responses(200, {body: results})
    } catch(e:any){
        if(e instanceof BSON.BSONError){
            console.error('MongoDB ObjectId Error: Invalid Id type was passed.\n\tfrom ./src/app/api/resources/armor/[id]/route.ts')
            return Responses(404, {msg:'Error: Invalid Armor ID.'})
        }
        else{
            console.error(e)
            return Responses(404, {msg:'Error: Armor object failed to update.'})
        }
    }
}