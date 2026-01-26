import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from "@/app/shared/ui/dialog";
import { Button } from "@/app/shared/ui/button";
import { FaEdit } from "react-icons/fa";
import { Label } from "@/app/shared/ui/label";
import { Input } from "@/app/shared/ui/input";
import { Separator } from "@/app/shared/ui/separator";
import { Textarea } from "@/app/shared/ui/textarea";
import { useActionState, useEffect } from "react";
import { editProfileAction } from "../api/edit-profile-action";
import { useStateToast } from "@/app/shared/utils/use-state-toast";
import { useState } from "react";
import { EditProfileFormProps } from "../model/types";

export default function EditProfileForm({ profile }: EditProfileFormProps) {
   const [open, setOpen] = useState(false);
   const [state, formAction, isPending] = useActionState(
      editProfileAction,
      undefined
   );
   useStateToast(state);

   useEffect(() => {
      if (state?.success) {
         setOpen(false);
      }
   }, [state]);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger className="flex items-center gap-2 text-sm bg-primary-500 text-primary-50 hover:bg-primary-600 transition-all rounded-full cursor-pointer px-2.5 py-2 w-fit">
            <FaEdit size={16} />
            <span>Edit Profile</span>
         </DialogTrigger>

         <DialogContent>
            <DialogTitle>Edit Profile</DialogTitle>
            <Separator />
            <form action={formAction} className="flex flex-col gap-4">
               <div className="flex flex-col gap-2">
                  <p>Personal Information</p>
                  <div>
                     <Label className="text-base font-medium text-neutral-700">
                        First Name *
                     </Label>
                     <Input
                        type="text"
                        defaultValue={profile.firstName}
                        name="firstName"
                        variant="form"
                        maxLength={30}
                        disabled={isPending}
                        required
                     />
                  </div>
                  <div>
                     <Label className="text-base font-medium text-neutral-700">
                        Last Name *
                     </Label>
                     <Input
                        type="text"
                        defaultValue={profile.lastName}
                        name="lastName"
                        variant="form"
                        maxLength={30}
                        disabled={isPending}
                        required
                     />
                  </div>
                  <div>
                     <Label className="text-base font-medium text-neutral-700">
                        Headline
                     </Label>
                     <Textarea
                        defaultValue={profile.headline ?? ""}
                        name="headline"
                        className="border-neutral-400 rounded-sm h-20 focus:ring-0"
                        maxLength={220}
                        rows={3}
                        disabled={isPending}
                     />
                  </div>
                  <div>
                     <Label className="text-base font-medium text-neutral-700">
                        Location
                     </Label>
                     <Input
                        type="text"
                        defaultValue={profile.location ?? ""}
                        name="location"
                        variant="form"
                        maxLength={100}
                        disabled={isPending}
                     />
                  </div>
                  <div>
                     <Label className="text-base font-medium text-neutral-700">
                        Email *
                     </Label>
                     <Input
                        type="email"
                        defaultValue={profile.email}
                        name="email"
                        variant="form"
                        maxLength={100}
                        required
                        disabled={isPending}
                     />
                  </div>
                  <Separator className="my-2.5" />
                  <div className="flex flex-col gap-2">
                     <p>About</p>
                     <p className="text-sm text-neutral-700">
                        You can write about your years of experience, industry, or
                        skills. People also talk about their achievements or
                        previous job experiences.
                     </p>
                  </div>
                  <div>
                     <Label className="text-base font-medium text-neutral-700">
                        Biography
                     </Label>
                     <Textarea
                        defaultValue={profile.biography ?? ""}
                        name="biography"
                        className="border-neutral-400 rounded-sm h-40 focus:ring-0"
                        maxLength={2600}
                        disabled={isPending}
                     />
                  </div>
               </div>
               <Separator />
               <Button
                  className="w-fit bg-primary-500 text-white hover:bg-primary-600 hover:text-white rounded-full"
                  disabled={isPending}>
                  {isPending ? "Saving..." : "Save"}
               </Button>
            </form>
         </DialogContent>
      </Dialog>
   );
}
