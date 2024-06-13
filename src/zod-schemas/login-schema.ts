import { z } from 'zod';

const phoneRegex = /^\d{10,11}$/;

export const loginSchema = z.object({
    username: z.union([
        z.string().email(),
        z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ'),
    ]),
    password: z.string().min(8),
});

export type User = z.infer<typeof loginSchema>;
