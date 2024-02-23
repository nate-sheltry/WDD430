import { headers } from "next/headers"

export function getHost(){
    const host = headers().get('x-forwarded-host')
    const protocol = headers().get('x-forwarded-proto')
    return `${protocol}://${host}`
}