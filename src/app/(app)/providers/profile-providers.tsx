import { CurrentUserProfileContext } from "@/app/widgets/profile-card/model/profile-context";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";

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