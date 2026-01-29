# Development Guide

## 개요

UX 디자이너 포트폴리오 페이지의 디자인 완성도를 높이기 위한 전면 리뉴얼 프로젝트.
중앙정렬 남용, 카드 컴포넌트 과다 사용, 불명확한 타이포그래피 계층 문제를 해결하고,
12컬럼 그리드 기반의 좌측 정렬 레이아웃과 5단계 타이포그래피 시스템을 도입한다.

## 기술 스택

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- 기존 기술 스택 유지

## 핵심 변경 사항

### 타이포그래피 시스템 (5단계)

| 계층 | 용도 | 크기 | 두께 | 색상 |
|-----|------|------|------|------|
| Hero | 포트폴리오 커버 메인 타이틀 | `text-6xl` | `font-bold` | `text-foreground` |
| H1 | 프로젝트 제목, 섹션 대제목 | `text-4xl` | `font-bold` | `text-foreground` |
| H2 | 슬라이드 제목, 소제목 | `text-2xl` | `font-semibold` | `text-foreground` |
| Body | 본문, 설명 텍스트 | `text-base` | `font-normal` | `text-foreground/80` |
| Caption | 메타 정보, 부가 설명, 라벨 | `text-sm` | `font-medium` | `text-muted` |

### 그리드 시스템

- 12컬럼 그리드 기반
- 주요 레이아웃 조합: 4-8, 5-7, 6-6, 8-4, 3-9
- 좌측 정렬 기본, 필요시에만 중앙 정렬

### 카드 사용 원칙

- **사용 O**: 3개 이상의 정보 묶음, 클릭 가능한 요소
- **사용 X**: 단일 정보, 텍스트만 있는 경우

---

## Phase 1: 기반 시스템 (병렬 작업)

<!-- PARALLEL_START -->

### Task 1: 타이포그래피 시스템 컴포넌트

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/typography.tsx` (신규)

**구현:**
1. `TypoVariant` 타입 정의: `'hero' | 'h1' | 'h2' | 'body' | 'caption'`
2. `variantStyles` 상수 정의 (크기, 두께, 행간, 색상)
3. `Text` 컴포넌트 구현:
   - props: `variant`, `children`, `className`, `as` (HTML 태그 지정)
   - `cn()` 유틸리티로 클래스 병합
4. 각 variant별 시맨틱 래퍼 export: `Hero`, `H1`, `H2`, `Body`, `Caption`

**완료 기준:**
- [ ] 5개 variant 모두 정의됨
- [ ] 모든 variant에 색상, 크기, 두께, 행간 적용됨
- [ ] `as` prop으로 HTML 태그 변경 가능
- [ ] TypeScript 타입 완전히 정의됨

**복잡도:** S

---

### Task 2: 12컬럼 그리드 컴포넌트

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/grid.tsx` (신규)

**구현:**
1. `GridProps` 인터페이스 정의:
   - `cols`: `'4-8' | '6-6' | '5-7' | '8-4' | '3-9'`
   - `gap`: `'sm' | 'md' | 'lg'`
   - `align`: `'start' | 'center' | 'end'`
2. `colsClass` 매핑 객체 생성 (grid-cols-12 기반)
3. `gapClass` 매핑: sm=4, md=6, lg=8
4. `Grid` 컴포넌트 구현
5. `GridItem` 컴포넌트 구현 (커스텀 span용)

**완료 기준:**
- [ ] 5개 cols 조합 모두 지원
- [ ] gap 3단계 지원
- [ ] align props 지원
- [ ] children이 자동으로 컬럼에 배치됨

**복잡도:** S

<!-- PARALLEL_END -->

---

## Phase 2: 슬라이드 리디자인 (병렬 작업)

> Phase 1 완료 후 시작. typography.tsx와 grid.tsx를 import하여 사용.

<!-- PARALLEL_START -->

### Task 3: 포트폴리오 커버 리디자인 (IntroSlide)

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/slides/intro-slide.tsx` (신규)
- `/Users/hskim/dev/siot/portfolio/src/app/portfolio/page.tsx` (import 추가만)

**구현:**
1. 4-8 그리드 레이아웃 적용
2. 좌측 영역 (4컬럼):
   - 이름 (Hero 타이포)
   - 직함 (H2 타이포)
   - 구분선
   - 연락처/링크 (Caption + 아이콘)
3. 우측 영역 (8컬럼):
   - 한 줄 소개문 (Body)
   - 핵심 역량/키워드 (Caption)
   - 프로젝트 목록 (텍스트 리스트, 카드 X)
4. portfolio/page.tsx에서 IntroSlide import 및 사용

**완료 기준:**
- [ ] 좌측 정렬 레이아웃 적용됨
- [ ] 프로젝트 미리보기가 카드가 아닌 텍스트 리스트
- [ ] 이름, 직함, 소개, 연락처 모두 표시됨
- [ ] Grid 컴포넌트 사용

**복잡도:** M

---

### Task 4: 프로젝트 커버 리디자인 (CoverSlide)

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/slides/cover-slide.tsx`

**구현:**
1. 기존 중앙정렬 제거, 좌측 정렬로 변경
2. 상단 영역: 프로젝트 번호 · 회사명 · 기간 (Caption, 구분자로 연결)
3. 메인 영역:
   - 프로젝트 제목 (H1)
   - 역할 태그 (Caption)
   - 한 줄 개요 (Body)
