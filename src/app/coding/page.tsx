"use client";

import Header from "../ui/header";
import Footer from "../ui/footer";

export default function AboutUs() {
  return (
    <div>
      <Header />
      <main>
        <h2>Coding Wookies</h2>
        <img src="https://raw.githubusercontent.com/blburgen/CodingWookies/refs/heads/main/public/wooden_wookie_1.webp" alt="wooden wookie" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
        <p>
          Every handmade product has a story and a lot of dedication behind
          it. We created Handcrafted Haven because we wanted to give local
          artisans a reliable and easy-to-use platform to show and sell
          their unique creations.
        </p>
      </main>
      <Footer/>
    </div>
  );
}
