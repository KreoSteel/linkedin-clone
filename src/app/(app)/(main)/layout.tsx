import HeaderComponent from "@/app/widgets/header/ui/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <HeaderComponent />
         {children}
      </>
   );
}