import styles from "./CorporatePickup.module.css";
import articleStyles from "../app/news/article.module.css";
import * as news from "../app/news/listing";
import { zh } from "@/lib/i18n/zh";

const { listing } = news;

/**
 * zh: news articles exist only in Japanese. Each card keeps its Japanese title, is marked lang="ja",
 * and carries a "日文" tag. When listing.ts gains a `listingZh` export, it is shown as-is instead.
 */
function zhListing() {
  // Looked up by name so the build does not require the export to exist yet.
  const translated: unknown = Reflect.get(news, ["listing", "Zh"].join(""));
  if (typeof translated === "string" && translated) return translated;
  return listing.replace(/<a class="article-card" href="([^"]+)">/g, (_m, href: string) =>
    `<a class="article-card" href="${href}" lang="ja" hreflang="ja">` +
    `<span class="${styles.langTag}" lang="zh-Hans">${zh.pickup.langTag}</span>`,
  );
}

export default function CorporatePickup({ locale = "ja" }: { locale?: "ja" | "zh" }){
 if (locale === "zh") return <section id="news" className={`om-wrap ${styles.pickup}`} aria-labelledby="pickup-heading">
  <h2 id="pickup-heading" className={styles.heading}>{zh.pickup.heading}</h2>
  <div className={`${articleStyles.article} ${styles.cards} ${styles.zhCards}`} dangerouslySetInnerHTML={{__html:zhListing()}} />
 </section>;
 return <section id="news" className={`om-wrap ${styles.pickup}`} aria-labelledby="pickup-heading">
  <h2 id="pickup-heading" className={styles.heading}>PICK UP NEWS</h2>
  <div className={`${articleStyles.article} ${styles.cards}`} dangerouslySetInnerHTML={{__html:listing}} />
 </section>;
}
