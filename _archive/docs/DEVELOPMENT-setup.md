# Development Guide: /setup - Claude Code 초기 세팅 커맨드

## 개요

팀원들이 새 프로젝트에서 `/setup` 커맨드 하나로 일관된 Claude Code 개발 환경을 자동 구성할 수 있게 하는 기능.

**핵심 가치:**
- CLAUDE.md 기본 템플릿 자동 생성
- 디자인 시스템 연동 (토큰 CDN + 컴포넌트 npm)
- 컴포넌트 자동 등록 워크플로우

## 기술 스택

- **Claude Code**: 커맨드 시스템 (`.claude/commands/`)
- **설정 파일**: `.claude/settings.local.json`
- **토큰 배포**: jsDelivr CDN (GitHub 연동)
- **컴포넌트 배포**: npm (GitHub Actions 자동화)

---

## 선행 작업 (필수)

이 Development Guide의 구현을 시작하기 전에 아래 작업이 완료되어야 함.

### 1. design-system 저장소 생성

```
design-system/
├── tokens.css                 # 디자인 토큰 정의
├── components/                # 공용 컴포넌트
│   ├── Button/
│   ├── Card/
│   └── Input/
├── package.json               # npm 패키지 설정
└── .github/workflows/
    └── publish.yml            # 자동 npm 배포
```

### 2. GitHub Actions npm 배포 설정

### 3. 팀원 권한 설정
- design-system 저장소 write 권한
- npm 배포 토큰 (GitHub Secrets)

---

## 구현 태스크

### Phase 1: /setup 커맨드 구현

#### Task 1-A: /setup 커맨드 파일 생성
**담당 파일**: `~/.claude/commands/setup.md`
**복잡도**: M
**구현 내용**:
- [ ] 커맨드 메타데이터 (description, allowed-tools) 정의
- [ ] 기본 CLAUDE.md 템플릿 inline 포함:
  - 문서 관리 규칙
  - PRD/기획 작성 가이드
  - 코드 원칙
  - 작업 규칙
  - 개발 컨벤션
- [ ] 디자인 시스템 규칙 템플릿 inline 포함 (--design 옵션용):
  - 토큰 참조 규칙 (`bg-primary` O, `bg-[#3b82f6]` X)
  - 컴포넌트 규칙 (@회사/ui 우선 사용)
  - 컴포넌트 자동 등록 규칙
  - 폴더 구조 + 네이밍 컨벤션
- [ ] 실행 프로세스 명시:
  1. 기존 CLAUDE.md 확인 및 백업
  2. 기본 템플릿 생성
  3. --design 시: DS 규칙 추가 + globals.css CDN import + npm install
  4. 완료 메시지 및 다음 단계 안내
- [ ] 사용법 및 옵션 문서화

**설계 결정:** 템플릿을 별도 파일로 분리하지 않고 setup.md에 inline 포함. 단일 파일로 배포 가능.

### Phase 2: 통합 및 검증

#### Task 2-A: 테스트 및 정리
**담당 파일**: `~/.claude/commands/setup.md`
**복잡도**: S
**의존성**: Phase 1 완료 후
**구현 내용**:
- [ ] 새 프로젝트에서 `/setup` 실행 테스트
- [ ] `/setup --design` 실행 테스트
- [ ] 기존 /init-claude 커맨드와 중복 확인
- [ ] 기존 templates/ 폴더 파일 삭제
- [ ] 완료 메시지 확인:
  ```
  ✅ CLAUDE.md 생성 완료!
  📦 @회사/ui 설치됨
  🎨 토큰 CDN 연결됨

  다음 단계:
  1. npm run dev로 개발 시작
  2. 새 컴포넌트는 자동으로 design-system에 등록됨
  ```

---

## 파일 경로 요약

| Phase | Task | 파일 경로 |
|-------|------|----------|
| 1 | 1-A | `~/.claude/commands/setup.md` (템플릿 inline 포함) |
| 2 | 2-A | 테스트 및 정리 작업 |

## 필요 컴포넌트

### 신규 생성

| 파일 | 위치 | 설명 |
|------|------|------|
| setup.md | `~/.claude/commands/` | /setup 커맨드 정의 (모든 템플릿 inline 포함) |

### 기존 활용

| 파일 | 위치 | 용도 |
|-----|------|------|
| init-claude.md | `~/.claude/commands/` | 기존 커맨드 (setup으로 대체 예정) |
| settings.local.json | `~/.claude/` | 권한 설정 (필요시) |

---

## 검증 체크리스트

### Phase 완료 조건

**Phase 1 완료:**
- [ ] `/setup` 커맨드 실행 시 기본 CLAUDE.md 생성됨
- [ ] 기존 CLAUDE.md 있을 때 백업 후 병합됨
- [ ] `/setup --design` 시 DS 규칙이 CLAUDE.md에 추가됨
- [ ] 컴포넌트 자동 등록 규칙이 포함됨
- [ ] globals.css에 CDN import 추가됨
- [ ] `npm install @회사/ui` 자동 실행됨

**Phase 2 완료:**
- [ ] 새 프로젝트에서 테스트 완료
- [ ] 기존 templates/ 폴더 삭제됨
- [ ] 완료 메시지에 다음 단계 안내 포함

### 통합 테스트

- [ ] 새 프로젝트에서 `/setup` 실행 → CLAUDE.md 생성 확인
- [ ] 새 프로젝트에서 `/setup --design` 실행
- [ ] @회사/ui 패키지 설치 확인
- [ ] 토큰 CDN 연결 확인
- [ ] 새 컴포넌트 생성 시 자동 등록 동작 확인

---

## 삭제된 항목

이전 버전에서 계획되었으나 불필요하여 제거된 항목:

| 항목 | 이유 |
|------|------|
| `~/.claude/templates/` 폴더 전체 | setup.md에 템플릿 inline 포함. 단일 파일 배포를 위해 분리하지 않음 |
| `claude-md-base.md` | setup.md에 inline 포함 |
| `claude-md-ds.md` | setup.md에 inline 포함 |
| `globals-css-template.md` | setup에서 CDN import 한 줄만 추가하면 됨. 불필요 |
| `npm-install-guide.md` | /setup에서 자동 설치로 대체 |
| `setup-guide.md` 커맨드 | 사용법 설명 커맨드는 과함. 완료 메시지로 충분 |
| design-system 스킬 자동 등록 | 복잡도 대비 가치 낮음. 단순 규칙으로 대체 |
