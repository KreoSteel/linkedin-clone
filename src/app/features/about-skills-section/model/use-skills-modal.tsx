import { useState, useEffect, useCallback } from "react";
import { SkillType } from "@/app/entities/skill/model/skill-schema";
import { useSaveSkillsMutation } from "./use-save-skills-mutation";
import { useCurrentUserId } from "@/app/widgets/profile-card/model/profile-context";

interface UseSkillsModalOptions {
    initialSkills?: SkillType[];
}

export const useSkillsModal = ({ initialSkills = [] }: UseSkillsModalOptions = {}) => {
    const userId = useCurrentUserId();
    const [selectedSkills, setSelectedSkills] = useState<SkillType[]>(initialSkills);
    const [popoverIsOpen, setPopoverIsOpen] = useState(false);
    const { mutate: saveSkills, isPending, isSuccess } = useSaveSkillsMutation(userId);

    useEffect(() => {
        setSelectedSkills(initialSkills);
    }, [initialSkills]);
    useEffect(() => {
        if(selectedSkills.length >= 5) {
            setPopoverIsOpen(false);
        }
    }, [selectedSkills]);

    useEffect(() => {
        if (isSuccess) {
            setSelectedSkills([]);
            setPopoverIsOpen(false);
        }
    }, [isSuccess]);

    const handleAddSkill = useCallback((skill: SkillType) => {
        if(selectedSkills.length >= 5) return;
        if(selectedSkills.some((s) => s.id === skill.id)) return;
        setSelectedSkills((prev) => [...prev, skill]);
    }, [selectedSkills]);
    
    const handleRemoveSkill = useCallback((skillId: string) => {
        setSelectedSkills((prev) => prev.filter((skill) => skill.id !== skillId));
    }, []);
    
    const handleSaveSkills = useCallback(() => {
        saveSkills(selectedSkills.map((skill) => skill.id));
    }, [selectedSkills, saveSkills]);

    return { 
        selectedSkills, 
        popoverIsOpen, 
        setPopoverIsOpen, 
        handleAddSkill, 
        handleRemoveSkill, 
        handleSaveSkills, 
        isPending,
        isSuccess 
    };
}