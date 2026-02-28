import Image from "next/image";
import { PencilIcon, TrashIcon } from "lucide-react";
import { visibilityOptions } from "@/app/entities/post";
import { PostVisibility } from "@/generated/prisma/enums";
import { DropdownMenuItem } from "@/app/shared/ui";
import CreatePostModal from "@/app/features/post-modals/ui/PostModals";
import PostDropdownMenu from "@/app/features/post-dropdown-menu/PostDropdownMenu";
import type { PostCardPost } from "../model/types";
import PostDeleteModal from "@/app/features/post-modals/ui/PostDeleteModal";
import PostModals from "@/app/features/post-modals/ui/PostModals";

interface PostAuthorRowProps {
  name: string;
  title?: string;
  avatarUrl?: string | null;
  createdAt: Date;
  visibility: PostVisibility;
  post: PostCardPost;
}

export function PostAuthorRow({
  name,
  title,
  avatarUrl,
  createdAt,
  visibility,
  post,
}: PostAuthorRowProps) {
  const visibilityOption = visibilityOptions.find((option) => option.value === visibility);

  const VisibilityIcon = visibilityOption?.icon;

  return (
    <div className="flex items-start gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
        <Image
          src={avatarUrl || "/default-avatar.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-base text-neutral-900">{name}</span>
        </div>
        {title && (
          <span className="text-sm text-neutral-600">
            {title}
          </span>
        )}
        <div className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500">
          <span>{createdAt.toLocaleDateString()}</span>
          {visibilityOption && VisibilityIcon && (
            <>
              <span>·</span>
              <VisibilityIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          )}
        </div>
      </div>
      <div className="ml-auto">
        <PostDropdownMenu
          editcreateMenuItem={
            post ? (
              <PostModals
                post={post}
                triggerButton={
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="cursor-pointer flex items-center  h-12 gap-2 text-neutral-500 hover:text-primary-500"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <p className="text-base font-medium">Edit post</p>
                  </DropdownMenuItem>
                }
              />
            ) : undefined
          }
          deleteMenuItem={
            <PostDeleteModal
            post={post}
            triggerBtn={
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="cursor-pointer flex items-center h-12 gap-2 text-neutral-500 hover:text-primary-500"
                >
                    <TrashIcon className="w-4 h-4" />
                    <p className="text-base font-medium">Delete post</p>
                </DropdownMenuItem>
            }
        />
          }
        />
      </div>
    </div>
  );
}

