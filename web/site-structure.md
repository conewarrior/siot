# 사이트 구조

## 페이지 구조

```
📁 pages
├── / (홈)
├── /blog (블로그 목록)
├── /blog/[slug] (블로그 글 상세)
├── /projects (프로젝트 목록)
└── /about (소개)
```

---

## 1. 홈 페이지 (`/`)

**파일:** `src/app/page.tsx`

| 섹션명 | 설명 | 컴포넌트/효과 |
|--------|------|---------------|
| 히어로 섹션 | "make it [pop/snappy/...]" 타이틀 + 소개 문구 | `TextRotate` |
| 최근 글 섹션 | 블로그 글 3개 미리보기 목록 | 언더라인 호버 |
| 주요 작업 섹션 | 프로젝트 4개 목록 | `ProjectShowcase` |
| 푸터 | 저작권 + 소셜 링크 | - |

---

## 2. 블로그 목록 페이지 (`/blog`)

**파일:** `src/app/blog/page.tsx`

| 섹션명 | 설명 | 컴포넌트/효과 |
|--------|------|---------------|
| 페이지 타이틀 | "블로그" (h1) | `AnimatedText` |
| 글 목록 | 블로그 글 전체 목록 | 언더라인 호버 |

---

## 3. 블로그 글 상세 페이지 (`/blog/[slug]`)

**파일:** `src/app/blog/[slug]/page.tsx`

| 섹션명 | 설명 | 컴포넌트/효과 |
|--------|------|---------------|
| 글 헤더 | 제목, 날짜, 카테고리 | - |
| 본문 | 마크다운 스타일 콘텐츠 | - |

---

## 4. 프로젝트 목록 페이지 (`/projects`)

**파일:** `src/app/projects/page.tsx`

| 섹션명 | 설명 | 컴포넌트/효과 |
|--------|------|---------------|
| 페이지 타이틀 | "프로젝트" (h1) | `AnimatedText` |
| 주요 작업 | 프로젝트 4개 목록 | `ProjectShowcase` |
| 실험 & 사이드 프로젝트 | 4개 카드 그리드 | 언더라인 호버 |

---

## 5. 소개 페이지 (`/about`)

**파일:** `src/app/about/page.tsx`

| 섹션명 | 설명 | 컴포넌트/효과 |
|--------|------|---------------|
| 페이지 타이틀 | "소개" (h1) | `AnimatedText` |
| 자기소개 | 3개 문단 | - |
| 경력 | 경력 목록 | - |
| 기술 스택 | 태그 목록 | - |
| 연락처 | 링크 목록 | 언더라인 호버 |

---

## 공통 컴포넌트

| 컴포넌트 | 파일 | 설명 |
|----------|------|------|
| `Header` | `src/components/header.tsx` | 네비게이션 (NavLink 사용) |
| `NavLink` | `src/components/nav-link.tsx` | 메뉴 링크 (스케일 호버 효과) |
| `TextRotate` | `src/components/text-rotate.tsx` | 텍스트 회전 애니메이션 |
| `AnimatedText` | `src/components/animated-text.tsx` | 글자별 등장 + 언더라인 애니메이션 |
| `Highlight` | `src/components/hero-highlight.tsx` | 배경 하이라이트 (로드 시 애니메이션) |
| `HoverHighlight` | `src/components/hero-highlight.tsx` | 호버 시 배경 하이라이트 |
| `ProjectShowcase` | `src/components/project-showcase.tsx` | 프로젝트 목록 + 마우스 따라다니는 이미지 |
| `BackgroundBeamsWithCollision` | `src/components/background-beams.tsx` | 배경 빔 애니메이션 (레이아웃) |

---

## 레이아웃

**파일:** `src/app/layout.tsx`

- `BackgroundBeamsWithCollision`으로 전체 페이지 감싸기
- Pretendard 폰트 적용
