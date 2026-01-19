# EDU-5233: /setup-design 동작 명세 확정 (5단계 + 재실행 정책)

- **Linear**: https://linear.app/geniefy/issue/EDU-5233
- **Due Date**: 2026-01-19
- **Estimate**: 2h
- **Status**: 🔄 In Progress (작업 완료, 확인 대기)

## 목표

`/setup-design` 커맨드의 동작을 문서로 고정. 구현 전에 명세를 확정하여 일관된 동작 보장.

## To-do (Linear 동기화)

- [x] Step 1~5 동작을 문서로 고정
- [x] 재실행(idempotent) 정책 정의 (중복 방지/덮어쓰기/백업)
- [x] 성공/실패 메시지 포맷 확정 (표준 출력)

## 작업 대상 파일

```
/Users/hskim/dev/siot/docs/design-workflow/
└── setup-design-spec.md    # 명세 문서 (새로 생성)
```

---

# /setup-design 커맨드 명세

## 개요

프로젝트에 디자인 시스템을 자동으로 설정하는 Claude Code 커맨드.
한 번 실행으로 토큰, 규칙, 컴포넌트, hook이 모두 세팅된다.

## 실행 조건

- **필수**: `package.json` 존재 (npm 프로젝트)
- **필수**: `src/` 또는 `app/` 디렉토리 존재 (프로젝트 구조 탐지)
- **선택**: `globals.css` 또는 유사 CSS 파일

---

## Step 1: design-rules.md 로컬 복사

**동작:**
1. CDN에서 `design-rules.md` 다운로드
   - URL: `https://cdn.jsdelivr.net/gh/geniefy/design-system/design-rules.md`
2. 프로젝트 루트에 `design-rules.md` 생성

**재실행 정책:** `BACKUP`
- 기존 파일 존재 시 → `.backup` 확장자로 백업 후 덮어쓰기
- 예: `design-rules.md` → `design-rules.md.backup`

**출력:**
```
✓ Step 1/5: design-rules.md 다운로드 완료
  → 기존 파일 백업: design-rules.md.backup
```

---

## Step 2: CLAUDE.md에 규칙 참조 추가

**동작:**
1. `CLAUDE.md` 파일 확인 (없으면 생성)
2. 다음 섹션 추가:

```markdown
## 디자인 규칙

UI 컴포넌트 작성 시 `design-rules.md`를 반드시 참조할 것.
토큰, 컴포넌트 사용 규칙, Generation Protocol을 준수해야 한다.
```

**재실행 정책:** `SKIP_IF_EXISTS`
- 이미 "디자인 규칙" 섹션이 있으면 스킵
- 중복 추가 방지

**출력:**
```
✓ Step 2/5: CLAUDE.md에 디자인 규칙 참조 추가
```
또는
```
- Step 2/5: CLAUDE.md에 이미 디자인 규칙 섹션 존재 (스킵)
```

---

## Step 3: globals.css에 토큰 CDN import 추가

**동작:**
1. CSS 파일 탐색 (우선순위):
   - `src/app/globals.css`
   - `src/styles/globals.css`
   - `app/globals.css`
   - `styles/globals.css`
2. 파일 최상단에 import 추가:

```css
@import url('https://cdn.jsdelivr.net/gh/geniefy/design-system/tokens.css');
```

**재실행 정책:** `SKIP_IF_EXISTS`
- 이미 해당 import가 있으면 스킵

**출력:**
```
✓ Step 3/5: src/app/globals.css에 토큰 CDN import 추가
```
또는
```
⚠ Step 3/5: globals.css를 찾을 수 없음 (수동 추가 필요)
```

---

## Step 4: @geniefy/ui npm 패키지 설치

**동작:**
1. 패키지 매니저 탐지:
   - `pnpm-lock.yaml` → pnpm
   - `yarn.lock` → yarn
   - `package-lock.json` 또는 기본 → npm
2. 패키지 설치:
   ```bash
   {패키지매니저} install @geniefy/ui
   ```

**재실행 정책:** `SKIP_IF_EXISTS`
- `package.json`의 dependencies에 이미 있으면 스킵

