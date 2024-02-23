'use server'

import { Responses } from "@/app/lib/common/responses"
import { getAmmo } from "@/app/lib/database/get-actions"

export async function GET(req:Request){
    if(req.method !== 'GET'){
        return Responses(400)
    }
    const results = await getAmmo()
    console.log('Results from getting ammo')
    return new Response(JSON.stringify(results),{
        status:200,
        statusText:'OK',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}