4. 하단 영역: 핵심 성과 수치 3개 (큰 숫자 + 설명)
5. 기존 pill 형태 메타 정보 카드 제거

**완료 기준:**
- [ ] 중앙정렬 제거됨
- [ ] 메타 정보가 플랫 텍스트 + 구분자
- [ ] 핵심 성과 수치가 하단에 강조 표시
- [ ] 타이포그래피 시스템 적용됨

**복잡도:** M

---

### Task 5: Problem 슬라이드 리디자인

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/slides/problem-slide.tsx`

**구현:**
1. 6-6 그리드 레이아웃 적용
2. 좌측 영역 (6컬럼):
   - "PROBLEM" 라벨 (Caption, accent 색상)
   - 배경 컨텍스트 (Body 불릿 리스트)
   - 숫자 강조 (예: "주당 8시간")
3. 우측 영역 (6컬럼):
   - 다이어그램 또는 비즈니스 임팩트 시각화
   - object-contain으로 이미지 잘림 방지
4. 불필요한 카드 래퍼 제거

**완료 기준:**
- [ ] 6-6 그리드 적용됨
- [ ] 텍스트와 다이어그램 영역 분리됨
- [ ] 숫자/핵심 지표가 강조됨
- [ ] 이미지가 잘리지 않음

**복잡도:** M

---

### Task 6: Process 슬라이드 리디자인

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/slides/process-slide.tsx`

**구현:**
1. 상단 영역:
   - "PROCESS: {단계명}" 라벨 (Caption, accent)
   - 접근 방식 요약 (Body 불릿 3개)
2. 하단 영역:
   - 풀 너비 다이어그램/스크린샷
   - object-contain 적용
   - max-h 설정으로 과도한 크기 방지
3. 이미지 잘림 문제 해결

**완료 기준:**
- [ ] 상하 분리 레이아웃 적용됨
- [ ] 이미지가 object-contain으로 전체 표시됨
- [ ] 접근 방식이 간결하게 요약됨
- [ ] 스크린샷이 잘리지 않음

**복잡도:** M

---

### Task 7: Outcome 슬라이드 리디자인

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/slides/outcome-slide.tsx`

**구현:**
1. 상단 영역:
   - "OUTCOME" 라벨 (Caption, accent)
   - 핵심 성과 수치 3개 (큰 숫자 + 설명, 가로 배치)
2. 중단 영역:
   - 차트/다이어그램 (object-contain)
3. 하단 영역:
   - 회고 섹션 (2컬럼 텍스트, 카드 X)
   - 좌: 잘한 점, 우: 개선할 점
4. 기존 카드 래퍼 제거

**완료 기준:**
- [ ] 성과 수치가 상단에 강조됨
- [ ] 회고가 카드 없이 2컬럼 텍스트로 표시
- [ ] 타이포그래피 시스템 적용됨
- [ ] 불필요한 카드 제거됨

**복잡도:** M

---

### Task 8: Epilogue 슬라이드 리디자인

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/slides/epilogue-slide.tsx`

**구현:**
1. 5-7 그리드 레이아웃 적용
2. 좌측 영역 (5컬럼):
   - "ABOUT" 라벨
   - 이름 + 직함 (H2)
   - 철학/소개문 (Body)
   - 구분선
   - 연락처 (인라인 링크, 카드 X)
3. 우측 영역 (7컬럼):
   - 스킬 (2컬럼 텍스트 리스트, 카드 X)
   - 구분선
   - Thank You 메시지
4. 스킬 아이콘 카드 4개 제거

**완료 기준:**
- [ ] 5-7 그리드 적용됨
- [ ] 스킬이 텍스트 리스트로 표시 (카드 X)
- [ ] 연락처가 인라인 링크로 표시 (카드 X)
- [ ] About과 Contact 정보 통합됨

**복잡도:** M

---

### Task 9: 스크린샷 갤러리 수정

**파일:**
- `/Users/hskim/dev/siot/portfolio/src/components/portfolio/slides/screenshot-gallery.tsx`

**구현:**
1. 이미지 스타일 변경:
   - `object-cover` → `object-contain`
   - `w-full h-full` → `w-full h-auto`
   - `max-h-[400px]` 추가로 과도한 크기 방지
2. 캡션 스타일:
   - Caption 타이포그래피 적용
   - `text-muted` 색상
3. 컨테이너 스타일 정리

**완료 기준:**
- [ ] 모든 스크린샷이 잘리지 않고 전체 표시됨
- [ ] max-h로 과도한 크기 방지됨
- [ ] 캡션이 Caption 타이포 스타일 적용됨
- [ ] object-contain 적용됨

**복잡도:** S

<!-- PARALLEL_END -->

---

## 완료 기준 (전체)

1. [ ] 모든 슬라이드가 좌측 정렬 또는 그리드 기반 레이아웃 사용
2. [ ] 타이포그래피 5단계 외 다른 크기 사용 없음
3. [ ] 정보량 1-2개인 곳에 카드 컴포넌트 없음
4. [ ] 모든 스크린샷 이미지가 잘리지 않고 전체 표시
5. [ ] 포인트 컬러가 기존보다 눈에 띄게 강조

## 참고 사항

- 모바일 반응형은 스코프 외 (현재 안내 모달 유지)
- 애니메이션 변경 없음 (현재 유지)
- MDX 콘텐츠 구조 변경 없음
- API 변경 없음

## 레퍼런스

- [AI 시대 UX/UI 디자이너 포트폴리오](https://yozm.wishket.com/magazine/detail/3132/)
