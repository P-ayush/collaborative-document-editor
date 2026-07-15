import { ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "../common/Footer";

interface Props {
    children: ReactNode;
}

export default function AppLayout({
    children,
}: Props) {
    return (
        <>
            <Navbar />

            <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
                {children}
            </main>

            <Footer />
        </>
    );
}