"use client";
import { Briefcase } from "lucide-react";
import ExperienceEditModal from "../../../features/experience-create-modal/ui/CreateExperienceModal";
import { TExperience } from "@/app/entities/experience";
import { format } from "date-fns"

export default function ExperienceSection({ experiences }: { experiences: TExperience[] }) {
   return (
      <div className="bg-white py-4 px-6 gap-4 flex flex-col shadow-sm rounded-md overflow-hidden border border-neutral-200">
         <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Experience</h2>
            <ExperienceEditModal />
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
                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                              <div className="flex-1 min-w-0">
                                 <h3 className="font-semibold text-neutral-900 truncate">
                                    {experience.position}
                                 </h3>
                                 <p className="text-neutral-600 text-sm">
                                    {experience.company}
                                 </p>
                                 <p className="text-neutral-500 text-xs">
                                    {format(experience.startDate, "MMM yyyy")} - {experience.current ? "Present" : format(experience.endDate as Date, "MMM yyyy")}
                                    {experience.location && (
                                       <>
                                          {" · "}
                                          <span>{experience.location}</span>
                                       </>
                                    )}
                                 </p>
                              </div>
                           </div>

                           {experience.description && (
                              <div className="mt-3">
                                 <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
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
               <p className="text-sm text-neutral-700">
                  No experience added yet. Add your work experience to showcase your professional journey.
               </p>
            </div>
         )}
      </div>
   );
}