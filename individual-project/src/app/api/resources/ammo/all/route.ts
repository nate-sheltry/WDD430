'use server'

import { Responses } from "@/app/lib/common/responses"
import { getAmmo } from "@/app/lib/database/get-actions"

export async function GET(req:Request){
    if(req.method !== 'GET'){
        return Responses(400)
    }
    const results = await getAmmo()
    return Responses(200, {body: results})
}