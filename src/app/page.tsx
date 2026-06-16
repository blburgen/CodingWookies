import styles from "./page.module.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Card from "@/app/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main
        className={styles.main}
        aria-label="Handcrafted Haven Marketplace Homepage"
      >
        <section className={styles.heroSection} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.heroTitle}>
            Handcrafted Haven
          </h1>
          <p className={styles.heroSubtitle}>
            Connecting passionate local artisans with conscious consumers.
            Discover unique, high-quality handmade treasures or set up your
            virtual shop today.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/listings">
              <button
                className={styles.ctaButton}
                aria-label="Explore the artisan marketplace"
              >
                Explore Marketplace
              </button>
            </Link>
          </div>
        </section>
        <h2 className={styles.sectionTitle} id="features-title">
          Our Platform Features
        </h2>

        <div
          className={styles.cards}
          role="region"
          aria-labelledby="features-title"
        >
          <Card 
            title="Artisan Profiles"
            description="Dedicated spaces for authenticated sellers to share their background stories, showcase craftsmanship, and manage custom inventory."
          />
          <Card
            title="Product Listings"
            description="A clean, searchable catalog allowing buyers to explore handcrafted items, complete with detailed descriptions and pricing filters."
          />
          <Card
            title="Reviews & Ratings"
            description="An interactive, trusted evaluation system where users can leave verified text reviews and submit structured product scores."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
