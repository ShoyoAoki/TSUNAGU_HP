import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Service | TSUNAGU",
  description: "採用前にリモートで試せる。中国トップ大学のIT人材を3〜6ヶ月のリモートトライアル後に正社員採用。リスクゼロで始められるTrack Aモデル。",
};

export default function ServicePage() {
  return (
    <>
      <ServiceDetailClient />
    </>
  );
}
