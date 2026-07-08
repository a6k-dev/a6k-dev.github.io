// 사이트 전역 설정. 이 값들을 수정해 블로그를 커스터마이즈하세요.

export const SITE_TITLE = "A6K Dev | 데이터 엔지니어링 · AI 블로그";
export const SITE_DESCRIPTION =
  "데이터 엔지니어링과 AI를 공부하고 기록하는 블로그입니다. Airflow, dbt, Spark, BigQuery, LLM, MLOps 등을 다룹니다.";

// 사이드바 프로필 정보 (직접 수정하세요)
export const PROFILE = {
  name: "A6K",
  // 한 줄 소개
  bio: "배우고 기록하는 데이터쟁이입니다",
  // 직무/역할
  role: "Data Engineer",
  avatar: "/profile.webp",
};

// 소셜 링크 (사용하지 않는 항목은 빈 문자열 "" 로 두면 숨겨집니다)
export const SOCIALS = {
  github: "https://github.com/a6k-dev",
  linkedin: "",
  youtube: "",
  twitter: "",
  email: "aninseok@gmail.com",
  rss: "/rss.xml",
};

// 블로그 카테고리 정의.
// slug 는 URL(/blog/category/<slug>)과 글 frontmatter 의 category 값으로 사용됩니다.
export const CATEGORIES = [
  {
    slug: "ai-ml",
    label: "AI",
    icon: "🤖",
    description: "LLM, 딥러닝, 추천/검색, 논문 리뷰 등 AI 전반",
  },
  {
    slug: "data-engineering",
    label: "데이터 엔지니어링",
    icon: "🛠️",
    description: "Airflow, dbt, Spark, Kafka, BigQuery, Snowflake 등 데이터 파이프라인 이야기",
  },
  {
    slug: "development",
    label: "개발",
    icon: "💻",
    description: "Python, SQL, Kubernetes, 클라우드, 개발 도구",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function getCategory(slug?: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

// 한글 제목은 슬러그로 변환 시 깨지므로 파일명 기반 슬러그를 사용합니다.
export const GENERATE_SLUG_FROM_TITLE = false;
export const TRANSITION_API = true;
