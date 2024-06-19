import { Navigation } from "./Navigation";

const navItems = [
    {label: "Главная", href: "/"},
];

const TheHeader = () => {
    return (
        <header>
            <Navigation navLinks={navItems}/>
        </header>
    );
};

export { TheHeader };