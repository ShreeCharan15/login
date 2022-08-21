import '../styles/globals.css'
import '../styles/bootstrap-grid.min.css'
import '../styles/bootstrap-utilities.min.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { useSession, signOut } from "next-auth/react"
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { ChakraProvider,extendTheme, Spinner } from '@chakra-ui/react'
import NavBar from '../components/Navbar';

function MyApp({ Component, pageProps:{
  session, ...pageProps
} }: AppProps) {
  return <SessionProvider session={session}>
            <ChakraProvider theme={extendTheme({
                config:{
                useSystemColorMode: false,
                initialColorMode: "dark"
                }
            })}>
              <NavBar></NavBar>
              <div style={{paddingTop:"70px",paddingBottom:"100px"}}>
                {
                  <AuthWrapper >
                    <Component {...pageProps} />
                  </AuthWrapper>
                }
              </div>
            </ChakraProvider>
        </SessionProvider>
}

export default MyApp

const AuthWrapper=({children}:any)=>{
  const router = useRouter();
  const {data:session,status}=useSession();
  useEffect(()=>{
    console.log(router.route);
    if(status==="unauthenticated"){
      router.push("/auth/signin");
    }
  },[status])

  if(status==="loading")
  return <div className='container d-flex flex-column justify-content-center' style={{"minHeight":"90vh"}}>
    <div className='d-flex justify-content-center'> 
    <Spinner></Spinner>
    </div>
  </div>;

  else if (status==="authenticated")
  return <div className='container'>
      {children}
    </div>
  
  else
    return <div className='container'>
      {router.route==="/auth/signin"?children:null}
    </div>
}

