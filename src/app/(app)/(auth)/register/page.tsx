import Image from "next/image";
import RegisterForm from "@/app/features/auth/register/ui/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center h-screen py-24 w-full">
            <div className="flex flex-col items-center gap-2 mb-10">
                <Image src="/linkedin-logo.png" alt="Linkedin Logo" width={180} height={180} />
                <span className="text-3xl ">Make the most of your professional life</span>
            </div>
            <RegisterForm />
        </div>
    )
}