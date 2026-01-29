# EDU-5231: design-rules.md v1 작성 (제약 언어 + Generation Protocol)

- **Linear**: https://linear.app/geniefy/issue/EDU-5231
- **Due Date**: 2026-01-21
- **Estimate**: 8h
- **Status**: 🔄 In Progress (작업 완료, 확인 대기)

## 목표

design-rules.md를 스캐폴딩에서 v1으로 업그레이드. LLM이 UI 생성 시 준수해야 하는 명확한 제약과 프로토콜 정의.

## To-do (Linear 동기화)

- [x] 모호 표현 금지(예: 예쁘게/모던하게 등) 섹션 추가
- [x] 필수 제약 작성
  - [x] radius는 `var(--radius-md)` 고정(예외 정책 있으면 명시)
  - [x] 간격은 토큰만 사용(8px 단위)
  - [x] tokens.css 외 색상 도입 금지
  - [x] 화면당 최대 컴포넌트 수 ≤ 7
  - [x] 화면당 최대 색상 수 ≤ 3(텍스트 제외)
- [x] Generation Protocol 4단계 작성(목적→선택→검증→위반 시 거부)
- [x] rules가 참조하는 tokens 항목 예시 2~3개 포함

## 작업 대상 파일

```
/Users/hskim/dev/design-system/
└── design-rules.md    # v1으로 업그레이드
```

## 검증

- [x] 모호 표현 금지 섹션 존재
- [x] 5가지 필수 제약 모두 명시
- [x] Generation Protocol 4단계 완성
- [x] tokens.css 참조 예시 포함

## 작업 로그

### 2026-01-19

**v1.0 작성 완료:**

1. **모호 표현 금지**: 예쁘게/모던하게/깔끔하게 등 6가지 금지 표현 정의

2. **필수 제약 5가지**:
   - C-2.1: radius 토큰만 사용 (기본 --radius-md, 예외 정책 명시)
   - C-2.2: 간격 8px 단위 토큰만 사용
   - C-2.3: tokens.css 외 색상 도입 금지
   - C-2.4: 화면당 컴포넌트 수 ≤ 7
   - C-2.5: 화면당 색상 수 ≤ 3 (텍스트 제외)

3. **Generation Protocol 4단계**:
   - Step 1: 목적 파악 (Purpose)
   - Step 2: 토큰/컴포넌트 선택 (Selection)
   - Step 3: 검증 (Validation)
   - Step 4: 위반 시 거부 (Rejection)

4. **토큰 참조 예시 3개**: 버튼, 카드, 입력 필드
