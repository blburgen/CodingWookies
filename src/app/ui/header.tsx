"use client";

import { ChangeEvent, useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const items = [
        { href: "/", label: "Home" },
        { href: "/login", label: "Login" },
        { href: "/listings", label: "Listings"}
    ];

    const changeSubmitSearch = (e: ChangeEvent) => {
        e.preventDefault();
        console.warn("Search not implemented yet. Tried to search:", searchValue);
        setSearchValue("");
    }

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
                    <li className="search">
                        <form onSubmit={changeSubmitSearch}>
                            <input 
                                type="text" 
                                name="search" 
                                value={searchValue} 
                                onChange={(e) => setSearchValue(e.target.value)} 
                                placeholder="Search..."
                            />
                        </form>
                    </li>
                    {items.map(item => (
                        <li className="navigation-item" key={item.href}>
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
