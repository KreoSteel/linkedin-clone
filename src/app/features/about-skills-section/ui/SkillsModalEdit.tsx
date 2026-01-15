"use client";
import {
   SkillType,
   UserSkillType,
} from "@/app/entities/skill/model/skill-schema";
import { Button } from "@/app/shared/ui";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogTrigger,
   DialogDescription,
} from "@/app/shared/ui/dialog";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/app/shared/ui/command";
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from "@/app/shared/ui/popover";
import { useSkillsModal } from "../model/use-skills-modal";

interface SkillsModalEditProps {
   userSkills: UserSkillType[];
   allSkills: SkillType[];
}

export default function SkillsModalEdit({
   userSkills,
   allSkills,
}: SkillsModalEditProps) {
   const [open, setOpen] = useState(false);
   const {
      selectedSkills,
      popoverIsOpen,
      setPopoverIsOpen,
      handleAddSkill,
      handleRemoveSkill,
   } = useSkillsModal();

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger className="flex items-center gap-2 text-sm border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-all rounded-full cursor-pointer px-3 py-1.5 w-fit">
            {userSkills.length > 0 ? "Edit" : "Add skills"}
         </DialogTrigger>

         <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogTitle>Skills</DialogTitle>
            <DialogDescription className="text-sm text-neutral-700">
               Show your top skills — add up to 5 skills you want to be known
               for.
            </DialogDescription>

            <div className="space-y-3 mt-4">
               {selectedSkills.map((skill) => (
                  <div
                     key={skill.id}
                     className="flex items-center justify-between gap-2">
                     <span className="px-3 py-1.5 bg-neutral-100 text-neutral-900 rounded-full text-sm font-medium">
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
               ))}
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
                              {allSkills.map((skill) => (
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
                  onClick={() => setOpen(false)}>
                  Cancel
               </Button>
               <Button
                  type="button"
                  className="bg-primary-500 hover:bg-primary-600">
                  Save
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}
