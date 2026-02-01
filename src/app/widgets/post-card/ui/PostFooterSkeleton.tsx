import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";

interface PostFooterSkeletonProps {
  likes: number;
  comments: number;
}

export function PostFooterSkeleton({ likes, comments }: PostFooterSkeletonProps) {
  return (
    <div className="flex flex-col gap-2 border-t border-neutral-200 pt-2">
      <div className="flex items-center justify-between text-sm text-neutral-600">
        <span>{likes.toLocaleString()} likes</span>
        <span>{comments.toLocaleString()} comments</span>
      </div>
      <div className="flex items-center justify-between pt-1 text-sm text-neutral-600">
        <ActionButton icon={<ThumbsUp className="h-4 w-4" />} label="Like" />
        <ActionButton icon={<MessageCircle className="h-4 w-4" />} label="Comment" />
        <ActionButton icon={<Repeat2 className="h-4 w-4" />} label="Repost" />
        <ActionButton icon={<Send className="h-4 w-4" />} label="Send" />
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

