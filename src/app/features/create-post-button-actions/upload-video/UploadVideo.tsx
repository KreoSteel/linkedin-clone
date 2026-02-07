import { Video } from "lucide-react";
import CreatePostModal from "../../post-modals/ui/PostModal";

export default function UploadVideo() {
    return (
       <CreatePostModal triggerButton={
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-neutral-100 rounded-md p-2 w-fit">
          <Video className="w-6 h-6 text-green-600 " />
          <h3 className="text-sm text-neutral-700">Video</h3>
       </div>
       } openFilePickerType="video" />
    );
 }