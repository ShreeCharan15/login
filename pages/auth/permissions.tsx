import {  Heading,Text } from "@chakra-ui/react";
import { NextPage } from "next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
const Permissions:NextPage=()=>{
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
        <Heading as='h4' size='md'>
        Sponsorship
        </Heading>
        <Text>Department of ISE</Text>
        <br/>
        <Heading as='h4' size='md'>
        Campaigning
        </Heading>
        <Text>Volunteer</Text>
        <br/>
        <Heading as='h4' size='md'>
        Department/Club Coordinator
        </Heading>
        <Text>Department of ISE</Text>
        <br/>
        <Heading as='h4' size='md'>
        Event Coordinator
        </Heading>
        <Text>Codeathon</Text>

    </div>
}
export default Permissions;