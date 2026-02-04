# EDU-5230: tokens.css v0 정의 (색상/간격/라디우스)

- **Linear**: https://linear.app/geniefy/issue/EDU-5230
- **Due Date**: 2026-01-20
- **Estimate**: 8h
- **Status**: 🔄 In Progress (작업 완료, 확인 대기)

## 목표

tokens.css에 실제 토큰값 정의. Tailwind/shadcn 스타일 기반으로 실용적인 토큰 세트 구성.

## To-do (Linear 동기화)

- [x] spacing 토큰을 8px 단위로 정의 (`--spacing-*`)
- [x] radius 토큰 정의 (`--radius-md` 포함)
- [x] color 토큰 정의 (기본 팔레트 + 사용 범위)
- [x] 토큰 네이밍/의도 주석 추가 ("추가/변경 기준" 포함)

## 작업 대상 파일

```
/Users/hskim/dev/design-system/
└── tokens.css          # 토큰 정의
```

## 토큰 설계 방향

### Spacing (8px 단위)
- 기본 단위: 8px
- 스케일: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24
- 예: `--spacing-4` = 32px (4 × 8px)

### Radius
- sm, md, lg, xl, 2xl, full
- 기본값: md = 8px

### Colors
- Neutral: gray 스케일 (50~950)
- Primary: 브랜드 컬러
- Semantic: success, warning, error, info

## 검증

- [ ] CSS 변수 문법 오류 없음
- [ ] 다크모드 오버라이드 정상 작동
- [ ] 네이밍 일관성 확인

## 작업 로그

### 2026-01-19

**정의된 토큰:**
- **Spacing**: 8px 단위, 16개 (0 ~ 24)
- **Radius**: 7개 (none, sm, md, lg, xl, 2xl, full)
- **Colors**:
  - Neutral: 11단계 (50~950)
  - Primary (Orange): 11단계
  - Semantic: success, warning, error, info (각 4단계)
  - Aliases: background, foreground, muted, border, primary, accent 등
- **Typography**: font-size 10단계, line-height 3단계, font-weight 4단계
- **Dark Mode**: .dark 클래스로 semantic aliases 오버라이드

**설계 결정:**
- Tailwind/shadcn 스타일 기반
- Primary color = Orange (#f97316) - 기존 포트폴리오 accent와 동일
- 의미 기반 토큰(--color-foreground 등)을 우선 사용하도록 가이드
