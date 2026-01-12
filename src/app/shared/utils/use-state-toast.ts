import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export type StateToast = {
   success?: boolean;
   message?: string;
   error?: string | { issues: Array<{ message: string }> };
};

export const useStateToast = (
   state: StateToast | undefined,
   path?: string
) => {
   const router = useRouter();

   useEffect(() => {
      if (state?.success && state.message) {
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
         } else if (state.error.issues && Array.isArray(state.error.issues)) {
            toast.error(state.error.issues[0].message);
         }
      }

   }, [state, router, path]);
};
