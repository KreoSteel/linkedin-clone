import z from "zod";

export function dateValidations<T extends z.ZodTypeAny>(schema: T, message: string): T {
    return schema.refine((data: any) => !data.endDate || !data.startDate || data.endDate >= data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    }).refine((data: any) => data.current !== true || data.endDate === null, {
        message: `End date must be empty if ${message}`,
        path: ["endDate"],
    }).refine((data: any) => data.current !== false || data.endDate !== null, {
        message: `End date is required if not currently ${message}`,
        path: ["endDate"],
    }) as T;
}
