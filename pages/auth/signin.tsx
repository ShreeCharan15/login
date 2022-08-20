import { Button } from "@chakra-ui/react"
import { NextPageContext } from "next"
import { getProviders, signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function SignIn({ providers }:any) {
  const router = useRouter()
  const {data:session}=useSession()
  useEffect(()=>{
    if(session){
      router.push("/")
    }
  })
  if(!session)
  return (
    <div className="container d-flex flex-column justify-content-center" style={{"minHeight":"90vh"}}> 
      <div className="d-flex justify-content-center">
        {Object.values(providers).map((provider:any) => (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id)} variant={"solid"} colorScheme="purple">
              Sign in with {provider.name}
              </Button>
          </div>
        ))}
      </div>
    </div>
  )
  else
  return <div>You are already signed in</div>
}

export async function getServerSideProps(context:NextPageContext) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}