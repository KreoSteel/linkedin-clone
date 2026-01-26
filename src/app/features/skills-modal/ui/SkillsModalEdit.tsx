"use client";
import { Button, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, Popover, PopoverTrigger, PopoverContent, Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/app/shared/ui";
import { useSkillsModal } from "../model/use-skills-modal";
import { Separator } from "@/app/shared/ui/separator";
import { useEffect, useMemo, useState } from "react";
import { PencilIcon, PlusIcon, XIcon } from "lucide-react";
import { SkillsModalProps } from "../model/types";
import { SkillType } from "@/app/entities/skill/model/skill-schema";

export default function SkillsModal({
   userSkills,
   allSkills,
}: SkillsModalProps) {
   const [open, setOpen] = useState(false);

   const initialSkills = useMemo(() => {
      return userSkills.map((userSkill) => ({
         id: userSkill.skillId,
         name: userSkill.name,
         createdAt: userSkill.createdAt,
      })) as SkillType[];
   }, [userSkills]);

   const {
      selectedSkills,
      popoverIsOpen,
      setPopoverIsOpen,
      handleAddSkill,
      handleRemoveSkill,
      handleSaveSkills,
      isPending,
      isSuccess,
   } = useSkillsModal({
      initialSkills,
   });

   useEffect(() => {
      if (isSuccess && !isPending && selectedSkills.length === 0 && open) {
         const timer = setTimeout(() => {
            setOpen(false);
         }, 300);
         return () => clearTimeout(timer);
      }
   }, [isSuccess, isPending, selectedSkills.length, open]);

   useEffect(() => {
      if (!open) {
         setPopoverIsOpen(false);
      }
   }, [open, setPopoverIsOpen]);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger className="flex items-center gap-2 text-sm border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-all rounded-full cursor-pointer px-3 py-1.5 w-fit">
            {userSkills.length > 0 ? <PencilIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
         </DialogTrigger>

         <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogTitle>Skills</DialogTitle>
            <Separator />
            <DialogDescription className="text-base text-neutral-700">
               Show your top skills — add up to 5 skills you want to be known
               for.
            </DialogDescription>

            <div className="space-y-3 mt-4">
               {selectedSkills.length > 0 ? (
                  selectedSkills.map((skill) => (
                     <div
                        key={skill.id}
                        className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1.5 bg-neutral-100 text-neutral-900 rounded-full text-base font-medium">
                           {skill.name}
                        </span>
                        <Button
                           type="button"
                           variant="none"
                           className="w-fit"
                           onClick={() => handleRemoveSkill(skill.id)}>
                           <XIcon className="w-5 h-5" strokeWidth={2.5} />
                        </Button>
                     </div>
                  ))
               ) : (
                  <p className="text-base text-neutral-500 text-center py-4">
                     No skills selected. Add skills to showcase your expertise.
                  </p>
               )}
            </div>

            <div className="mt-4">
               <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
                  <PopoverTrigger asChild>
                     <Button
                        type="button"
                        variant="outline"
                        className="w-fit"
                        disabled={selectedSkills.length >= 5}
                        onClick={() => setPopoverIsOpen(true)}>
                        <PlusIcon className="w-5 h-5 mr-2" strokeWidth={2.5} />
                        Add skill
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                     <Command>
                        <CommandInput placeholder="Search skills..." />
                        <CommandList>
                           <CommandEmpty>No skill found.</CommandEmpty>
                           <CommandGroup>
                              {allSkills
                                 .filter((skill) => !selectedSkills.some((s) => s.id === skill.id))
                                 .map((skill) => (
                                    <CommandItem
                                       key={skill.id}
                                       value={skill.name}
                                       onSelect={() => handleAddSkill(skill)}>
                                       {skill.name}
                                    </CommandItem>
                                 ))}
                           </CommandGroup>
                        </CommandList>
                     </Command>
                  </PopoverContent>
               </Popover>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
               <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isPending}>
                  Cancel
               </Button>
               <Button
                  type="button"
                  className="bg-primary-500 hover:bg-primary-600"
                  onClick={handleSaveSkills}
                  disabled={isPending || selectedSkills.length === 0}>
                  {isPending ? "Saving..." : "Save"}
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}
