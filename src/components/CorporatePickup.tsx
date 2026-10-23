import styles from "./CorporatePickup.module.css";
import articleStyles from "../app/news/article.module.css";
import { listing } from "../app/news/listing";
export default function CorporatePickup(){
 return <section id="news" className={`om-wrap ${styles.pickup}`} aria-labelledby="pickup-heading">
  <h2 id="pickup-heading" className={styles.heading}>ピックアップニュース</h2>
  <div className={`${articleStyles.article} ${styles.cards}`} dangerouslySetInnerHTML={{__html:listing}} />
 </section>;
}
