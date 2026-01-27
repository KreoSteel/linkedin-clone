import { useState, useRef, useEffect } from "react";
import { PostVisibility } from "@/generated/prisma/enums";

export const useCreatePost = () => {
    const [content, setContent] = useState("");
    const [visibility, setVisibility] = useState<PostVisibility>(PostVisibility.PUBLIC);
    const [mediaPreview, setMediaPreview] = useState<{ type: "image" | "video"; url: string; file: File } | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        return () => {
            if (mediaPreview) {
                URL.revokeObjectURL(mediaPreview.url);
            }
        };
    }, [mediaPreview]);

    const handleFileSelect = (type: "image" | "video") => {
        const input = type === "image" ? imageInputRef.current : videoInputRef.current;
        input?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
        const file = e.target.files?.[0];
        if (file) {
            if (mediaPreview) {
                URL.revokeObjectURL(mediaPreview.url);
            }

            const previewUrl = URL.createObjectURL(file);
            setMediaPreview({ type, url: previewUrl, file });
        }

        e.target.value = "";
    };

    const handleRemovePreview = () => {
        if (mediaPreview) {
            URL.revokeObjectURL(mediaPreview.url);
            setMediaPreview(null);
        }
    };

    return {
        content,
        setContent,
        visibility,
        setVisibility,
        mediaPreview,
        setMediaPreview,
        imageInputRef,
        videoInputRef,
        handleFileSelect,
        handleFileChange,
        handleRemovePreview,
    };
};