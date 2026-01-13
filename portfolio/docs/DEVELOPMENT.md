# Development Guide: 포트폴리오 콘텐츠 확장

## Overview

4개 PDF 포트폴리오 프로젝트를 웹 포트폴리오로 변환하는 작업.
- CRO 분석 자동화 (지피터스)
- 라벨링 툴 단축키 UX 개선 (셀렉트스타)
- 패스트캠퍼스 디자인 시스템 (데이원컴퍼니)
- 인트라넷 UI Flow 개선 (셀렉트스타)

**핵심 원칙:**
- 문장 최소화, 비주얼 + 수치 중심
- PDF의 모든 시각 자료를 웹용 SVG/React 컴포넌트로 변환
- 타겟: 스타트업 채용담당자 (빠른 실행력, 수치 결과 강조)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- MDX (next-mdx-remote)

---

## Phase 1: 콘텐츠 정리

기존 파일 정리 및 새 MDX 파일 구조 생성.

<!-- PARALLEL_START -->
### Task 1-A: 기존 MDX 파일 삭제
- **범위**: `docs/content/portfolio/project-2-design-system.mdx`, `docs/content/portfolio/project-3-portfolio-site.mdx`
- **설명**: 기존 더미 프로젝트 MDX 파일 삭제
- **완료 조건**:
  - [ ] project-2-design-system.mdx 삭제
  - [ ] project-3-portfolio-site.mdx 삭제
- **복잡도**: S

### Task 1-B: 다이어그램 디렉토리 구조 생성
- **범위**: `src/components/portfolio/diagrams/`
- **설명**: 프로젝트별 다이어그램 컴포넌트 디렉토리 생성
- **완료 조건**:
  - [ ] `diagrams/cro/` 디렉토리 생성
  - [ ] `diagrams/labeling-tool/` 디렉토리 생성
  - [ ] `diagrams/design-system/` 디렉토리 생성
  - [ ] `diagrams/ui-flow/` 디렉토리 생성
  - [ ] 각 디렉토리에 `index.ts` 배럴 파일 생성
- **복잡도**: S
<!-- PARALLEL_END -->

---

## Phase 2: MDX 콘텐츠 작성

4개 프로젝트 MDX 콘텐츠 작성. 각 파일은 독립적이므로 병렬 작업 가능.

<!-- PARALLEL_START -->
### Task 2-A: CRO 분석 자동화 MDX 확장
- **범위**: `docs/content/portfolio/project-1-cro-analysis.mdx`
- **설명**: 기존 CRO MDX 확장 (회사명: 지피터스 명시, 다이어그램 placeholder 추가)
- **완료 조건**:
  - [ ] 회사명 "지피터스" 명시
  - [ ] 역할: UX 리서치, 데이터 분석 (전체 과정)
  - [ ] 문제-해결-결과 구조 유지
  - [ ] 다이어그램 import 구문 추가 (placeholder)
  - [ ] 수치 강조: 분석 시간 70% 단축, 전환율 15% 향상
- **복잡도**: S

### Task 2-B: 라벨링 툴 단축키 UX 개선 MDX 생성
- **범위**: `docs/content/portfolio/project-2-labeling-tool.mdx`
- **설명**: 신규 MDX 파일 생성 (셀렉트스타, 2022.09-11)
- **완료 조건**:
  - [ ] Frontmatter: title, order: 2, color, slides 정의
  - [ ] 비즈니스 임팩트: 연 4.2억 작업비, 매출 20%
  - [ ] OKR: 프로젝트 원가 비용 절감
  - [ ] 리서치: Mission Study, User Feedback, Action Flow
  - [ ] 솔루션 AS-IS/TO-BE: 고정툴바→플로팅, 단축키 노출, 도움말
  - [ ] 결과 수치: 단축키 33% 증가, 작업속도 11.57% 향상, 클래스 선택 4.53초→3.12초
  - [ ] 다이어그램 import placeholder 추가
- **복잡도**: M

