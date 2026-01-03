import Image from "next/image";
import LoginForm from "@/app/features/auth/login/ui/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center h-screen py-24 w-full">
            <div className="flex flex-col items-center gap-2 mb-10">
                <Image src="/linkedin-logo.png" alt="Linkedin Logo" width={180} height={180} />
                <span className="text-3xl ">Make the most of your professional life</span>
            </div>

            <LoginForm />
            
            <div className="flex items-center gap-2 mt-4 justify-center">
                <span className="text-sm text-neutral-500">New to LinkedIn? </span>
                <Link href="/register" className="text-sm text-primary-500 hover:underline">Sign up</Link>
            </div>
        </div>
    )
}