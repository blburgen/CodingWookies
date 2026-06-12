import { getFlatFlash } from "@/app/lib/flash";
import FlashCleaner from "./flash-cleaner";
import styles from "./flash-messages.module.css";

export default async function FlashMessages() {
  const flat = await getFlatFlash();

  if (!flat.length) return null;

  return (
    <div className={styles.root} role="alert">
      <FlashCleaner />
      {flat.map((msg, i) => (
        <p key={i} className={`${styles.item} ${styles[msg.type]}`}>
          {msg.text}
        </p>
      ))}
    </div>
  );
}
