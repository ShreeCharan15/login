import {  Badge, Box, Button, Heading,Text } from "@chakra-ui/react";
import { NextPage } from "next";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
import { signIn, signOut, useSession } from "next-auth/react";
const Permissions:NextPage=()=>{
    const {data:session}:any = useSession()
    return <div className="container">
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>Permissions</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <br/>
        <Heading size='lg'>
            Permissions
        </Heading>
        <br/>

        {
            session?.user?.permissions?
            Object.keys(session.user.permissions).map((permission:string)=>{
                return <>
                <Heading as='h4' size='md' style={{"textTransform":"capitalize"}}>
                🍟{permission}
                </Heading>
                {
                    session.user.permissions[permission].admin?<Badge>Admin</Badge>:null
                }
                {
                    session.user.permissions[permission].values.map((value:any,index:any)=><Text key={index}>{value}</Text>)
                }
                <br/>
                </>

            })
            :null
        }

        
    <br/>    
    <Alert status='warning' >
        <AlertIcon />
        
        <Box>
        <AlertTitle>Permissions might not be updated!</AlertTitle>
        <AlertDescription>Permissions can only be updated during signin.
            Please sign out and in again if you feel that the current
            permissions are outdated.
            <br/> 
            
        </AlertDescription>
        </Box>
        
    </Alert>
    <Button onClick={()=>{
        signOut()
        .then(()=>{
            signIn("google")
        })
        .catch((error:any)=>{})
    }} style={{"margin":"10px"}}>Sign out</Button>
    </div>
}
export default Permissions;

// flexDirection='column'
//   alignItems='start'
//   justifyContent='start'