**출력:**
```
✓ Step 4/5: @geniefy/ui 설치 완료 (npm)
```
또는
```
- Step 4/5: @geniefy/ui 이미 설치됨 (스킵)
```

---

## Step 5: settings.local.json에 hook 설정 추가

**동작:**
1. `.claude/settings.local.json` 확인 (없으면 생성)
2. hook 설정 추가:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Checking design rules...'",
            "condition": "path.startsWith('src/components/')"
          }
        ]
      }
    ]
  }
}
```

**재실행 정책:** `MERGE`
- 기존 hooks 배열에 추가 (기존 설정 유지)
- 동일 matcher가 있으면 스킵

**출력:**
```
✓ Step 5/5: .claude/settings.local.json에 hook 설정 추가
```

---

## 재실행 정책 요약

| Step | 정책 | 설명 |
|------|------|------|
| 1 | `BACKUP` | 기존 파일 백업 후 덮어쓰기 |
| 2 | `SKIP_IF_EXISTS` | 섹션 존재 시 스킵 |
| 3 | `SKIP_IF_EXISTS` | import 존재 시 스킵 |
| 4 | `SKIP_IF_EXISTS` | 패키지 설치됨 시 스킵 |
| 5 | `MERGE` | 기존 설정에 병합 |

---

## 성공/실패 메시지 포맷

### 전체 성공
```
🎨 /setup-design 완료!

✓ Step 1/5: design-rules.md 다운로드 완료
✓ Step 2/5: CLAUDE.md에 디자인 규칙 참조 추가
✓ Step 3/5: src/app/globals.css에 토큰 CDN import 추가
✓ Step 4/5: @geniefy/ui 설치 완료 (npm)
✓ Step 5/5: .claude/settings.local.json에 hook 설정 추가

다음 단계:
- src/components/ 에서 UI 작성 시 design-rules.md가 자동 참조됩니다
- @geniefy/ui에서 공용 컴포넌트를 import하세요
```

### 부분 성공 (일부 스킵)
```
🎨 /setup-design 완료!

✓ Step 1/5: design-rules.md 다운로드 완료
- Step 2/5: CLAUDE.md에 이미 디자인 규칙 섹션 존재 (스킵)
✓ Step 3/5: src/app/globals.css에 토큰 CDN import 추가
- Step 4/5: @geniefy/ui 이미 설치됨 (스킵)
✓ Step 5/5: .claude/settings.local.json에 hook 설정 추가
```

### 실패
```
❌ /setup-design 실패

✓ Step 1/5: design-rules.md 다운로드 완료
✓ Step 2/5: CLAUDE.md에 디자인 규칙 참조 추가
⚠ Step 3/5: globals.css를 찾을 수 없음
✗ Step 4/5: npm install 실패 - ENETUNREACH

수동 조치 필요:
- globals.css 파일 경로를 확인하고 토큰 import를 수동으로 추가하세요
- 네트워크 연결을 확인하고 다시 실행하세요
```

---

## 옵션

| 옵션 | 설명 |
|------|------|
| `--dry-run` | 실제 변경 없이 실행 계획만 출력 |
| `--force` | 모든 단계 강제 실행 (백업 후 덮어쓰기) |
| `--skip-install` | Step 4 (npm install) 스킵 |

---

## 검증

- [x] 5단계 동작 명확히 정의됨
- [x] 재실행 시 안전하게 동작 (idempotent)
- [x] 메시지 포맷이 일관됨

## 작업 로그

### 2026-01-19

**명세 정의 완료:**
- Step 1: design-rules.md 다운로드 (BACKUP 정책)
- Step 2: CLAUDE.md 규칙 참조 추가 (SKIP_IF_EXISTS)
- Step 3: globals.css 토큰 import (SKIP_IF_EXISTS)
- Step 4: @geniefy/ui 설치 (SKIP_IF_EXISTS)
- Step 5: settings.local.json hook 설정 (MERGE)

**재실행 정책:**
- BACKUP: 기존 파일 백업 후 덮어쓰기
- SKIP_IF_EXISTS: 이미 존재하면 스킵
- MERGE: 기존 설정에 병합

**옵션:**
- --dry-run, --force, --skip-install
