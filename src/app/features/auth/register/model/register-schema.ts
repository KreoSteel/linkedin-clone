import { z } from "zod";

export const registerSchema = z.object({
   firstName: z
      .string()
      .min(1, { error: "First Name is required" })
      .max(100, { error: "Max of characters is 100" }),
   lastName: z
      .string()
      .min(1, { error: "Last Name is required" })
      .max(100, { error: "Max of characters is 100" }),
   email: z
      .email({ error: "Invalid email address" })
      .min(1, { error: "Email is required" }),
   password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" }),
});

export type TRegister = z.infer<typeof registerSchema>;
