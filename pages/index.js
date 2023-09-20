
import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import Image from "next/image";
import GonImage from "@/public/gon.jpg"

function Home() {
  const { data: session, status } = useSession();
  console.log(session?.user?.image, "imp")
  return <Layout>
      {}
        <div className="flex justify-between items-center">
          <p>Welcome, {session?.user?.name}</p>
          <Image className="rounded-full" src={session?.user?.image ?? GonImage} alt="" width={30} height={30}/>
          </div>
  </Layout>
}

export default Home
