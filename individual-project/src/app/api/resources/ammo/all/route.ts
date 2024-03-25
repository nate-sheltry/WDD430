import { Responses } from "@/app/lib/common/responses"
import { getAmmo } from "@/app/lib/database/actions"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:Request){
    if(req.method !== 'GET'){
        return Responses(400)
    }
    const results = await getAmmo()
    console.log('Results from getting ammo')
   return Responses(200, {body: results})
}