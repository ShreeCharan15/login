import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Avatar,
    Box,
    Button,
    Menu,
    MenuList,
    Text,
    MenuItem,
    MenuButton,
    MenuGroup,
  } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
  import React  from "react"
const NavBar=()=>{
  const {data:session}=useSession();

    const bg="rgba(11, 17, 26, 0.8)"
    const col="#fcd19c"
      return (<>
         <Box shadow="base" style={{width:"100%",height:"60px",padding:"10px",backgroundColor:bg,
         backdropFilter:"blur(20px)",
         borderRadius:"0px 0px 1rem 1rem",}}
         className="navbar fixed-top">
            <div className="container d-flex flex-column justify-content-center" style={{height:"100%"}}>
              <div className="row">
                <div className="col-auto d-flex flex-column justify-content-center">
                  <Link href={"/"}>
                  <Image src={"/pslogo.webp"} alt="pslogo" height={"50px"} width={"50px"}></Image>

                  </Link>
                </div>
                <div className="col d-flex flex-column justify-content-center" >
                  TITLE
                </div>
               {session?<AccountInfo session={session}/>:null}
              </div>
                
            </div>
         </Box>
      </>)
  }

export default NavBar

const AccountInfo=({session})=>{
const router=useRouter()
return  <div className="col-auto d-flex flex-column justify-content-center">
<Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
  <Avatar size='sm' name={session.user.name} 
      referrerPolicy="no-referrer"
      src={session.user.image} ></Avatar>
  </MenuButton>
  <MenuList>
  <MenuGroup title={session.user.name}></MenuGroup>
  <MenuGroup title={session.user.email}></MenuGroup>
    
    <MenuItem onClick={()=>router.push("/auth/permissions")}>View Permissions</MenuItem>
    <MenuItem onClick={()=>signOut()}>Sign Out</MenuItem>
  </MenuList>
</Menu>

</div>
}


