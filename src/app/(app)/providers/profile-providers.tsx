import { ProfileContext } from "@/app/widgets/profile-card/model/profile-context";
import { ProfileType } from "@/app/entities/profile/model/schema";

interface ProfileProviderProps {
    children: React.ReactNode;
    profile: ProfileType | undefined;
}

export function ProfileProviders({ children, profile }: ProfileProviderProps) {
    return (
       <ProfileContext.Provider value={{ profile }}>
          {children}
       </ProfileContext.Provider>
    );
 }