import { addSkillToUser } from "@/app/entities/skill/api/skill-dal";
import { AddSkillToUserType } from "@/app/entities/skill/model/skill-schema";
import { Result } from "@/app/types";

// save from state to db and remove from db if not in state

// export const skillsSaveAction = async (userId: string, skillIds: string[]): Promise<Result<AddSkillToUserType[]>> => {
//     try {
//     }
// }