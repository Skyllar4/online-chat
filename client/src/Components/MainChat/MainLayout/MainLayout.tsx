import React from "react";
import '../../../Styles/main.scss';

interface MainLayoutProps {
    children?: React.ReactNode;
}

export function MainLayout({children}: MainLayoutProps) {
    return <main className="main-content">
            {children}
          </main>
}