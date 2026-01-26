import { Dialog, DialogContent, DialogTrigger } from "@/app/shared/ui/dialog";

export default function CreatePostModal() {
   return (
      <Dialog>
         <DialogTrigger className="w-full border border-neutral-400 rounded-full px-6 py-3 text-left">
            <span className="text-sm text-neutral-700">Start a post</span>
         </DialogTrigger>
         <DialogContent>
         </DialogContent>
      </Dialog>
   );
}