"use client";
import { GraduationCap } from "lucide-react";
import { format } from "date-fns";
import { TEducation } from "@/app/entities/education";
import EducationModals from "@/app/features/education-modals/ui/EducationModals";

export default function EducationSection({ educations }: { educations: TEducation[] }) {
    return (
        <div className="bg-white py-4 px-6 gap-4 flex flex-col shadow-sm rounded-md overflow-hidden border border-neutral-200">
            <div className="flex items-center justify-between">
                <h2>Education</h2>
                <EducationModals />
            </div>

            {educations.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {educations.map((education, index) => (
                        <div key={education.id} className="flex flex-col gap-2">
                            <div className="flex gap-3">
                                <div className="shrink-0 w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-neutral-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                        <div className="flex-1 min-w-0">
                                            <h3>
                                                {education.school}
                                            </h3>
                                            <p className="text-neutral-700 text-sm">
                                                {education.degree} - {education.field}
                                            </p>
                                            <p className="text-neutral-700 text-xs">
                                                {format(education.startDate, "MMM yyyy")} - {education.current ? "Present" : format(education.endDate as Date, "MMM yyyy")}
                                            </p>
                                        </div>
                                        <EducationModals isEditMode={true} education={education} />
                                    </div>

                                    {education.description && (
                                        <div className="mt-3">
                                            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                                                {education.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {index < educations.length - 1 && (
                                <div className="border-b border-neutral-200 my-2" />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-between py-6">
                    <p className="text-sm text-neutral-700 text-center max-w-lg mx-auto">
                        No education added yet. Add your educational background to showcase your academic achievements.
                    </p>
                </div>
            )}
        </div>
    );
}