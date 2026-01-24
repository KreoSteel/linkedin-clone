"use client";
import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription, Label, Input } from "@/app/shared/ui";
import { Textarea } from "@/app/shared/ui/textarea";
import { useActionState, useState, useEffect } from "react";
import { educationCreateAction } from "../api/education-create-action";
import { useStateToast } from "@/app/shared/utils/use-state-toast";
import { TEducation } from "@/app/entities/education";
import { PencilIcon, PlusIcon } from "lucide-react";
import { format } from "date-fns";
import { educationEditAction } from "../api/education-edit-action";
import EducationDeleteModal from "./EducationDeleteModal";
import { Separator } from "@/app/shared/ui/separator";

interface EducationModalsProps {
    isEditMode?: boolean;
    education?: TEducation;
}

export default function EducationModals({ isEditMode = false, education }: EducationModalsProps) {
    const [open, setOpen] = useState(false);
    const [isCurrentChecked, setIsCurrentChecked] = useState(education?.current || false);
    const [createState, createFormAction, isCreatePending] = useActionState(educationCreateAction, undefined)
    const [editState, editFormAction, isEditPending] = useActionState(educationEditAction, undefined)
    useStateToast(createState);
    useStateToast(editState);

    useEffect(() => {
        if (createState?.success || editState?.success) {
            setOpen(false);
        }
    }, [createState, editState]);

    if (isEditMode && education) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="cursor-pointer hover:bg-neutral-100 transition-all rounded-full px-3 py-1.5 w-fit">
                    <PencilIcon className="w-4 h-4" />
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Edit education</DialogTitle>
                    <Separator />
                    <DialogDescription>
                        Update and refine the details of your education.
                    </DialogDescription>
                    <form action={editFormAction} className="flex flex-col gap-2.5">
                        <input type="hidden" name="id" value={education.id} />
                        <div className="flex flex-col gap-2">
                            <Label>School *</Label>
                            <Input type="text" name="school" variant="form" required defaultValue={education.school} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Degree *</Label>
                            <Input type="text" name="degree" variant="form" required defaultValue={education.degree} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Field of study *</Label>
                            <Input type="text" name="field" variant="form" required defaultValue={education.field} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Description</Label>
                            <Textarea name="description" defaultValue={education.description || ""} />
                        </div>
                        <div className="flex items-center gap-2 py-2">
                            <input id="current" type="checkbox" className="w-4 h-4 rounded-sm border group-hover:border-neutral-700 transition-all border-neutral-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-600" name="current" checked={isCurrentChecked} onChange={() => setIsCurrentChecked(!isCurrentChecked)} />
                            <Label htmlFor="current" className="hover:text-neutral-600 transition-all cursor-pointer">I am currently studying here</Label>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Start Date *</Label>
                            <Input type="date" name="startDate" variant="form" required defaultValue={format(education.startDate, "yyyy-MM-dd")} />
                        </div>
                        <div className="flex flex-col gap-2 pb-5">
                            <Label>End Date</Label>
                            <Input type="date" name="endDate" variant="form" disabled={isCurrentChecked} defaultValue={education.endDate ? format(education.endDate, "yyyy-MM-dd") : ""} />
                        </div>
                        <div className="flex justify-between">
                            <Button type="submit" className="w-fit bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isEditPending}>{isEditPending ? "Saving..." : "Save "}</Button>
                            <EducationDeleteModal education={education} />
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
                <DialogTitle>Add education</DialogTitle>
                <Separator />
                <DialogDescription>
                    Add details about your education to showcase your academic journey. This information will help others understand your academic achievements and qualifications.
                </DialogDescription>
                <form action={createFormAction} className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-2">
                        <Label>School *</Label>
                        <Input type="text" name="school" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Degree *</Label>
                        <Input type="text" name="degree" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Field of study *</Label>
                        <Input type="text" name="field" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Description</Label>
                        <Textarea name="description" />
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <input id="current" type="checkbox" className="w-4 h-4 rounded-sm border group-hover:border-neutral-700 transition-all border-neutral-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-600" name="current" checked={isCurrentChecked} onChange={() => setIsCurrentChecked(!isCurrentChecked)} />
                        <Label htmlFor="current" className="hover:text-neutral-600 transition-all cursor-pointer">I am currently studying here</Label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Start Date *</Label>
                        <Input type="date" name="startDate" variant="form" required />
                    </div>
                    <div className="flex flex-col gap-2 pb-5">
                        <Label>End Date</Label>
                        <Input type="date" name="endDate" variant="form" disabled={isCurrentChecked} />
                    </div>
                    <Button type="submit" className="w-fit bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isCreatePending}>{isCreatePending ? "Adding education..." : "Add education"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}