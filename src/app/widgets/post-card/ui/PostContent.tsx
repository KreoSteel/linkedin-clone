import { PostMediaType } from "@/generated/prisma/enums";

interface PostContentProps {
  content: string;
  mediaType: PostMediaType | null;
  mediaUrl: string | null;
}

export function PostContent({ content, mediaType, mediaUrl }: PostContentProps) {
  const hasMedia = mediaType && mediaUrl;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base text-neutral-800 whitespace-pre-wrap wrap-break-word">
        {content}
      </p>
      {hasMedia && (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
          {mediaType === PostMediaType.IMAGE ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaUrl as string}
              alt="Post media"
              className="h-auto w-full max-h-[500px] object-cover"
            />
          ) : (
            <video
              src={mediaUrl as string}
              controls
              className="h-auto w-full max-h-[500px]"
            />
          )}
        </div>
      )}
    </div>
  );
}

