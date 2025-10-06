import { FC } from "react";
import { cx } from "@/utils/cx";
import useUser from "@/store/useUser.store";

interface SimpleHeaderProps {
    className?: string;
}

export const SimpleHeader: FC<SimpleHeaderProps> = ({ className }) => {
    const { user } = useUser();

    return (
        <header className={cx(
            "w-full bg-white border-b border-gray-200",
            className
        )}>
            {/* Borda roxa no topo */}
            <div className="h-1 bg-purple-300"></div>

            {/* Conteúdo do header */}
            <div className="flex items-center justify-end px-6 py-4 h-16">
                <div className="flex items-center space-x-6">
                    {/* Notificações */}
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="text-sm font-medium">Notificações</span>
                    </button>

                    {/* Ajuda */}
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-sm font-medium">Ajuda</span>
                    </button>

                    {/* Avatar do usuário */}
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img
                                src={user.image}
                                alt="Foto do usuário"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
