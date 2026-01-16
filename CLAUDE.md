# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
