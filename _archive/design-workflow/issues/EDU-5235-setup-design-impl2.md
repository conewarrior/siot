# EDU-5235: /setup-design 구현 (UI 패키지 설치 + hook 설정 추가)

- **Linear**: https://linear.app/geniefy/issue/EDU-5235
- **Due Date**: 2026-01-23
- **Estimate**: 4h
- **Status**: 🔄 In Progress (작업 완료, 확인 대기)

## 목표

EDU-5233 명세에 따라 /setup-design 커맨드의 Step 4~5 구현.

## To-do (Linear 동기화)

- [x] `@geniefy/ui` 설치 동작 추가 (설치 실패 시 안내 포함)
- [x] `settings.local.json`에 `src/components/` 감지 hook 추가
- [x] 재실행 시 중복 설정 방지

## 작업 대상 파일

```
~/.claude/commands/
└── setup-design.md    # EDU-5234에서 이미 생성됨
```

## 구현 범위

| Step | 내용 | 재실행 정책 |
|------|------|-------------|
| 4 | @geniefy/ui npm 설치 | SKIP_IF_EXISTS |
| 5 | settings.local.json hook | MERGE |

## 검증

- [x] 패키지 매니저 탐지 (pnpm/yarn/npm)
- [x] 이미 설치된 경우 스킵
- [x] hook 중복 방지 (동일 matcher 스킵)

## 작업 로그

### 2026-01-20

**EDU-5234에서 함께 구현 완료:**

단일 커맨드 파일로 Step 1-5 전체를 구현했기 때문에, 이 이슈의 범위(Step 4-5)는 EDU-5234 작업 시 이미 완료됨.

**구현 내용:**
- **Step 4**: @geniefy/ui npm 설치
  - 패키지 매니저 자동 탐지 (pnpm-lock.yaml → pnpm, yarn.lock → yarn, 기본 → npm)
  - package.json dependencies 확인 후 이미 있으면 스킵
  - `--skip-install` 옵션으로 스킵 가능

- **Step 5**: settings.local.json hook 설정
  - `.claude/settings.local.json` 없으면 생성
  - `src/components/` 경로 Write|Edit 시 hook 트리거
  - 기존 설정과 병합 (MERGE 정책)
  - 동일 matcher 있으면 스킵