### Task 2-C: 패스트캠퍼스 디자인 시스템 MDX 생성
- **범위**: `docs/content/portfolio/project-3-design-system.mdx`
- **설명**: 신규 MDX 파일 생성 (데이원컴퍼니, 2023.12-2024.03)
- **완료 조건**:
  - [ ] Frontmatter: title, order: 3, color, slides 정의
  - [ ] 문제: 디자인 가이드 빈약, 재사용성 낮음, 규칙 부재
  - [ ] 해결: WCAG 컬러 스케일, Semantic 토큰, 어노테이션 킷
  - [ ] 결과: 컬러 스케일 10단계, Variables + Storybook, 작업속도 20% 단축
  - [ ] 브런치 글 6개 링크 포함
  - [ ] 다이어그램 import placeholder 추가
- **복잡도**: M

### Task 2-D: 인트라넷 UI Flow 개선 MDX 생성
- **범위**: `docs/content/portfolio/project-4-ui-flow.mdx`
- **설명**: 신규 MDX 파일 생성 (셀렉트스타, 2022.12-2023.06)
- **완료 조건**:
  - [ ] Frontmatter: title, order: 4, color, slides 정의
  - [ ] 문제: 기능 분산, 카테고리 복잡성, 데이터 현황 분리
  - [ ] 해결: 카테고리 최상단 위계, 기능 통폐합, Overview
  - [ ] 결과: User Flow 35단계로 축소
  - [ ] AS-IS 5가지 문제점 명시
  - [ ] 다이어그램 import placeholder 추가
- **복잡도**: M
<!-- PARALLEL_END -->

---

## Phase 3: CRO 다이어그램 제작

CRO 프로젝트의 시각 자료 React 컴포넌트화.
(PDF 확인 후 구체적 다이어그램 목록 확정 필요)

<!-- PARALLEL_START -->
### Task 3-A: CRO 데이터 파이프라인 다이어그램
- **범위**: `src/components/portfolio/diagrams/cro/data-pipeline.tsx`
- **설명**: Beusable + GA4 데이터 흐름 시각화
- **완료 조건**:
  - [ ] 데이터 소스 → 수집 → 통합 → 분석 흐름 표현
  - [ ] 애니메이션 적용 (데이터 흐름)
  - [ ] 반응형 대응
- **복잡도**: M

### Task 3-B: CRO 결과 지표 차트
- **범위**: `src/components/portfolio/diagrams/cro/metrics-chart.tsx`
- **설명**: Before/After 비교 차트 (분석시간 70% 단축, 전환율 15% 향상)
- **완료 조건**:
  - [ ] 막대 차트 또는 원형 지표
  - [ ] 수치 강조 애니메이션
  - [ ] 라이트 테마 대응
- **복잡도**: S
<!-- PARALLEL_END -->

---

## Phase 4: 라벨링 툴 다이어그램 제작

<!-- PARALLEL_START -->
### Task 4-A: 단축키 사용률 비교 차트
- **범위**: `src/components/portfolio/diagrams/labeling-tool/shortcut-usage-chart.tsx`
- **설명**: 1차 vs 2차 단축키 사용빈도 비교 (33% 증가)
- **완료 조건**:
  - [ ] Before/After 막대 차트
  - [ ] 퍼센트 변화 강조
  - [ ] 개별 단축키별 데이터 표시
- **복잡도**: M

### Task 4-B: AS-IS/TO-BE 툴바 비교
- **범위**: `src/components/portfolio/diagrams/labeling-tool/toolbar-comparison.tsx`
- **설명**: 좌측 고정 툴바 → 플로팅 툴바 비교 UI
- **완료 조건**:
  - [ ] 좌/우 분할 레이아웃
  - [ ] AS-IS: 좌측 고정, 단축키 숨김
  - [ ] TO-BE: 플로팅, 단축키 노출, 도움말 버튼
  - [ ] 시각적 개선점 하이라이트
- **복잡도**: M

