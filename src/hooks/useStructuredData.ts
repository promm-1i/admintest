import { useEffect } from "react";

const ORIGIN = "https://noveriq.co.kr";
const NODE_ID = "noveriq-structured-data";

/**
 * 검색 결과에 값·이미지·평가가 함께 뜨도록 JSON-LD 를 넣는다.
 * 라우트를 옮기면 지우고 다시 넣어 이전 페이지 내용이 남지 않게 한다.
 */
export function useStructuredData(data: object | null) {
  useEffect(() => {
    if (!data) return;
    const node = document.createElement("script");
    node.type = "application/ld+json";
    node.id = NODE_ID;
    node.textContent = JSON.stringify(data);
    document.head.appendChild(node);
    return () => { node.remove(); };
  }, [data]);
}

/** 제작 사례(프리미엄 디자인) 상세 — 값이 있는 상품으로 알린다 */
export function designProductSchema(input: {
  name: string;
  description: string;
  image?: string;
  path: string;
  designCode?: string;
  priceFrom: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    ...(input.image ? { image: input.image.startsWith("http") ? input.image : `${ORIGIN}${input.image}` } : {}),
    ...(input.designCode ? { sku: input.designCode } : {}),
    brand: { "@type": "Brand", name: "NOVERIQ" },
    category: "홈페이지 제작",
    offers: {
      "@type": "Offer",
      url: `${ORIGIN}${input.path}`,
      priceCurrency: "KRW",
      price: input.priceFrom,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      seller: { "@type": "Organization", name: "민트클", url: ORIGIN },
    },
  };
}

/** 자주 묻는 질문 — 검색 결과에 문답이 펼쳐진다 */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** 사업자 정보 — 검색 결과 지식 패널용 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NOVERIQ",
    legalName: "민트클",
    url: ORIGIN,
    image: `${ORIGIN}/og-image.jpg`,
    telephone: "+82-10-4894-4905",
    email: "6gsmake@gmail.com",
    description: "소상공인과 기업을 위한 맞춤형 홈페이지 제작 스튜디오입니다.",
    address: { "@type": "PostalAddress", addressCountry: "KR", addressRegion: "서울" },
    areaServed: "KR",
    priceRange: "₩₩",
  };
}

/** 이동 경로 — 검색 결과 제목 아래 경로가 뜬다 */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${ORIGIN}${step.path}`,
    })),
  };
}
