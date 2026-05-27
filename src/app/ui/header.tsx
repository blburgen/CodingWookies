"use client";

import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/h", label: "Home 2" },
        { href: "/h3", label: "Home 3" },
        { href: "/h4", label: "Home 4" },
    ];

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <span className="site-logo">Handcrafted Haven</span>
                <button
                    id="ham-btn"
                    className={`hamburger${menuOpen ? " show" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                />
            </div>
            <nav id="nav-bar" className={`navigation${menuOpen ? " show" : ""}`}>
                <ul>
                    {links.map(link => (
                        <li key={link.href}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
