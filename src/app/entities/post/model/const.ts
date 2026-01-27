import { PostVisibility } from "@/generated/prisma/enums";
import { Globe, Lock, Users } from "lucide-react";

export const characterCount = (content: string) => content.length;
export const maxCharacters = 2600;
export const remainingCharacters = (content: string) => maxCharacters - characterCount(content);

export const visibilityOptions = [
    {
        value: PostVisibility.PUBLIC,
        label: "Anyone",
        icon: Globe,
        description: "Anyone on LinkedIn",
    },
    {
        value: PostVisibility.CONNECTIONS,
        label: "Connections",
        icon: Users,
        description: "Your connections only",
    },
    {
        value: PostVisibility.PRIVATE,
        label: "Only you",
        icon: Lock,
        description: "Only visible to you",
    },
];