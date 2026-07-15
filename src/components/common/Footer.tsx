import Link from "next/link";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-16 border-t bg-background">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground md:flex-row">
                <div>
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-foreground">
                        Ayush Prasad
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="https://github.com/P-ayush"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 transition-colors hover:text-foreground"
                    >
                        <FaGithub className="h-5 w-5" />
                        <span>GitHub</span>
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/ayush-prasad-51811222b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 transition-colors hover:text-foreground"
                    >
                        <FaLinkedin className="h-5 w-5" />
                        <span>LinkedIn</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}