### Task 4-C: Action Flow 다이어그램
- **범위**: `src/components/portfolio/diagrams/labeling-tool/action-flow.tsx`
- **설명**: 라벨링 작업 흐름 분석 다이어그램
- **완료 조건**:
  - [ ] 작업 단계별 흐름도
  - [ ] 병목 지점 표시
  - [ ] 개선 포인트 강조
- **복잡도**: M

### Task 4-D: 작업 속도 개선 지표
- **범위**: `src/components/portfolio/diagrams/labeling-tool/speed-metrics.tsx`
- **설명**: 작업속도 11.57% 향상, 클래스 선택 4.53초→3.12초 시각화
- **완료 조건**:
  - [ ] 시간 단축 비교 차트
  - [ ] 숫자 카운트업 애니메이션
  - [ ] 금액 환산 표시 (4,200만원 절감 가능)
- **복잡도**: S
<!-- PARALLEL_END -->

---

## Phase 5: 디자인 시스템 다이어그램 제작

<!-- PARALLEL_START -->
### Task 5-A: 컬러 스케일 시각화
- **범위**: `src/components/portfolio/diagrams/design-system/color-scale.tsx`
- **설명**: Gray, Blue, Green, Red, Yellow 10단계 스케일
- **완료 조건**:
  - [ ] 5개 컬러 팔레트 표시
  - [ ] 10단계 그라데이션
  - [ ] WCAG 명도대비율 정보 포함
  - [ ] 다크모드 대응 예시
- **복잡도**: M

### Task 5-B: 토큰 네이밍 구조도
- **범위**: `src/components/portfolio/diagrams/design-system/token-structure.tsx`
- **설명**: Group → Description → Item 네이밍 구조
- **완료 조건**:
  - [ ] 계층 구조 트리 다이어그램
  - [ ] AS-IS (위치 기반) vs TO-BE (Semantic) 비교
  - [ ] Structural, Interactive, Overlay, Indicator 분류 표시
- **복잡도**: M

### Task 5-C: 명세 템플릿 예시
- **범위**: `src/components/portfolio/diagrams/design-system/spec-template.tsx`
- **설명**: 어노테이션 킷 + 명세 템플릿 시각화
- **완료 조건**:
  - [ ] 컴포넌트 명세 예시
  - [ ] 히스토리 기록 형식
  - [ ] Auto Layout + Properties 활용 예시
- **복잡도**: M

### Task 5-D: 결과 지표 대시보드
- **범위**: `src/components/portfolio/diagrams/design-system/results-dashboard.tsx`
- **설명**: 작업속도 20% 단축, Variables + Storybook 도입 결과
- **완료 조건**:
  - [ ] Before/After 비교 지표
  - [ ] Storybook 연동 아이콘
  - [ ] 팀 효율성 개선 시각화
- **복잡도**: S
<!-- PARALLEL_END -->

---

## Phase 6: UI Flow 다이어그램 제작

<!-- PARALLEL_START -->
### Task 6-A: AS-IS User Flow 다이어그램
- **범위**: `src/components/portfolio/diagrams/ui-flow/as-is-flow.tsx`
- **설명**: 개선 전 User Flow (분산된 기능, 복잡한 카테고리)
- **완료 조건**:
  - [ ] 여러 페이지에 분산된 기능 표현
  - [ ] 5가지 문제점 표시
  - [ ] 복잡한 동선 시각화
- **복잡도**: L

### Task 6-B: TO-BE User Flow 다이어그램
- **범위**: `src/components/portfolio/diagrams/ui-flow/to-be-flow.tsx`
- **설명**: 개선 후 User Flow (35단계로 축소)
- **완료 조건**:
  - [ ] 간소화된 흐름 표현
  - [ ] 카테고리 최상단 위계 구조
  - [ ] Overview 통합 화면
- **복잡도**: L

