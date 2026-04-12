import styles from "./StickyCard.module.css";

export default function StickyCard({ notices }) {
  if (!notices || notices.length === 0) return null;
  const mainNotice = notices[0];

  return (
    <div className={styles.card}>
       <span className={styles.title}>Aviso em Destaque</span>
       <p className={styles.text}>{mainNotice}</p>
    </div>
  )
}
