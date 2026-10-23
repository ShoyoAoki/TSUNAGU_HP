import styles from "./CorporatePickup.module.css";
export default function CorporatePickup(){
 return <section id="news" style={{scrollMarginTop:88}} className={`om-wrap ${styles.pickup}`} aria-labelledby="pickup-heading">
  <h2 id="pickup-heading">PICK UP</h2>
  <p className={styles.comingSoon}>Coming soon</p>
 </section>;
}
