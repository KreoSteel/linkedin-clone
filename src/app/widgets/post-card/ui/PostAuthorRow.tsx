import Image from "next/image";
import { visibilityOptions } from "@/app/entities/post";
import { PostVisibility } from "@/generated/prisma/enums";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/app/shared/ui";

interface PostAuthorRowProps {
  name: string;
  title?: string;
  avatarUrl?: string | null;
  createdAt: Date;
  visibility: PostVisibility;
}

export function PostAuthorRow({
  name,
  title,
  avatarUrl,
  createdAt,
  visibility,
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
        <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-primary-500">
          <EllipsisVerticalIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

