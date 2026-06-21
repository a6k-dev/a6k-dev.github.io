# A6K Dev Blog

데이터 엔지니어링과 AI를 주제로 한 기술 블로그입니다.
[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) + [daisyUI](https://daisyui.com) 로 제작했으며 GitHub Pages 로 배포됩니다.

## 로컬 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:4321)
npm run build    # 정적 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 글 작성하기

`src/content/blog/` 에 마크다운(`.md`) 또는 MDX(`.mdx`) 파일을 추가하면 됩니다.
**파일명이 URL slug** 가 됩니다 (예: `airflow-getting-started.md` → `/blog/airflow-getting-started`).

```markdown
---
title: "글 제목"
description: "목록과 메타 태그에 쓰이는 한 줄 요약"
pubDate: "2026-06-21"
category: "data-engineering"   # 아래 카테고리 slug 중 하나
tags: ["Airflow", "Python"]    # 선택
badge: "NEW"                   # 선택
heroImage: "/some-image.webp"  # 선택
---

본문은 마크다운으로 작성합니다.
```

## 카테고리

카테고리는 `src/config.ts` 의 `CATEGORIES` 에서 관리합니다.

| slug | 이름 |
| --- | --- |
| `data-engineering` | 데이터 엔지니어링 |
| `ai-ml` | AI · 머신러닝 |
| `mlops` | MLOps |
| `development` | 개발 |
| `diary` | 회고 · 일상 |

## 커스터마이즈

- **프로필 / 소셜 링크 / 사이트 제목**: `src/config.ts` (`PROFILE`, `SOCIALS`, `SITE_TITLE`)
- **프로필 이미지**: `public/profile.webp` 교체
- **테마 색상**: `src/layouts/BaseLayout.astro` 의 `data-theme` (daisyUI 테마)

## 프로젝트 구조

```
src/
├── config.ts              # 사이트/프로필/카테고리 설정
├── components/            # SideBar, PostListItem, Pagination 등
├── layouts/              # BaseLayout, PostLayout
├── content/blog/         # 블로그 글 (마크다운)
└── pages/                # 라우트 (home, blog, category, tag, tags, about)
```

## 배포

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 자동으로 빌드 후 GitHub Pages 에 배포합니다.
