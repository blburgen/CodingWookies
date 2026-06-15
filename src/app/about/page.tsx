import Header from "../ui/header";
import Footer from "../ui/footer";
import Link from "next/link";
import styles from "./about.module.css";

export default function AboutUs() {
  return (
    <div>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.contentWrapper}>

          {/* Hero Section */}
          <section className={styles.heroSection}>
            <h1 className={styles.title}>Our Story</h1>
            <p className={styles.subtitle}>
              Connecting passionate local creators with people who appreciate the
              value of handcrafted goods.
            </p>
            <div className={styles.divider}></div>
          </section>

          {/* Main Content Grid */}
          <div className={styles.gridTwoColumns}>
            <div className={styles.missionSection}>
              <h2 className={styles.sectionTitle}>
                The Handcrafted Haven Mission
              </h2>
              <p className={styles.text}>
                Every handmade product has a story and a lot of dedication behind
                it. We created Handcrafted Haven because we wanted to give local
                artisans a reliable and easy-to-use platform to show and sell
                their unique creations.
              </p>
              <p className={styles.text}>
                Our website helps makers list their inventory, share their
                personal stories, and connect directly with buyers using our
                review system.
              </p>
            </div>

            <div className={styles.aboutCard}>
              <h3 className={styles.cardTitle}>Who We Are</h3>
              <p className={styles.text}>
                We are the <strong>Coding Wookies Artisan Guild</strong>, a team
                of full-stack students and developers. We are working together to
                build clean and fast web applications that help real communities
                and small businesses.
              </p>
              <div className={styles.cardFooter}>
                <div>
                  <span className={styles.footerTitle}>Current Release</span>
                  <span>Version 1.2.0 (Build Phase)</span>
                </div>
                <div>
                  <span className={styles.footerTitle}>Tech Stack</span>
                  <span>Next.js, TypeScript, Tailwind</span>
                </div>
              </div>
            </div>
          </div>

          <section className={styles.gridThreeColumns}>
            <h3 className={styles.pillarsTitle}>Our Core Pillars</h3>
            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>🛠️</div>
                <h4 className={styles.pillarName}>Authentic Craft</h4>
                <p className={styles.pillarText}>
                  We support and celebrate local artisan talent and traditional
                  work.
                </p>
              </div>
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>🤝</div>
                <h4 className={styles.pillarName}>Community Driven</h4>
                <p className={styles.pillarText}>
                  We want to connect creative small businesses with conscious
                  consumers.
                </p>
              </div>
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>⚡</div>
                <h4 className={styles.pillarName}>Modern Standards</h4>
                <p className={styles.pillarText}>
                  We provide a fast, safe, and optimized marketplace interface for
                  everyone.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
