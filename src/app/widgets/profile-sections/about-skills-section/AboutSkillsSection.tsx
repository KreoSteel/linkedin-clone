"use client";
import { SkillType, UserSkillType } from "@/app/entities/skill/model/skill-schema";
import { Gem } from "lucide-react";
import { Fragment } from "react";
import SkillsModalEdit from "../../../features/skills-edit-modal/ui/SkillsModalEdit";

interface AboutSkillsSectionProps {
   biography: string;
   userSkills: UserSkillType[];
   allSkills: SkillType[];
}

export default function AboutSkillsSection({
   biography,
   userSkills,
   allSkills,
}: AboutSkillsSectionProps) {
   return (
      <div className="bg-white py-4 px-6 gap-4 flex flex-col shadow-sm rounded-md overflow-hidden border border-neutral-200">
         <h2>About</h2>
         <p className="text-sm text-neutral-700">
            {" "}
            {biography?.split("\n").map((line, index) => (
               <Fragment key={index}>
                  {line}
                  {index < (biography?.split("\n").length || 0) - 1 && <br />}
               </Fragment>
            )) ||
               "No biography set, add a biography to your profile by clicking the edit button above."}
         </p>
         <div className="flex flex-col gap-3 border py-4 px-6 rounded-md">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Gem className="w-5 h-5" strokeWidth={1.5} />
                  <h3 className="font-semibold">Top skills</h3>
               </div>
               <SkillsModalEdit userSkills={userSkills} allSkills={allSkills} />
            </div>
            {userSkills.length > 0 ? (
               <div className="flex flex-wrap gap-2">
                  {userSkills.slice(0, 5).map((userSkill: UserSkillType) => (
                     <span
                        key={userSkill.id}
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                        {userSkill.name}
                     </span>
                  ))}
                  {userSkills.length > 5 && (
                     <span className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                        +{userSkills.length - 5} more
                     </span>
                  )}
               </div>
            ) : (
               <p className="text-sm text-neutral-500">
                  Showcase your expertise by adding skills to your profile.
               </p>
            )}
         </div>
      </div>
   );
}
