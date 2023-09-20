import Image from "next/image";
import Link from "next/link";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleIcon from "@/public/google.svg"
import BrandLogo from "@/public/brandLogo.svg";


export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "", 
        password: ""
    })
    const router = useRouter()

    const {email, password} = data;

    function togglePassword() {
        setShowPassword((show) => !show);
    }

    function handleInput(ev) {
        setData((data) => {
            return {
                ...data,
                [ev.target.name]: ev.target.value
            }
        })
    }

    async function credentialLogin(ev) {
        ev.preventDefault();
         const res = await signIn("credentials", {...data, redirect: false});
         console.log("The value of res", res)
         if(res.error) {
            console.log(res.error)
            console.log(res.status)
            alert(res.error);
            return;
         }
         router.push("/");

    }

    async function googleLogin() {
        signIn("google", {callbackUrl: "/"})
    }

    return (
        <div className="w-full min-h-screen h-full md:grid md:grid-cols-[40%_60%] justify-center items-center">
            <div className="hidden md:block w-full h-full overflow-hidden">
                <Image src="/animatedBg.svg" className="w-full h-full scale-[3] rotate-[25deg]" width={20} height={20} alt=""/>
            </div>
            <div className="flex justify-center items-center w-full h-full relative overflow-hidden">
                <Image  src={BrandLogo} alt="" className="absolute scale-[4] bottom-0 right-0" />
                <div className="max-w-[375px] w-full p-6 rounded-md shadow-2xl shadow-purple-300 bg-white z-10">
                    <h1 className="text-4xl text-gray-900 mb-2 font-medium">Login</h1>
                    <p className="text-gray-700 text-sm mb-6">Access Dashboard</p>
                    <form>
                        <div className="mb-4">
                            <label className="text-sm text-gray-700 " htmlFor="email">Email</label><br />
                            <div className="relative flex justify-end items-center">
                                <input  className="w-full px-4 focus:outline-none rounded-sm  py-1 text-lg font-medium  placeholder:text-gray-300 " id="email" type="text" placeholder="ENTER YOUR EMAIL" value={email} onChange={handleInput} name="email"/>
                                <EmailOutlinedIcon className="absolute text-[20px] mr-2 !important" />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="text-sm text-gray-700" htmlFor="password">Password</label><br />
                            <div className="relative flex justify-end items-center">
                                <input className="w-full px-4 focus:outline-none rounded-sm  py-1 text-lg font-medium placeholder:text-gray-300" id="password" placeholder="ENTER YOUR PASSWORD" type={showPassword ? "text" : "password"} value={password} onChange={handleInput} name="password"/>
                                {showPassword ? <VisibilityOutlinedIcon className="absolute text-[22px] !important mr-2" onClick={togglePassword} /> : <VisibilityOffOutlinedIcon className="absolute text-[22px] mr-2 !important" onClick={togglePassword} />}
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-700 text-sm">Don't have Account? Create <Link className="text-purple-700" href="/auth/signup">here!</Link></p>
                            <p className="text-gray-700 text-sm">Cant Remember Password? <Link className="text-purple-700" href="/yet to do">Reset Password</Link></p>
                        </div>
                        <div><button className="w-full rounded-md bg-gradient  text-white px-3 py-2 text-lg from-purple-600 to-purple-300 to-10% hover:scale-[1.03] transition-all ease-in-out duration-300 " onClick={credentialLogin}>Login</button></div>
                    </form>
                    <div className="flex my-6 items-center justify-center gap-2">
                        <div className="h-[1px] bg-purple-400/80 pr-2 w-full"></div>
                        <span>OR</span>
                        <div className="h-[1px] bg-purple-400/80 pl-2 w-full"></div>
                    </div>

                    <div>


                    <button className="w-full flex justify-center items-center rounded-md border border-1 hover:border-purple-600 font-medium px-2 py-2 text-lg " onClick={googleLogin}><Image src={GoogleIcon} alt="" className="h-[22px] w-[22px] mr-2" />Sign in with Google</button>
                    </div>
                </div>
            </div></div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    console.log("server side login", session)
    
    if(session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }

}
