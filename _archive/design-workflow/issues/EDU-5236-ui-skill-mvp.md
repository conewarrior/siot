# EDU-5236: UI 생성 Skill MVP (규칙 기반 생성 + 검증/거부 루프)

- **Linear**: https://linear.app/geniefy/issue/EDU-5236
- **Due Date**: 2026-01-26
- **Estimate**: 16h
- **Status**: 🔄 In Progress (작업 완료, 확인 대기)

## 목표

design-rules.md를 읽어 Generation Protocol을 적용하는 UI 생성 Skill 구현.

## To-do (Linear 동기화)

- [x] `design-rules.md`를 읽어 생성 프롬프트에 반영
- [x] Protocol 단계 실행 (목적 정의 → 최소 컴포넌트 선택 → 규칙 검증)
- [x] 규칙 위반 시 출력 거부/수정 루프 동작
- [x] 위반 항목을 로그로 남김 (최소 텍스트 리포트)
- [x] `src/components/` 변경 시 자동 호출 트리거가 동작 (훅 연동 확인)

## 작업 대상 파일

```
~/.claude/skills/
└── ui-generation/
    └── SKILL.md    # 스킬 정의 (새로 생성)
```

## 설계

### Generation Protocol 4단계

| Step | 이름 | 설명 |
|------|------|------|
| 1 | Purpose | UI의 주요 목적과 사용자 액션 파악 |
| 2 | Selection | 사용할 토큰/컴포넌트 목록 선택 |
| 3 | Validation | 제약 위반 여부 검증 |
| 4 | Rejection | 위반 시 생성 거부, 수정 후 재검증 |

### 검증 체크리스트

- [ ] 하드코딩 색상 없음 (#fff, rgb 등)
- [ ] 하드코딩 간격 없음 (px, rem 직접 사용)
- [ ] radius는 토큰 사용
- [ ] 컴포넌트 수 ≤ 7
- [ ] 배경/강조 색상 수 ≤ 3

### Hook 연동

`/setup-design` Step 5에서 설정한 hook이 `src/components/` 변경 시 이 skill을 트리거.

## 검증

- [x] design-rules.md 읽기 동작
- [x] Protocol 4단계 출력
- [x] 위반 감지 시 거부 메시지
- [x] hook 트리거 확인

## 작업 로그

### 2026-01-20

**스킬 파일 작성 완료:**

`~/.claude/skills/ui-generation/SKILL.md` 생성

**구현 내용:**

1. **Generation Protocol 4단계**
   - Step 1: 목적 파악 (Purpose) - 사용자 액션, 정보, 기존 컴포넌트 확인
   - Step 2: 토큰 선택 (Selection) - 색상 ≤3, 간격, radius 선택
   - Step 3: 검증 (Validation) - 6가지 체크리스트
   - Step 4: 거부 (Rejection) - 위반 시 수정 후 재검증

2. **필수 제약 (C-2.1~2.5)**
   - radius 토큰만 사용
   - 8px 단위 간격 토큰
   - tokens.css 색상만 사용
   - 컴포넌트 ≤7, 색상 ≤3

3. **위반 로그 형식**
   - 테이블 형식의 위반 리포트
   - 수정 제안 포함

4. **토큰 참조 예시**
   - 간격, 색상, radius 토큰 목록

5. **모호 표현 금지**
   - "예쁘게", "모던하게" 등 6가지 금지 표현

**트리거 조건:**
- `src/components/` 경로 작업 시
- `/setup-design` hook에 의한 자동 트리거
