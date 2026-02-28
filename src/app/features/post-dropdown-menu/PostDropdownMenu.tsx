import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/app/shared/ui";
import { EllipsisVerticalIcon } from "lucide-react";

interface PostDropdownMenuProps {
    editcreateMenuItem: React.ReactNode;
    deleteMenuItem: React.ReactNode;
}

export default function PostDropdownMenu({ editcreateMenuItem, deleteMenuItem }: PostDropdownMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-primary-500">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {editcreateMenuItem}
                {deleteMenuItem}
            </DropdownMenuContent>
        </DropdownMenu>

    );
}