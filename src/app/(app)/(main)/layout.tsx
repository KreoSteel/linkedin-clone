import { Header } from "@/app/widgets/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />
         {children}
      </>
   );
}