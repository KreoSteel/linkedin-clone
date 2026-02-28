import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from "@/app/shared/ui";
import { useActionState, useEffect, useState } from "react";
import { deletePostAction } from "../api/delete-post-action";
import { Post } from "@/generated/prisma/browser";

interface PostDeleteModalProps {
    post: { id: string}
    triggerBtn: React.ReactNode;
}

export default function PostDeleteModal({ post, triggerBtn }: PostDeleteModalProps) {
    const [open, setOpen] = useState(false)
    const [state, formAction, isPending] = useActionState(deletePostAction, undefined);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{triggerBtn}</DialogTrigger>

            <DialogContent className="max-w-sm rounded-md shadow-lg">
                <form action={formAction}>
                    <input type="text" hidden name="id" defaultValue={post.id} />
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-red-600 text-lg font-semibold">
                            Delete Post
                        </DialogTitle>
                        <DialogDescription className="text-sm text-neutral-700 mt-1">
                            Are you sure you want to delete this post? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex justify-end gap-3 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="text-neutral-600 hover:bg-neutral-100">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                            {isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
