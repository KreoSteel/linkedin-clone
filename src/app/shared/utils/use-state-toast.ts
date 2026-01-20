import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Result } from "@/app/types";

export const useStateToast = (
   state: Result<string> | undefined,
   pathToRedirect?: string
) => {
   const router = useRouter();

   useEffect(() => {
      if (state?.success && state.data) {
         toast.success(state.data);

         if (pathToRedirect) {
            setTimeout(() => {
               router.push(pathToRedirect);
            }, 1000);
         }
         return;
      }

      if (state && !state.success && state.error) {
         toast.error(state.error);
      }

   }, [state, router, pathToRedirect]);
};