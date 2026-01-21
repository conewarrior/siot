# Portfolio Design Guide

포트폴리오 사이트 전체에 적용되는 디자인 가이드라인.

## Color Palette

녹색 기반의 통일된 팔레트. 색상 남발 금지.

### Primary Colors

| Token | Name | HEX | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-primary` | Forest Fern | #327039 | 50, 112, 57 | 메인 브랜드 컬러, CTA 버튼, 활성 탭, 링크 |
| `--color-primary-dark` | Tilled Earth | #133020 | 19, 48, 32 | 텍스트, 다크 모드 배경, 강조 영역 |

### Neutral Colors

| Token | Name | HEX | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-background` | Alabaster Hay | #F8EDD9 | 248, 237, 217 | 페이지 배경, 카드 배경 |
| `--color-foreground` | Tilled Earth | #133020 | 19, 48, 32 | 본문 텍스트, 제목 |

### Accent Colors

| Token | Name | HEX | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-accent` | Wheat Field Sunrise | #F0BE49 | 240, 190, 73 | 하이라이트, 호버 효과, 배지 |
| `--color-accent-warm` | Cherry Grove | #DD5C36 | 221, 92, 54 | 경고, 중요 포인트 (매우 제한적) |

### Color Variations (녹색 베리에이션)

탭, 섹션 구분 등에 사용할 녹색 변형:

| Level | HEX | Usage |
|-------|-----|-------|
| `--green-100` | #E8F5E9 | 배경 틴트, 호버 |
| `--green-200` | #C8E6C9 | 비활성 요소 배경 |
| `--green-300` | #A5D6A7 | 보조 요소 |
| `--green-400` | #66BB6A | 중간 강조 |
| `--green-500` | #327039 | Primary (Forest Fern) |
| `--green-600` | #2E7D32 | 호버 상태 |
| `--green-700` | #1B5E20 | 액티브 상태 |
| `--green-800` | #133020 | Dark (Tilled Earth) |

## Typography

### Font Family
- **Primary**: Pretendard (한글/영문 통합)
- **Fallback**: -apple-system, BlinkMacSystemFont, system-ui, sans-serif

### Scale (Portfolio)

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Hero | 60px / 3.75rem | Bold (700) | 1.1 | 커버 메인 타이틀 |
| H1 | 40px / 2.5rem | Bold (700) | 1.2 | 프로젝트 제목 |
| H2 | 28px / 1.75rem | Semibold (600) | 1.3 | 슬라이드 제목, 소제목 |
| H3 | 20px / 1.25rem | Semibold (600) | 1.4 | 카드 제목 |
| Body | 16px / 1rem | Regular (400) | 1.6 | 본문, 설명 |
| Caption | 14px / 0.875rem | Medium (500) | 1.5 | 메타 정보, 라벨 |
| Small | 12px / 0.75rem | Regular (400) | 1.5 | 부가 정보 |

## Spacing

8px 기반 스케일:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | 아이콘-텍스트 간격 |
| `--space-2` | 8px | 인라인 요소 간격 |
| `--space-3` | 12px | 작은 패딩 |
| `--space-4` | 16px | 기본 패딩/마진 |
| `--space-6` | 24px | 섹션 내부 간격 |
| `--space-8` | 32px | 컴포넌트 간 간격 |
| `--space-12` | 48px | 섹션 간 간격 |
| `--space-16` | 64px | 큰 섹션 구분 |

## Components

### Navigation Tabs (상단 네비게이션)

```
┌─────────────────────────────────────────────────────────────┐
│  [인트로]  [CRO]  [라벨링]  [디자인 시스템]  [UI Flow]  [About] │
└─────────────────────────────────────────────────────────────┘
```

- **비활성 탭**: 투명 배경, `--color-foreground` 텍스트
- **활성 탭**: `--color-primary` 배경, 흰색 텍스트, 라운드 처리
- **호버**: `--green-100` 배경
- 슬라이드 진행 인디케이터: 활성 탭 하단에 작은 도트들

### Cards

- **배경**: `--color-background` 또는 흰색
- **테두리**: 1px solid rgba(19, 48, 32, 0.1)
- **라운드**: 12px
- **그림자**: 0 2px 8px rgba(19, 48, 32, 0.08)

### Buttons

- **Primary**: `--color-primary` 배경, 흰색 텍스트
- **Secondary**: 투명 배경, `--color-primary` 테두리/텍스트
- **Ghost**: 투명 배경, `--color-foreground` 텍스트

## Layout

### Portfolio Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    [상단 탭 네비게이션]                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                    [메인 슬라이드 캔버스]                      │
│                    (스냅 스크롤, 전체 높이)                    │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- 페이지 스크롤 없음 (`h-screen overflow-hidden`)
- 상단 탭: 고정 높이 (56-64px)
- 캔버스: 나머지 공간 전체 사용

### Grid System

12컬럼 그리드 (슬라이드 내부):

| Layout | Columns | Usage |
|--------|---------|-------|
| 4-8 | 4 : 8 | 인트로 (프로필 + 콘텐츠) |
| 5-7 | 5 : 7 | 에필로그 (About + 스킬) |
| 6-6 | 6 : 6 | 문제 정의 (컨텍스트 + 다이어그램) |
| full | 12 | 단일 컬럼 |

## Design Principles

### 1. 색상 절제
- 녹색 팔레트 내에서만 사용
- 프로젝트별로 다른 색상 사용 금지
- 액센트(골드, 코랄)는 매우 제한적으로

### 2. 여백 활용
- 충분한 여백으로 콘텐츠 호흡
- 밀집된 레이아웃 피하기

### 3. 일관성
- 동일한 컴포넌트는 동일한 스타일
- 예외 만들지 않기

### 4. 이미지
- 스크린샷은 절대 잘리면 안 됨 (`object-contain`)
- 일관된 라운드 처리 (12px)
- 적절한 그림자로 부유감

## CSS Variables (globals.css에 추가)

```css
:root {
  /* Primary */
  --color-primary: #327039;
  --color-primary-dark: #133020;

  /* Neutral */
  --color-background: #F8EDD9;
  --color-foreground: #133020;

  /* Accent */
  --color-accent: #F0BE49;
  --color-accent-warm: #DD5C36;

  /* Green Scale */
  --green-100: #E8F5E9;
  --green-200: #C8E6C9;
  --green-300: #A5D6A7;
  --green-400: #66BB6A;
  --green-500: #327039;
  --green-600: #2E7D32;
  --green-700: #1B5E20;
  --green-800: #133020;
}
```

## File Reference

- 원본 팔레트: `/Users/hskim/Downloads/green palette.jpg`
- 이 가이드: `/portfolio/docs/design-guide.md`
