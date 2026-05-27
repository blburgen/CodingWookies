import styles from "./page.module.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Card from "@/app/ui/card";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>

        <div className={styles.cards}>
          <Card title="Card 1" description="Card 1." />
          <Card title="Card 2" description="Card 2." />
          <Card title="Card 3" description="Card 3." />
        </div>
      </main>
      <Footer />
    </div>
  );
}
