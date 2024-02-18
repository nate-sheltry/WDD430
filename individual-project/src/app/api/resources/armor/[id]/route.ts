import { Responses } from "@/app/lib/common/responses";
import { getArmor } from "@/app/lib/database/get-actions";
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