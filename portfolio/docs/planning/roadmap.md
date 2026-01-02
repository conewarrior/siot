# 개발 로드맵

## Phase 1: 콘텐츠 구조 설정 ✅

- [x] 사이트 기본 구조 완성 (홈, 블로그, 프로젝트, 소개)
- [x] 애니메이션 컴포넌트 구현
- [x] 마크다운 기반 콘텐츠 관리 시스템 구축
- [x] MDX 파싱 설정 (next-mdx-remote)

## Phase 2: 콘텐츠 작성

- [ ] 소개 페이지 내용 업데이트 (실제 정보로)
- [ ] 프로젝트 상세 내용 작성 (최소 4개)
- [ ] 블로그 글 작성 (최소 3개)
- [ ] 이미지 에셋 정리 (프로젝트 이미지를 실제 스크린샷으로)

## Phase 3: 디테일 & 최적화 ✅

- [x] SEO 메타데이터 설정 (generateMetadata)
- [x] OG 이미지 생성
- [x] 404 페이지
- [x] 로딩 상태 처리 (Suspense)
- [x] 성능 최적화 (이미지 next/image, 폰트 최적화)

## Phase 4: 배포

- [ ] 도메인 설정
- [ ] Vercel 배포 설정
- [ ] Analytics 연동 (선택)
- [ ] 최종 테스트

---

## 콘텐츠 관리 구조

```
docs/
├── content/
│   ├── blog/
│   │   ├── building-design-system.mdx
│   │   ├── minimal-interfaces.mdx
│   │   ├── react-server-components.mdx
│   │   ├── digital-typography.mdx
│   │   └── ai-apis.mdx
│   ├── projects/
│   │   ├── lumina.mdx
│   │   ├── flux.mdx
│   │   ├── prism.mdx
│   │   └── vertex.mdx
│   └── about.mdx
└── planning/
    └── roadmap.md
```

## 콘텐츠 파일 형식

### 블로그 글 (blog/*.mdx)

```mdx
---
title: "글 제목"
description: "글 설명"
date: "2025-12-28"
category: "디자인" | "개발"
published: true
---

본문 내용 (마크다운)...
```

### 프로젝트 (projects/*.mdx)

```mdx
---
title: "프로젝트명"
description: "한 줄 설명"
year: "2025"
link: "https://..."
image: "/images/projects/..."
tech: ["React", "TypeScript"]
featured: true
---

프로젝트 상세 설명...
```

### 소개 (about.mdx)

```mdx
---
title: "소개"
---

자기소개, 경력, 기술 스택 등...
```

---

## 개발 명령어

```bash
npm run dev      # 개발 서버 시작 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

## 콘텐츠 편집 방법

1. `docs/content/` 폴더에서 해당 MDX 파일 수정
2. 개발 서버가 자동으로 변경 감지
3. 브라우저에서 즉시 확인
