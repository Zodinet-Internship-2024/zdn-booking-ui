import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

type HomeLayoutProps = {
    children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
}
