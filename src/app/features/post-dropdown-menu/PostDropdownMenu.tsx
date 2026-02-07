import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/app/shared/ui";
import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";

interface PostDropdownMenuProps {
    editMenuItem?: React.ReactNode;
}

export default function PostDropdownMenu({ editMenuItem }: PostDropdownMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-primary-500">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {editMenuItem}
                <DropdownMenuItem>
                    <Button variant="ghost" size="sm" className="gap-2 justify-start text-neutral-500 hover:text-primary-500">
                        <TrashIcon className="w-4 h-4" />
                        <p className="text-base font-medium">Delete post</p>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}