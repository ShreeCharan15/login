export const post=(url:string,body:Object)=>fetch(url,
    {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body),
        credentials:'same-origin'
    }
    ).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error:any =new Error('Error '+response.status+' ; '+response.statusText);
            error.response=response;
            error.status=response.status;
            throw error;
        }
    },
    error=> {
        var errmess:any=new Error(error.message);
        errmess.status=502;
        throw errmess;
    }
    ).then(response=>
        response.json()
    )