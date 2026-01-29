# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# 포트폴리오 개발 (portfolio/ 디렉토리에서 실행)
cd portfolio && npm install    # 의존성 설치
npm run dev                    # 개발 서버 (localhost:3000)
npm run build                  # 프로덕션 빌드
npm run lint                   # ESLint 실행

# 이미지 CDN 업로드
npm run upload-images          # MDX 이미지 → jsDelivr CDN
npm run upload-images:dry      # 드라이런 (미리보기)
```

## Repository Structure

```
siot/
├── portfolio/           # Next.js 포트폴리오 사이트 (주요 작업 영역)
│   ├── CLAUDE.md       # 포트폴리오 전용 가이드
│   ├── src/            # 소스 코드
│   └── docs/           # MDX 콘텐츠 + 기획 문서
├── vercel.json         # Vercel 배포 설정 (portfolio 디렉토리 지정)
└── CLAUDE.md           # 이 파일
```

**포트폴리오 사이트 작업**: `portfolio/CLAUDE.md` 참조 (명령어, 아키텍처, 스타일링 등)

## Development Workflow

새 기능 개발 시 dev-cycle 워크플로우 사용 가능:

```bash
# 1. PRD 작성
vim docs/PRD.md

# 2. 전체 개발 사이클 실행
/dev-cycle docs/PRD.md
```

**자동 진행 단계:**
- PRD → Development Guide 변환 (prd-to-dev 에이전트)
- 병렬 개발 실행 (parallel-dev 커맨드)
- 코드 리뷰 및 수정 (reviewer 에이전트)
- 학습 내용 CLAUDE.md에 명문화 (codify 에이전트)

### 병렬 작업 규칙
- `<!-- PARALLEL_START/END -->` 태그 안의 태스크들은 독립적으로 동시 실행
- 각 태스크는 명시된 파일 범위만 수정 가능
- 병렬 작업 시 다른 태스크의 파일 범위 절대 건드리지 말 것

## Code Principles

- 간결하게: 최소한의 코드로 목적 달성
- 재사용 우선: 기존 컴포넌트/함수 있으면 활용, 없으면 재사용 가능하게 작성
- 중복 금지: 비슷한 코드 반복되면 추상화

## Korean Content

모든 콘텐츠는 한국어로 작성. 블로그 글은 평서체 (~했다) 사용.

## Claude Code 커맨드 작성 패턴

`~/.claude/commands/` 디렉토리에 커맨드 정의 파일 작성.

### 커맨드 파일 구조

```markdown
---
description: 커맨드 설명 (한 줄)
allowed-tools: Read, Write, Bash, Glob
---

# 커맨드 제목

## 사용법
/command-name              # 기본 실행
/command-name --option     # 옵션 포함

## 실행 프로세스
### 1단계: ...
### 2단계: ...

## 핵심 원칙
1. ...
2. ...
```

### 핵심 원칙
- frontmatter에 `description`, `allowed-tools` 명시
- 실행 프로세스를 단계별로 명확히 정의
- 옵션 테이블 형태로 문서화
- 완료 메시지에 다음 단계 안내 포함

## 커맨드 배포 원칙

**단일 파일 원칙**: 커맨드 파일은 템플릿을 inline으로 포함해야 함
- 별도 templates/ 폴더로 분리하면 배포가 불편해짐
- `setup.md` 하나로 모든 템플릿과 로직 포함

```
~/.claude/
├── commands/           # 커맨드 정의 (템플릿 inline 포함)
│   └── setup.md        # 단일 파일로 완결
└── settings.local.json # 권한 설정
```

- placeholder는 `{org}`, `@회사명/ui` 형태로 명확히 표시
- 완료 메시지에 placeholder 치환 안내 포함

## 자동화 원칙

**"물어보기"를 줄여야 함** - 규칙이 명확하면 자동 실행

적용 예시:
- 파일 백업: 기존 파일 있으면 자동으로 `.backup` 생성
- 패키지 설치: `--design` 옵션 시 npm install 자동 실행
- 경로 탐색: 일반적인 경로 (`src/app/`, `src/styles/`) 순서대로 자동 탐색

## 커맨드 vs 에이전트 분리 패턴

**커맨드**: 트리거 역할, 가벼운 오케스트레이션
- 사용자 입력 받기
- 에이전트 순차 호출
- 진행 상황 표시

**에이전트**: 복잡한 로직 처리, 전문화된 작업
- 분석, 변환, 생성 등 무거운 작업
- 재사용 가능한 단위로 설계

```
/forge (커맨드)
├── 인터뷰어 에이전트: 아이디어 → PRD
├── 아키텍트 에이전트: PRD → 구조화 + 이슈 분리
└── parallel-dev 커맨드: 병렬 개발 실행

