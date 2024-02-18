export function Responses(type:number, {body = {message: ' '}, msg = ' '}:{body?:any,msg?:string} = {}){
    let bodyType :string = JSON.stringify(Object.keys({message: ' '}).sort())
    console.log('Body'+JSON.stringify(body))
    switch(type){
        case 200:
            if(JSON.stringify(Object.keys(body).sort()) == bodyType){
                if(' ' == msg) body.message = 'Successful'
                else body.message = msg
            }
            return new Response(JSON.stringify(body),{
                status:200,
                statusText:'OK',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            break;
        case 201:
            if(JSON.stringify(Object.keys(body).sort()) == bodyType){
                if(' ' == msg) body.message = 'Created'
                else body.message = msg
            }
            return new Response(JSON.stringify(body),{
                status:201,
                statusText:'Created',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            break;
        case 400:
            if(JSON.stringify(Object.keys(body).sort()) == bodyType){
                if(' ' == msg) body.message = 'Bad Request'
                else body.message = msg
            }
            return new Response(JSON.stringify(body), {
                status: 400,
                statusText: 'Bad Request',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            break;
        case 404:
            if(JSON.stringify(Object.keys(body).sort()) == bodyType){
                if(' ' == msg) body.message = 'Not Found'
                else body.message = msg
            }
            return new Response(JSON.stringify(body), {
                status: 404,
                statusText: 'Not Found',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            break;
        case 500:
            if(JSON.stringify(Object.keys(body).sort()) == bodyType){
                if(' ' == msg) body.message = 'Internal Server Error'
                else body.message = msg
            }
            return new Response(JSON.stringify(body), {
                status: 500,
                statusText: 'Internal Server Error',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            break;
    }
}