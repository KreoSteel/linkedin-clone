"use client";

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Label,
    Separator,
    Textarea,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/app/shared/ui";
import { Image as ImageIcon, Video, ChevronDown, X } from "lucide-react";
import type { TPost } from "@/app/entities/post";
import {
    visibilityOptions,
    characterCount,
    maxCharacters,
    remainingCharacters,
} from "@/app/entities/post";
import { PostVisibility } from "@/generated/prisma/enums";
import { PostMediaType } from "@/generated/prisma/enums";
import { usePostModal } from "../model/use-post-modal";

   interface PostModalsProps {
    post?: TPost | null;
    triggerButton?: React.ReactNode;
    openFilePickerType?: "image" | "video";
}

export default function PostModals({ post, triggerButton, openFilePickerType }: PostModalsProps) {
    const {
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
    } = usePostModal(post, openFilePickerType);

    const selectedVisibility = visibilityOptions.find((option) => option.value === visibility);
    const hasMediaPreview = mediaPreview ?? (isEditMode && post?.mediaUrl);

    const defaultTrigger = (
        <div className="w-full border border-neutral-400 rounded-full px-6 py-3 text-left hover:border-neutral-500 transition-colors">
            <span className="text-sm text-neutral-700 pointer-events-none">Start a post</span>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{triggerButton ?? defaultTrigger}</DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit post" : "Create a post"}</DialogTitle>
                    <DialogDescription className="text-base text-neutral-700">
                        {isEditMode
                            ? "Update your post content, media, or who can see it."
                            : "Share your thoughts, ideas, or updates with your network. You can add photos, videos, and control who can see your post."}
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <form action={formAction} className="flex flex-col gap-6">
                    {isEditMode && post && <input type="hidden" name="id" value={post.id} />}
                    <input type="hidden" name="visibility" value={visibility} />
                    {isEditMode && removeExistingMedia && (
                        <input type="hidden" name="removeMedia" value="true" />
                    )}
                    <div className="flex flex-col gap-2">
                        <Textarea
                            placeholder="What do you want to talk about?"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[200px] text-base resize-none border-neutral-400 focus:border-primary-500"
                            maxLength={maxCharacters}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <input
                                    ref={mediaInputRef}
                                    type="file"
                                    name="file"
                                    accept="image/*,video/*"
                                    className="hidden"
                                    disabled={isPending}
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors text-neutral-700"
                                    onClick={() => handleFileSelect("image")}
                                    disabled={isPending}
                                >
                                    <ImageIcon className="w-5 h-5 text-primary-500" />
                                    <span className="text-sm font-medium">Photo</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors text-neutral-700"
                                    onClick={() => handleFileSelect("video")}
                                    disabled={isPending}
                                >
                                    <Video className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-medium">Video</span>
                                </button>
                            </div>
                            <span
                                className={`text-sm ${remainingCharacters(content) < 100 ? "text-red-500" : "text-neutral-500"}`}
                            >
                                {characterCount(content)}/{maxCharacters}
                            </span>
                        </div>
                    </div>

                    {hasMediaPreview && (
                        <div className="relative rounded-lg overflow-hidden border border-neutral-300 bg-neutral-50">
                            {mediaPreview ? (
                                <>
                                    {mediaPreview.type === "image" ? (
                                        <img
                                            src={mediaPreview.url}
                                            alt="Preview"
                                            className="w-full h-auto max-h-[400px] object-contain"
                                        />
                                    ) : (
                                        <video
                                            src={mediaPreview.url}
                                            controls
                                            className="w-full h-auto max-h-[400px]"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleRemovePreview}
                                        className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 transition-colors"
                                        disabled={isPending}
                                        aria-label="Remove media"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </>
                            ) : isEditMode && post?.mediaUrl && !removeExistingMedia ? (
                                <>
                                    {post.mediaType === PostMediaType.IMAGE ? (
                                        <img
                                            src={post.mediaUrl}
                                            alt="Post"
                                            className="w-full h-auto max-h-[400px] object-contain"
                                        />
                                    ) : (
                                        <video
                                            src={post.mediaUrl}
                                            controls
                                            className="w-full h-auto max-h-[400px]"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleRemoveExistingMedia}
                                        className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 transition-colors"
                                        disabled={isPending}
                                        aria-label="Remove media"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </>
                            ) : null}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                        <div className="flex items-center gap-2">
                            <Label className="text-sm text-neutral-600">Visibility:</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        disabled={isPending}
                                    >
                                        {selectedVisibility ? (
                                            <>
                                                <selectedVisibility.icon className="w-4 h-4" />
                                                <span>{selectedVisibility.label}</span>
                                            </>
                                        ) : (
                                            <span>{visibilityOptions[0]?.label ?? "Anyone"}</span>
                                        )}
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56">
                                    <DropdownMenuRadioGroup
                                        value={visibility}
                                        onValueChange={(value) => setVisibility(value as PostVisibility)}
                                    >
                                        {visibilityOptions.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <DropdownMenuRadioItem
                                                    key={option.value}
                                                    value={option.value}
                                                    className="flex items-start gap-2 py-2"
                                                >
                                                    <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{option.label}</span>
                                                        <span className="text-xs text-neutral-500">
                                                            {option.description}
                                                        </span>
                                                    </div>
                                                </DropdownMenuRadioItem>
                                            );
                                        })}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Button
                            type="submit"
                            disabled={
                                !content.trim() ||
                                characterCount(content) > maxCharacters ||
                                isPending
                            }
                            className="px-6"
                        >
                            {isPending
                                ? isEditMode
                                    ? "Saving..."
                                    : "Posting..."
                                : isEditMode
                                  ? "Save"
                                  : "Post"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
