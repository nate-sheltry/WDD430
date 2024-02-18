'use server'

import { Responses } from "@/app/lib/common/responses"
import { getArmor } from "@/app/lib/database/get-actions"

export async function GET(req:Request){
    if(req.method !== 'GET'){
        return Responses(400)
    }
    const results = await getArmor()
    return Responses(200, {body: results})
}