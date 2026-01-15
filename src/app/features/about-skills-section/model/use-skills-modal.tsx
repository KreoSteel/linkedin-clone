import { useState, useEffect } from "react";
import { SkillType } from "@/app/entities/skill/model/skill-schema";


export const useSkillsModal = () => {
    const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);
    const [popoverIsOpen, setPopoverIsOpen] = useState(false);

    useEffect(() => {
        if(selectedSkills.length >= 5) return setPopoverIsOpen(false);
    }, [selectedSkills]);

    const handleAddSkill = (skill: SkillType) => {
        if(selectedSkills.length >= 5) return;
        if(selectedSkills.some((s) => s.id === skill.id)) return;
        setSelectedSkills([...selectedSkills, skill]);
    };

    const handleRemoveSkill = (skillId: string) => {
        setSelectedSkills(selectedSkills.filter((skill) => skill.id !== skillId));
    };

    return { selectedSkills, popoverIsOpen, setPopoverIsOpen, handleAddSkill, handleRemoveSkill };
}