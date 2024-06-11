import AuthHeader from '@/components/auth/AuthHeader';

export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
    }) {
    
    return (
        <main>
            <AuthHeader />
            {children}
        </main>
    );
}