/wrap (커맨드)
├── 변경 사항 분석 (내장)
└── Linear MCP 연동 (내장)
```

### 에이전트 분리 기준
- 재사용성: 여러 커맨드에서 호출 가능하면 분리
- 복잡도: 로직이 50줄 이상이면 분리 고려
- 전문성: 특정 도메인 지식 필요하면 분리

## 병렬 작업 분리 기준

병렬 실행 가능 여부 판단 기준:

### 분리 가능 (병렬 실행)
1. **파일 충돌 없음**: 각 태스크가 수정하는 파일이 겹치지 않음
2. **의존성 없음**: A 결과를 B가 필요로 하지 않음
3. **공유 상태 없음**: 전역 설정, 환경 변수 등 동시 수정 없음

### 분리 불가 (순차 실행)
1. **스키마 → API → UI**: 데이터 구조가 확정되어야 다음 단계 진행
2. **설정 → 구현**: 환경 설정 완료 후 코드 작성
3. **코어 → 확장**: 핵심 로직 완성 후 부가 기능 추가

### 파일 범위 명시 필수
```markdown
## Task 1: 컴포넌트 개발
**Files:** `src/components/Button.tsx`, `src/components/Button.test.tsx`

## Task 2: 스타일 정의
**Files:** `src/styles/button.css`
```

## MCP 도구 연동 패턴

### Linear MCP 호출
```
mcp__linear__create_issue
mcp__linear__update_issue
mcp__linear__get_issue
```

### MCP 도구 사용 원칙
1. **allowed-tools에 명시**: 커맨드 frontmatter에 필요한 MCP 도구 선언
2. **접두사 규칙**: `mcp__서비스명__기능명` 형태
3. **에러 핸들링**: MCP 연결 실패 시 graceful degradation

```markdown
---
allowed-tools: Read, Write, mcp__linear__create_issue, mcp__linear__update_issue
---
```

## 프로젝트 문서 구조 패턴

Linear 프로젝트 기반 작업 시 문서 구조:

```
docs/
└── {프로젝트-요약명}/           # 예: design-workflow
    ├── project.md              # Linear 프로젝트 description 기반
    └── issues/                 # Linear 이슈별 작업 기록
        ├── EDU-5229-scaffolding.md
        ├── EDU-5230-tokens.md
        └── ...
```

### project.md 작성 원칙
- **Linear 프로젝트에서 내용 가져오기**: `mcp__linear__get_project` 사용
- Linear description을 그대로 반영 (0.이슈 → 1.목표 → 2.리스크 → 3.검증계획 → 4.Done Definition)
- 임의로 내용 추가하지 말 것

### issues/ 파일 구조
```markdown
# {이슈ID}: {이슈명}

- **Linear**: {링크}
- **Due Date**: YYYY-MM-DD
- **Estimate**: Xh
- **Status**: 🔲 Todo | 🔄 In Progress | ✅ Done

## 목표
[이슈 목표]

## To-do
- [ ] 체크리스트

## 작업 대상 파일
[수정할 파일 목록]

## 작업 로그
<!-- 작업하면서 기록 -->
```

## 세션 재시작 시 컨텍스트 복구

세션이 끊겼다가 다시 시작하면 이전 대화 내용이 사라짐.
사용자가 "이전에 하던 작업" 언급 시:
1. `docs/` 폴더의 최근 수정 파일 확인
2. Linear 프로젝트 조회로 현재 진행 상황 파악
3. issues/ 폴더의 이슈 파일 확인

## 현재 진행 중인 프로젝트

### design-workflow (AX 조직을 위한 디자인 워크플로우 구축)

- **문서**: `docs/design-workflow/project.md`
- **Linear**: https://linear.app/geniefy/project/ax-조직을-위한-디자인-워크플로우-구축-7911e033ac99
- **작업 저장소**: `/Users/hskim/dev/design-system/`

**주요 결과물**:
- `/setup-design` 커맨드: 프로젝트에 디자인 시스템 자동 세팅
- `@geniefy/ui` npm 패키지: 공용 컴포넌트
- `tokens.css` CDN: 디자인 토큰
- `design-rules.md`: LLM 제약 규칙 + Generation Protocol
