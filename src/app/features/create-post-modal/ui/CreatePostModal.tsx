"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/shared/ui/dialog";
import { Separator } from "@/app/shared/ui/separator";
import { Textarea } from "@/app/shared/ui/textarea";
import { Button } from "@/app/shared/ui/button";
import { Label } from "@/app/shared/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/app/shared/ui/dropdown-menu";
import { Image as ImageIcon, Video, ChevronDown, X } from "lucide-react";
import { PostVisibility } from "@/generated/prisma/enums";
import { visibilityOptions, characterCount, maxCharacters, remainingCharacters } from "@/app/entities/post/model/const";
import { useCreatePost } from "../model/use-create-post";
import { useEffect, useActionState, useState } from "react";
import { createPostAction } from "../api/create-post-action";
import { useStateToast } from "@/app/shared/utils/use-state-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePostModal() {
   const queryClient = useQueryClient();
   const [open, setOpen] = useState(false);
   const {
      content,
      setContent,
      visibility,
      setVisibility,
      mediaPreview,
      mediaInputRef,
      handleFileSelect,
      handleFileChange,
      handleRemovePreview,
   } = useCreatePost();
   const [state, formAction, isPending] = useActionState(createPostAction, undefined);
   useStateToast(state);

   useEffect(() => {
      if (state?.success) {
         setOpen(false);
         setContent("");
         queryClient.invalidateQueries({ queryKey: ["posts"] });
         handleRemovePreview();
      }
   }, [state, setContent, handleRemovePreview, queryClient]);


   const selectedVisibility = visibilityOptions.find((option) => option.value === visibility)!;

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger className="w-full border border-neutral-400 rounded-full px-6 py-3 text-left hover:border-neutral-500 transition-colors">
            <span className="text-sm text-neutral-700">Start a post</span>
         </DialogTrigger>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>Create a post</DialogTitle>
               <DialogDescription className="text-base text-neutral-700">
                  Share your thoughts, ideas, or updates with your network. You can add photos, videos, and control who can see your post.
               </DialogDescription>
            </DialogHeader>

            <Separator />

            <form action={formAction} className="flex flex-col gap-6">
               <input type="hidden" name="visibility" value={visibility} />
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
                           accept="image/*"
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
                     <span className={`text-sm ${remainingCharacters(content) < 100 ? "text-red-500" : "text-neutral-500"}`}>
                        {characterCount(content)}/{maxCharacters}
                     </span>
                  </div>
               </div>

               {mediaPreview && (
                  <div className="relative rounded-lg overflow-hidden border border-neutral-300 bg-neutral-50">
                     {mediaPreview.type === "image" ? (
                        <img src={mediaPreview.url} alt="Preview" className="w-full h-auto max-h-[400px] object-contain" />
                     ) : (
                        <video src={mediaPreview.url} controls className="w-full h-auto max-h-[400px]" />
                     )}
                     <button
                        type="button"
                        onClick={handleRemovePreview}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 transition-colors"
                        disabled={isPending}
                     >
                        <X className="w-4 h-4" />
                     </button>
                  </div>
               )}

               <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                     <Label className="text-sm text-neutral-600">Visibility:</Label>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="outline" size="sm" className="gap-2" disabled={isPending}>
                              <selectedVisibility.icon className="w-4 h-4" />
                              <span>{selectedVisibility.label}</span>
                              <ChevronDown className="w-4 h-4" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                           <DropdownMenuRadioGroup value={visibility} onValueChange={(value) => setVisibility(value as PostVisibility)}>
                              {visibilityOptions.map((option) => {
                                 const Icon = option.icon;
                                 return (
                                    <DropdownMenuRadioItem key={option.value} value={option.value} className="flex items-start gap-2 py-2">
                                       <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                                       <div className="flex flex-col">
                                          <span className="font-medium">{option.label}</span>
                                          <span className="text-xs text-neutral-500">{option.description}</span>
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
                     disabled={!content.trim() || characterCount(content) > maxCharacters || isPending}
                     className="px-6"
                  >
                     {isPending ? "Posting..." : "Post"}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}