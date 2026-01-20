"use client";
import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription, Label, Input } from "@/app/shared/ui";
import { Textarea } from "@/app/shared/ui/textarea";
import { useActionState, useState, useEffect } from "react";
import { createExperienceAction } from "../api/experience-create-action";
import { useStateToast } from "@/app/shared/utils/use-state-toast";

export default function CreateExperienceModal() {
    const [open, setOpen] = useState(false);
    const [isCurrentChecked, setIsCurrentChecked] = useState(false);
    const [state, formAction, isPending] = useActionState(createExperienceAction, undefined)
    useStateToast(state);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="text-sm border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-all rounded-full cursor-pointer px-3 py-1.5 w-fit">
                    Add experience
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add experience</DialogTitle>
                <DialogDescription>
                    Add your experience to your profile.
                </DialogDescription>
                <form action={formAction} className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-2">
                        <Label>Position *</Label>
                        <Input type="text" name="position" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Company *</Label>
                        <Input type="text" name="company" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Location</Label>
                        <Input type="text" name="location" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Description</Label>
                        <Textarea name="description" />
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <input id="current" type="checkbox" className="w-4 h-4 rounded-sm border group-hover:border-neutral-700 transition-all border-neutral-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-600" name="current" checked={isCurrentChecked} onChange={() => setIsCurrentChecked(!isCurrentChecked)} />
                        <Label htmlFor="current" className="hover:text-neutral-600 transition-all cursor-pointer">I am currently work on this position</Label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Start Date *</Label>
                        <Input type="date" name="startDate" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2 pb-5">
                        <Label>End Date</Label>
                        <Input type="date" name="endDate" variant="form" disabled={isCurrentChecked} />
                    </div>
                    <Button type="submit" className="w-fit bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isPending}>{isPending ? "Adding experience..." : "Add experience"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}