import styles from "./CorporatePickup.module.css";
import articleStyles from "../app/news/article.module.css";
import { listing } from "../app/news/listing";
export default function CorporatePickup(){
 return <section id="news" className={`om-wrap ${styles.pickup}`} aria-label="ピックアップニュース">
  <div className={`${articleStyles.article} ${styles.cards}`} dangerouslySetInnerHTML={{__html:listing}} />
 </section>;
}
