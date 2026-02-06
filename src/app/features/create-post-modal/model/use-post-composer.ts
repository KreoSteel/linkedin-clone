import { useState, useRef, useEffect } from "react";
import { PostVisibility } from "@/generated/prisma/enums";

export const usePostComposer = () => {
    const [content, setContent] = useState("");
    const [visibility, setVisibility] = useState<PostVisibility>(PostVisibility.PUBLIC);
    const [mediaPreview, setMediaPreview] = useState<{ type: "image" | "video"; url: string; file: File } | null>(null);
    const mediaInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        return () => {
            if (mediaPreview) {
                URL.revokeObjectURL(mediaPreview.url);
            }
        };
    }, [mediaPreview]);

    const handleFileSelect = (type: "image" | "video") => {
        if (mediaInputRef.current) {
            mediaInputRef.current.accept = type === "image" ? "image/*" : "video/*";
            mediaInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        
        if (file) {
            if (mediaPreview) URL.revokeObjectURL(mediaPreview.url);
            
            const type = file.type.startsWith("image/") ? "image" as const : "video" as const;
            const previewUrl = URL.createObjectURL(file);
            setMediaPreview({ type, url: previewUrl, file });
        }
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
        mediaInputRef,
        handleFileSelect,
        handleFileChange,
        handleRemovePreview,
    };
};