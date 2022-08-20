import getSignedInUser from '../utils/auth/getSignedInUser'
import { useSession } from "next-auth/react"
import { NextPageContext } from 'next'

const Home = () => {
  const {data:session} = useSession()
  return (
    <div className='container' style={{"height":"800px"}}>
      blahblahblahblahblahblahblahblahblahblahblahblahblah
    </div>
  )
}

export default Home


export async function getServerSideProps(context:NextPageContext) {
  let sess=await getSignedInUser(context);
  return {
    props: { session:sess }, // will be passed to the page component as props
  }
}