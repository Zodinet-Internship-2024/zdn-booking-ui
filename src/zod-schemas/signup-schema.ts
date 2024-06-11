import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1).max(52),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    confirmPassword: z.string(),
    password: z.string().min(3).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
