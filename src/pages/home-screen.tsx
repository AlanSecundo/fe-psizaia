import { SimpleSidebar } from "@/components/application/sidebar/simple-sidebar";
import { SimpleHeader } from "@/components/application/header/simple-header";
import { WelcomeSection } from "@/components/application/dashboard/welcome-section";

export const HomeScreen = () => {
    return (
        <div className="flex h-dvh">
            <SimpleSidebar
                activeItem="painel"
                onItemClick={(itemId) => {
                    console.log("Item clicado:", itemId);
                }}
            />
            <div className="flex-1 flex flex-col">
                <SimpleHeader />
                <main className="flex-1 bg-gray-50">
                    <WelcomeSection />
                </main>
            </div>
        </div>
    );
};
