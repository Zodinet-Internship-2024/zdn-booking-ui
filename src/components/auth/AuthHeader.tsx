'use client';

import { usePathname } from 'next/navigation';

type RouteConfig = {
    heading: string;
    subheading: string;
};

const routes: Record<string, RouteConfig> = {
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

    const route = routes[pathname];

    if (!route) {
      return null;
    }

    return (
        <header className="h-56 w-full bg-primary-100 flex flex-col justify-center items-center rounded-b-[80px]">
            <div className="text-center space-y-3">
                <h1 className="text-primary-600 font-bold">{route.heading}</h1>
                <p className="body-1 font-medium">{route.subheading}</p>
            </div>
        </header>
    );
};
export default AuthHeader;