### Task 6-C: 기능 통폐합 비교
- **범위**: `src/components/portfolio/diagrams/ui-flow/feature-consolidation.tsx`
- **설명**: 기능 분산 → 통합 비교 다이어그램
- **완료 조건**:
  - [ ] Before: 분산된 미션 설정, 대시보드
  - [ ] After: 통합된 구조
  - [ ] 단계 수 비교 (X단계 → 35단계)
- **복잡도**: M
<!-- PARALLEL_END -->

---

## Phase 7: 다이어그램 통합 (순차)

MDX 파일에 다이어그램 컴포넌트 연결.
Phase 2-6 완료 후 진행.

### Task 7-A: CRO MDX에 다이어그램 연결
- **의존성**: Task 2-A, Task 3-A, Task 3-B
- **범위**: `docs/content/portfolio/project-1-cro-analysis.mdx`
- **설명**: 다이어그램 import 구문 실제 컴포넌트로 교체
- **완료 조건**:
  - [ ] DataPipeline 컴포넌트 import 및 배치
  - [ ] MetricsChart 컴포넌트 import 및 배치
  - [ ] 슬라이드별 적절한 위치에 배치
- **복잡도**: S

### Task 7-B: 라벨링 툴 MDX에 다이어그램 연결
- **의존성**: Task 2-B, Task 4-A, Task 4-B, Task 4-C, Task 4-D
- **범위**: `docs/content/portfolio/project-2-labeling-tool.mdx`
- **설명**: 다이어그램 import 구문 실제 컴포넌트로 교체
- **완료 조건**:
  - [ ] ShortcutUsageChart 컴포넌트 import 및 배치
  - [ ] ToolbarComparison 컴포넌트 import 및 배치
  - [ ] ActionFlow 컴포넌트 import 및 배치
  - [ ] SpeedMetrics 컴포넌트 import 및 배치
- **복잡도**: S

### Task 7-C: 디자인 시스템 MDX에 다이어그램 연결
- **의존성**: Task 2-C, Task 5-A, Task 5-B, Task 5-C, Task 5-D
- **범위**: `docs/content/portfolio/project-3-design-system.mdx`
- **설명**: 다이어그램 import 구문 실제 컴포넌트로 교체
- **완료 조건**:
  - [ ] ColorScale 컴포넌트 import 및 배치
  - [ ] TokenStructure 컴포넌트 import 및 배치
  - [ ] SpecTemplate 컴포넌트 import 및 배치
  - [ ] ResultsDashboard 컴포넌트 import 및 배치
- **복잡도**: S

### Task 7-D: UI Flow MDX에 다이어그램 연결
- **의존성**: Task 2-D, Task 6-A, Task 6-B, Task 6-C
- **범위**: `docs/content/portfolio/project-4-ui-flow.mdx`
- **설명**: 다이어그램 import 구문 실제 컴포넌트로 교체
- **완료 조건**:
  - [ ] AsIsFlow 컴포넌트 import 및 배치
  - [ ] ToBeFlow 컴포넌트 import 및 배치
  - [ ] FeatureConsolidation 컴포넌트 import 및 배치
- **복잡도**: S

---

## Phase 8: PDF 다운로드 기능 (순차)

### Task 8-A: PDF 내보내기 기능 구현
- **의존성**: Phase 7 완료
- **범위**: `src/components/portfolio/pdf-export-button.tsx`, `src/app/portfolio/page.tsx`
- **설명**: 웹페이지를 PDF로 내보내기 기능
- **완료 조건**:
  - [ ] PDF 내보내기 버튼 컴포넌트 생성
  - [ ] html2canvas + jsPDF 또는 @react-pdf/renderer 활용
  - [ ] 슬라이드별 페이지 분리
  - [ ] 포트폴리오 페이지에 버튼 배치
- **복잡도**: M

---

## Phase 9: 검증 (순차)

