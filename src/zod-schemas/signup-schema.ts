import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Định dạng email không hợp lệ" }),
    name: z
      .string()
      .min(1, { message: "Tên phải chứa ít nhất 1 ký tự" })
      .max(52, { message: "Tên không được vượt quá 52 ký tự" }),
    phone: z.string().regex(/^\d{10}$/, "Số điện thoại không hợp lệ"),
    confirmPassword: z.string(),
    password: z
      .string()
      .min(5, { message: "Tên phải chứa ít nhất 5 ký tự" })
      .max(20, { message: "Tên không được vượt quá 20 ký tự" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu phải trùng khớp",
    path: ["confirmPassword"],
  });
