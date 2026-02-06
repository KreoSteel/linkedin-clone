import { CurrentUserProfileContext } from "@/app/widgets/profile-card";
import { type ProfileType } from "@/app/entities/profile";

interface CurrentUserProfileProviderProps {
    children: React.ReactNode;
    profile: ProfileType;
}

export function ProfileProviders({ children, profile }: CurrentUserProfileProviderProps) {
    return (
       <CurrentUserProfileContext.Provider value={{ profile }}>
          {children}
       </CurrentUserProfileContext.Provider>
    );
 }