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
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import { useActionState, useEffect } from "react";
import { editProfileAction } from "../api/edit-profile-action";
import { useStateToast } from "@/app/shared/utils/use-state-toast";
import { useState } from "react";

export default function EditProfileForm({ profile }: { profile: ProfileType }) {
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
         <DialogTrigger className="flex items-center gap-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md p-2 w-fit">
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
                     <Label className="text-sm font-medium text-neutral-700">
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
                     <Label className="text-sm font-medium text-neutral-700">
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
                     <Label className="text-sm font-medium text-neutral-700">
                        Headline
                     </Label>
                     <Textarea
                        defaultValue={profile.headline}
                        name="headline"
                        className="border-neutral-400 rounded-sm h-20 focus:ring-0"
                        maxLength={220}
                        rows={3}
                        disabled={isPending}
                     />
                  </div>
                  <div>
                     <Label className="text-sm font-medium text-neutral-700">
                        Location
                     </Label>
                     <Input
                        type="text"
                        defaultValue={profile.location}
                        name="location"
                        variant="form"
                        maxLength={100}
                        disabled={isPending}
                     />
                  </div>
                  <div>
                     <Label className="text-sm font-medium text-neutral-700">
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
