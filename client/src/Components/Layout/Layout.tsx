import React from "react";

interface layoutProps {
    children?: React.ReactNode;
}

export function Layout({children}: layoutProps) {
    
    return <main>
            {children}
           </main> // Второй тэг main

}
