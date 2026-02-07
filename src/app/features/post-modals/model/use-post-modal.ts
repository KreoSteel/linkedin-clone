"use client";

import { useEffect, useActionState, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { TPost } from "@/app/entities/post";
import { PostVisibility } from "@/generated/prisma/enums";
import { createPostAction } from "../api/create-post-action";
import { editPostAction } from "../api/edit-post-action";
import { useStateToast } from "@/app/shared/utils/use-state-toast";

export type OpenFilePickerType = "image" | "video";

export function usePostModal(post?: TPost | null, openFilePickerType?: OpenFilePickerType) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(post?.content ?? "");
    const [visibility, setVisibility] = useState<PostVisibility>(
        post?.visibility ?? PostVisibility.PUBLIC
    );
    const [mediaPreview, setMediaPreview] = useState<{
        type: "image" | "video";
        url: string;
        file: File;
    } | null>(null);
    const [removeExistingMedia, setRemoveExistingMedia] = useState(false);
    const mediaInputRef = useRef<HTMLInputElement>(null);

    const isEditMode = !!post;
    const [state, formAction, isPending] = useActionState(
        isEditMode ? editPostAction : createPostAction,
        undefined
    );
    useStateToast(state);

    useEffect(() => {
        return () => {
            if (mediaPreview) URL.revokeObjectURL(mediaPreview.url);
        };
    }, [mediaPreview]);

    const handleFileSelect = (type: OpenFilePickerType) => {
        if (mediaInputRef.current) {
            mediaInputRef.current.accept = type === "image" ? "image/*" : "video/*";
            mediaInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (mediaPreview) URL.revokeObjectURL(mediaPreview.url);
            const type = file.type.startsWith("image/") ? ("image" as const) : ("video" as const);
            const previewUrl = URL.createObjectURL(file);
            setMediaPreview({ type, url: previewUrl, file });
        }
    };

    const handleRemovePreview = () => {
        if (mediaPreview) {
            URL.revokeObjectURL(mediaPreview.url);
            setMediaPreview(null);
            if (mediaInputRef.current) mediaInputRef.current.value = "";
        }
    };

    const handleRemoveExistingMedia = () => setRemoveExistingMedia(true);

    useEffect(() => {
        if (!open) setRemoveExistingMedia(false);
    }, [open]);

    useEffect(() => {
        if (open && openFilePickerType) {
            const t = setTimeout(() => handleFileSelect(openFilePickerType), 100);
            return () => clearTimeout(t);
        }
    }, [open, openFilePickerType]);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    }, [state, queryClient]);

    return {
        open,
        setOpen,
        content,
        setContent,
        visibility,
        setVisibility,
        mediaPreview,
        removeExistingMedia,
        mediaInputRef,
        handleFileSelect,
        handleFileChange,
        handleRemovePreview,
        handleRemoveExistingMedia,
        formAction,
        isPending,
        isEditMode,
    };
}
