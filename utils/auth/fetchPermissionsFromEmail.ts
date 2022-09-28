import { post } from "../postRequest"

const base = process.env.NODE_ENV === "production" ? "authadmin.phaseshift.in" : "localhost:3000"
const URL = `https://${base}/accounts/signin`
const fetchPermsFromEmail = (user: any, refresh_token: string, access_token: string) => {
    const Account = {
        "name": user.name,
        "email": user.email,
        "googleId": user.id,
        "image": user.image,
        "refreshToken": refresh_token,
        "accessToken": access_token,
    }
    // const prom = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(["a","b"])
    //     }, 2000);
    // })
    // return prom
    return post(URL, {
        ...Account
    })
}

export default fetchPermsFromEmail;