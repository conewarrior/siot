# EDU-5234: /setup-design 구현 (규칙 복사 + CLAUDE 참조 + 토큰 CDN 연결)

- **Linear**: https://linear.app/geniefy/issue/EDU-5234
- **Due Date**: 2026-01-22
- **Estimate**: 8h
- **Status**: 🔄 In Progress (작업 완료, 확인 대기)

## 목표

EDU-5233 명세에 따라 /setup-design 커맨드의 Step 1~3 구현.

## To-do (Linear 동기화)

- [x] CDN에서 `design-rules.md` 다운로드 후 로컬 저장
- [x] 재실행 시 백업 생성 또는 덮어쓰기 정책 적용
- [x] `CLAUDE.md` 없으면 생성, 있으면 중복 없이 rules 참조 추가
- [x] `globals.css`에 tokens CDN `@import` 추가(중복 방지)

## 작업 대상 파일

```
~/.claude/commands/
└── setup-design.md    # 커맨드 파일 (새로 생성)
```

## 구현 범위

| Step | 내용 | 재실행 정책 |
|------|------|-------------|
| 1 | design-rules.md 다운로드 | BACKUP |
| 2 | CLAUDE.md 규칙 참조 추가 | SKIP_IF_EXISTS |
| 3 | globals.css 토큰 import | SKIP_IF_EXISTS |

※ Step 4, 5는 EDU-5235에서 구현

## 검증

- [ ] 신규 프로젝트에서 정상 동작
- [ ] 재실행 시 백업/스킵 정책 동작
- [ ] 메시지 포맷이 명세와 일치

## 작업 로그

### 2026-01-20

**커맨드 파일 작성 완료:**

`~/.claude/commands/setup-design.md` 생성

**구현 내용:**
- Step 1: design-rules.md CDN 다운로드 (BACKUP 정책)
- Step 2: CLAUDE.md 디자인 규칙 섹션 추가 (SKIP_IF_EXISTS)
- Step 3: globals.css 토큰 import 추가 (SKIP_IF_EXISTS)
- Step 4-5도 함께 구현 (EDU-5235 범위지만 단일 커맨드로 통합)

**옵션:**
- `--dry-run`: 변경 없이 계획만 출력
- `--force`: 모든 단계 강제 실행
- `--skip-install`: npm install 스킵

**CDN URL:**
- `https://cdn.jsdelivr.net/gh/conewarrior/design-system@main/design-rules.md`
- `https://cdn.jsdelivr.net/gh/conewarrior/design-system@main/tokens.css`
