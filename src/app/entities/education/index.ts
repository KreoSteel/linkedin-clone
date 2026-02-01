export {
    baseEducationSchema,
    educationSchema,
    createEducationSchema,
    baseCreateEducationSchema,
    updateEducationSchema,
} from "./model/education-schema";

export { getUserEducations, getEducationById, createEducation, updateEducation, deleteEducation } from "./api/education-dal";
export { getUserEducationsOptions } from "./api/education-query-options";

export type {
    TEducation,
    TCreateEducation,
    TUpdateEducation,
} from "./model/education-schema";