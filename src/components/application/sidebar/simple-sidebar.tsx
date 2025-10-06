import { FC, useState } from "react";
import {
    Home01,
    Users01,
    Calendar,
    BarChart01,
    Settings01
} from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface SidebarItem {
    id: string;
    label: string;
    icon: FC<{ className?: string }>;
    href?: string;
}

interface SimpleSidebarProps {
    activeItem?: string;
    onItemClick?: (itemId: string) => void;
    className?: string;
}

const sidebarItems: SidebarItem[] = [
    {
        id: "painel",
        label: "Painel",
        icon: Home01,
        href: "/painel"
    },
    {
        id: "pacientes",
        label: "Pacientes",
        icon: Users01,
        href: "/pacientes"
    },
    {
        id: "calendario",
        label: "Calendário",
        icon: Calendar,
        href: "/calendario"
    },
    {
        id: "relatorios",
        label: "Relatórios",
        icon: BarChart01,
        href: "/relatorios"
    },
    {
        id: "configuracoes",
        label: "Configurações",
        icon: Settings01,
        href: "/configuracoes"
    }
];

export const SimpleSidebar: FC<SimpleSidebarProps> = ({
    activeItem = "painel",
    onItemClick,
    className
}) => {
    const [currentActive, setCurrentActive] = useState(activeItem);

    const handleItemClick = (item: SidebarItem) => {
        setCurrentActive(item.id);
        onItemClick?.(item.id);
    };

    return (
        <aside className={cx(
            "w-64 h-full bg-white flex flex-col",
            className
        )}>
            <nav className="flex-1 py-6">
                <ul className="space-y-1 px-4">
                    {sidebarItems.map((item) => {
                        const isActive = currentActive === item.id;
                        const Icon = item.icon;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleItemClick(item)}
                                    className={cx(
                                        "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 relative hover:cursor-pointer",
                                        isActive
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <Icon
                                        className={cx(
                                            "w-5 h-5 flex-shrink-0",
                                            isActive ? "text-gray-900" : "text-gray-500"
                                        )}
                                    />
                                    <span className={cx(
                                        "font-medium text-sm",
                                        isActive ? "text-gray-900" : "text-gray-600"
                                    )}>
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};