### Task 9-A: 로컬 테스트 및 버그 수정
- **의존성**: Phase 8 완료
- **범위**: 전체
- **설명**: 전체 기능 검증 및 버그 수정
- **완료 조건**:
  - [ ] `npm run dev` 실행 성공
  - [ ] 4개 프로젝트 슬라이드 렌더링 확인
  - [ ] 스크롤 스냅 동작 확인
  - [ ] 모바일 레이아웃 확인
  - [ ] PDF 다운로드 동작 확인
  - [ ] 다이어그램 애니메이션 확인
- **복잡도**: M

---

## 필요 컴포넌트

### 신규 생성

| 컴포넌트 | 위치 | 설명 | Props | 복잡도 |
|----------|------|------|-------|--------|
| DataPipeline | @/components/portfolio/diagrams/cro | 데이터 흐름 다이어그램 | - | M |
| MetricsChart | @/components/portfolio/diagrams/cro | 결과 지표 차트 | metrics: {label, before, after}[] | S |
| ShortcutUsageChart | @/components/portfolio/diagrams/labeling-tool | 단축키 사용률 차트 | data: {key, before, after}[] | M |
| ToolbarComparison | @/components/portfolio/diagrams/labeling-tool | 툴바 비교 UI | - | M |
| ActionFlow | @/components/portfolio/diagrams/labeling-tool | 작업 흐름 다이어그램 | - | M |
| SpeedMetrics | @/components/portfolio/diagrams/labeling-tool | 속도 개선 지표 | - | S |
| ColorScale | @/components/portfolio/diagrams/design-system | 컬러 스케일 시각화 | - | M |
| TokenStructure | @/components/portfolio/diagrams/design-system | 토큰 구조도 | - | M |
| SpecTemplate | @/components/portfolio/diagrams/design-system | 명세 템플릿 예시 | - | M |
| ResultsDashboard | @/components/portfolio/diagrams/design-system | 결과 지표 대시보드 | - | S |
| AsIsFlow | @/components/portfolio/diagrams/ui-flow | 개선 전 User Flow | - | L |
| ToBeFlow | @/components/portfolio/diagrams/ui-flow | 개선 후 User Flow | - | L |
| FeatureConsolidation | @/components/portfolio/diagrams/ui-flow | 기능 통폐합 비교 | - | M |
| PdfExportButton | @/components/portfolio | PDF 내보내기 버튼 | onExport?: () => void | M |

### 기존 활용

| 컴포넌트 | 위치 | 용도 |
|----------|------|------|
| cover-slide | @/components/portfolio/slides | 프로젝트 커버 슬라이드 |
| problem-slide | @/components/portfolio/slides | 문제 정의 슬라이드 |
| process-slide | @/components/portfolio/slides | 해결 과정 슬라이드 |
| outcome-slide | @/components/portfolio/slides | 결과 슬라이드 |
| reflection-slide | @/components/portfolio/slides | 회고 슬라이드 |

---

## 미결정 사항 (PDF 확인 필요)

1. **CRO 다이어그램 상세**: CRO PDF 내 시각 자료 목록 확인 후 구체화
2. **UI Flow 원래 단계 수**: PDF에서 Before 수치 파악 (현재 "35단계로 축소"만 명시)
3. **각 프로젝트 회고 상세**: 잘한 점/개선할 점 구체화

---

## Summary

| Phase | 태스크 수 | 병렬 가능 | 설명 |
|-------|----------|----------|------|
| Phase 1 | 2 | Yes | 콘텐츠 정리 |
| Phase 2 | 4 | Yes | MDX 콘텐츠 작성 |
| Phase 3 | 2 | Yes | CRO 다이어그램 |
| Phase 4 | 4 | Yes | 라벨링 툴 다이어그램 |
| Phase 5 | 4 | Yes | 디자인 시스템 다이어그램 |
| Phase 6 | 3 | Yes | UI Flow 다이어그램 |
| Phase 7 | 4 | No | 다이어그램 통합 |
| Phase 8 | 1 | No | PDF 다운로드 |
| Phase 9 | 1 | No | 검증 |
| **합계** | **25** | - | - |
