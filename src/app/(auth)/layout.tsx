import AuthHeader from '@/components/auth/AuthHeader';

type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main>
            <AuthHeader />
            {children}
        </main>
    );
}
