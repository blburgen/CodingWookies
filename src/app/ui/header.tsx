"use client";

import { ChangeEvent, useState, useEffect } from "react";
import Link from "next/link";
import { getSession } from "@/app/lib/session";
import { logout } from "@/app/actions/auth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getSession().then((s) => setLoggedIn(s !== null));
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const items = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Listings" },
    { href: "/about", label: "About Us" },
  ];

  const changeSubmitSearch = (e: ChangeEvent) => {
    e.preventDefault();
    console.warn("Search not implemented yet. Tried to search:", searchValue);
    setSearchValue("");
  };

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
          {items.map((item) => (
            <li className="navigation-item" key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li className="navigation-item">
            {loggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
