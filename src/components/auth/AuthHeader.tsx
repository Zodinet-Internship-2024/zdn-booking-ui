'use client';

import { usePathname } from 'next/navigation';

type AuthHeaderProps = {
    heading: string;
    subheading: string;
};

const routes: { [key: string]: { heading: string; subheading: string } } = {
    '/login': {
        heading: 'Đăng nhập',
        subheading: 'Nhập thông tin đăng nhập ngay bên dưới',
    },
    '/sign-up': {
        heading: 'Đăng ký',
        subheading: 'Nhập thông tin đăng ký ngay bên dưới',
    },
};

const AuthHeader = () => {
    const pathname = usePathname();
    const { heading = 'Opps', subheading = 'Có lẽ bạn đã vào nhầm page' } = routes[pathname];
    return (
        <header className="h-56 w-full bg-primary-100 flex flex-col justify-center items-center rounded-b-[80px]">
            <div className="text-center space-y-3">
                <h1 className="text-primary-600 font-bold">{heading}</h1>
                <p className="body-1 font-medium">{subheading}</p>
            </div>
        </header>
    );
};
export default AuthHeader;
