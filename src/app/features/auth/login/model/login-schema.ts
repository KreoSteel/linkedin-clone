import { z } from "zod";

export const loginSchema = z.object({
   email: z.email({ error: "Invalid email address" }).min(1, { error: "Email is required" }).max(255, { error: "Email must be less than 255 characters" }),
   password: z.string().min(8, { error: "Password must be at least 8 characters long" }).max(100, { error: "Password must be less than 100 characters" }),
});

export type TLogin = z.infer<typeof loginSchema>;