import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/app/shared/ui";
import { deleteExperienceAction } from "../api/experience-delete-action";
import { useActionState, useState, useEffect } from "react";
import { useStateToast } from "@/app/shared/utils/use-state-toast";
import { TExperience } from "@/app/entities/experience";

export default function ExperienceDeleteModal({ experience }: { experience: TExperience}) {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(deleteExperienceAction, undefined)
    useStateToast(state);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="text-sm border-2 border-red-500 text-red-500 hover:bg-red-50 transition-all rounded-full cursor-pointer px-3 py-1.5 w-fit">
                    Delete experience
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete experience</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently remove this experience?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                    <form action={formAction} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={experience.id} />
                        <Button type="submit" variant="destructive" disabled={isPending}>
                            Delete
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}