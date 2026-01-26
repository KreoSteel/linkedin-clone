import z from "zod";

type DateValidationData = {
    startDate: Date;
    endDate: Date | null;
    current?: boolean;
};

export function dateValidations<T extends z.ZodTypeAny>(schema: T, message: string): T {
    return schema.refine((data) => {
        const typedData = data as DateValidationData;
        return !typedData.endDate || !typedData.startDate || typedData.endDate >= typedData.startDate;
    }, {
        message: "End date must be after start date",
        path: ["endDate"],
    }).refine((data) => {
        const typedData = data as DateValidationData;
        return typedData.current !== true || typedData.endDate === null;
    }, {
        message: `End date must be empty if ${message}`,
        path: ["endDate"],
    }).refine((data) => {
        const typedData = data as DateValidationData;
        return typedData.current !== false || typedData.endDate !== null;
    }, {
        message: `End date is required if not currently ${message}`,
        path: ["endDate"],
    }) as T;
}
