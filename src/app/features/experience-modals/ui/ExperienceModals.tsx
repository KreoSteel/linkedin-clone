"use client";
import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription, Label, Input } from "@/app/shared/ui";
import { Textarea } from "@/app/shared/ui/textarea";
import { useActionState, useState, useEffect } from "react";
import { createExperienceAction } from "../api/experience-create-action";
import { useStateToast } from "@/app/shared/utils/use-state-toast";
import { PencilIcon, PlusIcon } from "lucide-react";
import { format } from "date-fns";
import { experienceEditAction } from "../api/experience-edit-action";
import ExperienceDeleteModal from "./ExperienceDeleteModal";
import { Separator } from "@/app/shared/ui/separator";
import { ExperienceModalsProps } from "../model/types";

export default function ExperienceModals({ isEditMode = false, experience }: ExperienceModalsProps) {
    const [open, setOpen] = useState(false);
    const [isCurrentChecked, setIsCurrentChecked] = useState(experience?.current || false);
    const [createState, createFormAction, isCreatePending] = useActionState(createExperienceAction, undefined)
    const [editState, editFormAction, isEditPending] = useActionState(experienceEditAction, undefined)
    useStateToast(createState);
    useStateToast(editState);

    useEffect(() => {
        if (createState?.success || editState?.success) {
            setOpen(false);
        }
    }, [createState, editState]);

    if (isEditMode && experience) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="cursor-pointer hover:bg-neutral-100 transition-all rounded-full px-3 py-1.5 w-fit">
                    <PencilIcon className="w-4 h-4" />
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Edit experience</DialogTitle>
                    <Separator />
                    <DialogDescription className="text-base text-neutral-700">
                        Update and refine the details of your professional experience.
                    </DialogDescription>
                    <form action={editFormAction} className="flex flex-col gap-2.5">
                        <input type="hidden" name="id" value={experience.id} />
                        <div className="flex flex-col gap-2">
                            <Label>Position *</Label>
                            <Input type="text" name="position" variant="form" required defaultValue={experience.position} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Company *</Label>
                            <Input type="text" name="company" variant="form" required defaultValue={experience.company} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Location</Label>
                            <Input type="text" name="location" variant="form" defaultValue={experience.location || ""} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Description</Label>
                            <Textarea name="description" defaultValue={experience.description || ""} />
                        </div>
                        <div className="flex items-center gap-2 py-2">
                            <input id="current" type="checkbox" className="w-4 h-4 rounded-sm border group-hover:border-neutral-700 transition-all border-neutral-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-600" name="current" checked={isCurrentChecked} onChange={() => setIsCurrentChecked(!isCurrentChecked)} />
                            <Label htmlFor="current" className="hover:text-neutral-600 transition-all cursor-pointer">I am currently working on this position</Label>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Start Date *</Label>
                            <Input type="date" name="startDate" variant="form" required defaultValue={format(experience.startDate, "yyyy-MM-dd")} />
                        </div>
                        <div className="flex flex-col gap-2 pb-5">
                            <Label>End Date</Label>
                            <Input type="date" name="endDate" variant="form" disabled={isCurrentChecked} defaultValue={experience.endDate ? format(experience.endDate, "yyyy-MM-dd") : ""} />
                        </div>
                        <div className="flex justify-between">
                            <Button type="submit" className="w-fit bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isEditPending}>{isEditPending ? "Saving..." : "Save "}</Button>
                            <ExperienceDeleteModal experience={experience} />
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="text-sm border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-all rounded-full cursor-pointer px-3 py-1.5 w-fit">
                    <PlusIcon className="w-4 h-4" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add experience</DialogTitle>
                <Separator />
                <DialogDescription className="text-base text-neutral-700">
                    Add details about your professional experience to showcase your work history. This information will help others understand your career journey and achievements.
                </DialogDescription>
                <form action={createFormAction} className="flex flex-col gap-2.5">
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
                        <Input type="text" name="location" variant="form" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Description</Label>
                        <Textarea name="description" />
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <input id="current" type="checkbox" className="w-4 h-4 rounded-sm border group-hover:border-neutral-700 transition-all border-neutral-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-600" name="current" checked={isCurrentChecked} onChange={() => setIsCurrentChecked(!isCurrentChecked)} />
                        <Label htmlFor="current" className="hover:text-neutral-600 transition-all cursor-pointer">I am currently working on this position</Label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Start Date *</Label>
                        <Input type="date" name="startDate" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2 pb-5">
                        <Label>End Date</Label>
                        <Input type="date" name="endDate" variant="form" disabled={isCurrentChecked} />
                    </div>
                    <Button type="submit" className="w-fit bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isCreatePending}>{isCreatePending ? "Adding experience..." : "Add experience"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}