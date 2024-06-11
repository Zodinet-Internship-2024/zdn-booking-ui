'use client';
import { loginSchema } from '@/zod-schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import style from './login.module.scss';
import { cn } from '@/libs/utils';

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: FormData) {
        console.log(isSubmitting);
        console.log(data);
    }

    return <div className="selection:bg-rose-500 selection:text-white">cascsacsa</div>;
}
