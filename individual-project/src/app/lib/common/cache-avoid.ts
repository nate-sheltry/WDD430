export function avoidCaching(){
    return `?timestamp=${Date.now()}`
}