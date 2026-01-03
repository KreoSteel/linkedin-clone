import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export type TStateToast = {
   success?: boolean;
   message?: string;
   error?: string | { issues: { message: string }[] };
};

export const useStateToast = (
   state: TStateToast | undefined,
   path: string | undefined
) => {
   const router = useRouter();

   useEffect(() => {
      if (state?.success) {
         toast.success(state.message);

         if (path) {
            setTimeout(() => {
               router.push(path);
            }, 1000);
         }
      }

      if (state?.error) {
         if (typeof state.error === "string") {
            toast.error(state.error);
         } else {
            toast.error(state.error.issues[0].message);
         }
      }
   }, [state, router]);
};
