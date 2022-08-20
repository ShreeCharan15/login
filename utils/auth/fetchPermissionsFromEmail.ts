import { post } from "../postRequest"

const URL=""
const fetchPermsFromEmail=(email:string,id:string)=>{
    const prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["a","b"])
        }, 2000);
    })
    return prom
    // return post("",{
    //     email:email,
    //     id:id
    // })
}

export default fetchPermsFromEmail;