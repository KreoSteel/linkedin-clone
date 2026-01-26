"use client";
import ExperienceModals from "@/app/features/experience-modals/ui/ExperienceModals";
import { Briefcase } from "lucide-react";
import { format } from "date-fns";
import { ExperienceSectionProps } from "./model/types";

export default function ExperienceSection({ experiences, isCurrentUser }: ExperienceSectionProps) {
   return (
      <div className="bg-white py-4 px-6 gap-4 flex flex-col shadow-sm rounded-md overflow-hidden border border-neutral-200">
         <div className="flex items-center justify-between">
            <h2 className="font-semibold">Experience</h2>
            {isCurrentUser && (
               <ExperienceModals />
            )}
         </div>

         {experiences.length > 0 ? (
            <div className="flex flex-col gap-6">
               {experiences.map((experience, index) => (
                  <div key={experience.id} className="flex flex-col gap-2">
                     <div className="flex gap-3">
                        <div className="shrink-0 w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center">
                           <Briefcase className="w-6 h-6 text-neutral-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between  gap-1">
                              <div className="flex-1 min-w-0">
                                 <h3 className="text-lg font-semibold text-neutral-900 truncate">
                                    {experience.position}
                                 </h3>
                                 <p className="text-neutral-600 text-base">
                                    {experience.company}
                                 </p>
                                 <p className="text-neutral-500 text-sm">
                                    {format(experience.startDate, "MMM yyyy")} - {experience.current ? "Present" : format(experience.endDate as Date, "MMM yyyy")}
                                    {experience.location && (
                                       <>
                                          {" · "}
                                          <span>{experience.location}</span>
                                       </>
                                    )}
                                 </p>
                              </div>
                              {isCurrentUser && (
                                 <ExperienceModals isEditMode={true} experience={experience} />
                              )}
                           </div>

                           {experience.description && (
                              <div className="mt-3">
                                 <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                                    {experience.description}
                                 </p>
                              </div>
                           )}
                        </div>
                     </div>

                     {index < experiences.length - 1 && (
                        <div className="border-b border-neutral-200 my-2" />
                     )}
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex items-center justify-between py-8">
               <p className="text-base text-neutral-700 text-center max-w-lg mx-auto">
                  {isCurrentUser ? 
                  "No experience added yet. Add your work experience to showcase your professional journey." :
                  "No experience added by this user."}
               </p>
            </div>
         )}
      </div>
   );
}

