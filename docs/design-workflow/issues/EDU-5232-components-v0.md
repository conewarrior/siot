# EDU-5232: 공용 컴포넌트 v0 구현 (Button + 1개)

- **Linear**: https://linear.app/geniefy/issue/EDU-5232
- **Due Date**: 2026-01-22
- **Estimate**: 8h
- **Status**: 🔄 In Progress (작업 완료, 확인 대기)

## 목표

토큰 기반 공용 컴포넌트 v0 구현. Button과 Input 컴포넌트를 tokens.css 기반으로 작성.

## To-do (Linear 동기화)

- [x] Button 구현 (토큰 기반 spacing/radius/color 준수)
- [x] 추가 컴포넌트 1개 (Input)
- [x] 간단한 사용 예제 코드 (README) 추가

## 작업 대상 파일

```
/Users/hskim/dev/design-system/
├── components/
│   ├── Button/
│   │   └── index.tsx
│   └── Input/
│       └── index.tsx
├── index.ts          # export 추가
└── README.md         # 사용 예제 추가
```

## 설계 방향

### Button
- variant: `primary`, `secondary`, `outline`, `ghost`, `destructive`
- size: `sm`, `md`, `lg`
- 토큰 준수: spacing, radius, color

### Input
- 기본 텍스트 입력
- 상태: default, focus, disabled, error
- 토큰 준수: spacing, radius, color, typography

## 검증

- [x] npm run build 성공
- [x] 토큰만 사용 (하드코딩 색상/간격 없음)
- [x] TypeScript 타입 정의 포함

## 작업 로그

### 2026-01-19

**v0 구현 완료:**

1. **Button 컴포넌트**
   - variant: primary, secondary, outline, ghost, destructive
   - size: sm, md, lg
   - 모든 스타일 CSS 변수 사용

2. **Input 컴포넌트**
   - inputSize: sm, md, lg
   - error 상태 지원
   - 모든 스타일 CSS 변수 사용

3. **README 사용 예제 추가**
   - Button/Input 기본 사용법
   - tokens.css 필수 안내
