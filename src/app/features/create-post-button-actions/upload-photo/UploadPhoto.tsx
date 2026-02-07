import { Image as ImageIcon } from "lucide-react";
import CreatePostModal from "../../post-modals/ui/PostModal";

export default function UploadPhoto() {
   return (
      <CreatePostModal triggerButton={
         <div className="flex items-center gap-1.5 cursor-pointer hover:bg-neutral-100 rounded-md p-2 w-fit">
            <ImageIcon className="w-6 h-6 text-primary-400" aria-label="Upload photo" />
            <h3 className="text-sm text-neutral-700">Photo</h3>
         </div>
      } openFilePickerType="image" />
   );
}