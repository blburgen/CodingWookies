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
        <p key={i} className={styles.item}>
          <strong>{msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}:</strong>{" "}
          {msg.text}
        </p>
      ))}
    </div>
  );
}
