import { SITE_URL } from "@/lib/site";
export default function ServiceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name, description, url: `${SITE_URL}${path}`, provider: { "@type": "Organization", name: "株式会社TSUNAGU", url: SITE_URL }, areaServed: "JP" }) }} />;
}
