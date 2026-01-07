# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**포트폴리오 사이트 작업**: `portfolio/CLAUDE.md` 참조

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
