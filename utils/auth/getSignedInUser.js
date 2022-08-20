import { NextPageContext } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../../pages/api/auth/[...nextauth]'
const getSignedInUser=async (context)=>{
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      )
    if(!session)
    {
      return null
    }

    if(session.error)
      session=null
      else
        delete session.error;
    
 return session   
}

export default getSignedInUser;