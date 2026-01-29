# Development Guide: Forge 워크플로우 자동화

## Overview

회의록/아이디어에서 시작해 PRD 생성, 심층 질문, 프로젝트 구조화, Linear 이슈 생성, 병렬 개발, 리뷰까지 자동화하는 워크플로우 시스템.

**핵심 가치:** 아이디어를 실행 가능한 프로젝트로 단조(forge)하는 전체 과정을 자동화

## Tech Stack

- Claude Code 커맨드/에이전트 (Markdown 기반)
- Linear MCP (프로젝트/이슈 관리)
- Task 도구 (병렬 서브에이전트 실행)

## 의존성 관계

```
Phase 1: /forge, /wrap 커맨드 (병렬 가능)
    ↓
Phase 2: architect 에이전트 (/forge가 호출함)
    ↓
Phase 3: 통합 테스트 (모든 컴포넌트 완료 후)
```

**참고:** 템플릿은 각 커맨드/에이전트 파일에 inline으로 포함 (단일 파일 원칙)

---

## Phase 1: 커맨드 개발

<!-- PARALLEL_START -->

### Task 1-A: /forge 커맨드 개발

- **범위**: `~/.claude/commands/forge.md`
- **복잡도**: L (Large)
- **설명**: 전체 워크플로우를 트리거하는 메인 커맨드

**구현 내용:**

1. **frontmatter 구조**
   ```yaml
   ---
   description: 아이디어/회의록에서 PRD 생성, 구조화, 개발까지 자동화
   arguments:
     - name: file
       description: 원천 파일 경로 (회의록, 아이디어 등)
       required: true
   allowed-tools: Read, Write, Edit, Task, Bash, Glob, Grep
   ---
   ```

2. **실행 프로세스 구현**

   **Step 1: PRD 초안 생성 (inline)**
   - 원천 파일 읽기
   - 핵심 목표, 문제점, 해결 방향 추출
   - PRD 초안 작성 (같은 디렉토리에 `[원천파일명]-PRD.md` 생성)

   **Step 2: /ask-question 호출**
   - 생성된 PRD 초안 경로를 인자로 전달
   - 심층 질문을 통한 스펙 구체화

   **Step 3: architect 에이전트 호출**
   - Task 도구로 architect 서브에이전트 실행
   - 입력: 완성된 PRD 경로
   - 출력: Project-PRD.md, Issues 폴더

   **Step 4: --full 옵션 처리**
   - `--full` 포함 시:
     - architect 출력의 PARALLEL 블록 파싱
     - 병렬 가능 이슈들 동시 Task 실행
     - 순차 이슈들 순서대로 Task 실행
     - reviewer 에이전트 호출

   **Step 5: --no-linear 옵션 처리**
   - architect에 `--no-linear` 플래그 전달
   - Linear 연동 스킵

3. **옵션 테이블**
   | 옵션 | 설명 |
   |------|------|
   | (없음) | PRD + 질문 + 구조화까지 |
   | `--full` | 개발 + 리뷰까지 자동 |
   | `--no-linear` | Linear 연동 없이 로컬만 |

4. **PRD 초안 생성 템플릿 (inline)**
   ```markdown
   # [프로젝트명] PRD

   ## 개요
   [원천 파일에서 추출한 핵심 아이디어]

   ## 문제점
   - [식별된 문제 1]
   - [식별된 문제 2]

   ## 목표
   - [핵심 목표 1]
   - [핵심 목표 2]

   ## 해결 방향
   [대략적인 접근 방식]

   ## 범위
   ### 포함
   - [포함 항목]

   ### 제외
   - [제외 항목]

   ## 기술 고려사항
   [기술 스택, 제약사항 등]

   ---
   *이 PRD는 초안입니다. /ask-question을 통해 구체화됩니다.*
   ```

5. **진행 상황 출력**
   ```
   🔥 Forge Started
      Source: [원천파일]

   📝 Step 1: Generating PRD draft...
      ✅ Created [파일명]-PRD.md

   🎯 Step 2: Deep questioning...
      [/ask-question 진행]

   🏗️ Step 3: Structuring project...
      [architect 에이전트 실행]

   [--full 옵션 시]
   ⚡ Step 4: Parallel development...
      [병렬 개발 진행]

   🔍 Step 5: Code review...
      [reviewer 실행]

   ✨ Forge Complete!
   ```

**완료 조건:**
- [ ] frontmatter 작성 (description, arguments, allowed-tools)
- [ ] PRD 초안 생성 로직 구현
- [ ] /ask-question 호출 로직 구현
- [ ] architect 에이전트 호출 로직 구현
- [ ] --full 옵션 처리 (병렬 개발 + 리뷰)
- [ ] --no-linear 옵션 처리
- [ ] 진행 상황 출력 형식 정의

---

### Task 1-B: /wrap 커맨드 개발

- **범위**: `~/.claude/commands/wrap.md`
- **복잡도**: M (Medium)
- **설명**: 작업 마무리 및 Linear 동기화 커맨드

**구현 내용:**

1. **frontmatter 구조**
   ```yaml
   ---
   description: 작업 마무리 및 Linear 이슈 상태 동기화
   arguments:
     - name: project
       description: 프로젝트 경로 (기본값: 현재 디렉토리)
       required: false
   allowed-tools: Read, Bash, Glob, Grep
   ---
   ```

2. **실행 프로세스 구현**

   **Step 1: 프로젝트 폴더 탐색**
   - `Project-PRD.md` 파일 확인
   - `Issues/` 폴더 확인
   - 이슈 파일 목록 수집 (`ISSUE-*.md`)

   **Step 2: 이슈별 구현 상태 파악**
   - 각 이슈의 DEV.md 체크리스트 확인
   - 관련 파일 존재 여부 확인
   - 상태 분류: 완료 / 진행중 / 미시작

   **Step 3: Linear MCP 연동**
   - Linear 프로젝트 조회
   - 각 이슈 상태 업데이트
     - 완료 → Done
     - 진행중 → In Progress
     - 미시작 → Todo

   **Step 4: 구현 내용 코멘트 추가**
   - 완료된 이슈에 구현 요약 코멘트
   - 변경된 파일 목록 첨부

   **Step 5: 체크리스트 업데이트**
   - DEV.md 체크리스트 → Linear 이슈 체크리스트 동기화

3. **상태 판단 로직**
   ```
   완료 조건:
   - DEV.md의 모든 체크리스트 완료 ([x])
   - 관련 파일이 모두 존재

   진행중 조건:
   - 일부 체크리스트 완료
   - 또는 관련 파일 일부 존재

   미시작 조건:
   - 체크리스트 모두 미완료
   - 관련 파일 없음
   ```

4. **출력 형식**
   ```
   📦 Wrap: [프로젝트명]

   📊 Status Summary:
      ✅ Done: 3 issues
      🔄 In Progress: 2 issues
      ⏳ Todo: 1 issue

   🔄 Syncing to Linear...
      ISSUE-001: ✅ → Done
      ISSUE-002: ✅ → Done
      ISSUE-003: ✅ → Done
      ISSUE-004: 🔄 → In Progress
      ISSUE-005: 🔄 → In Progress
      ISSUE-006: ⏳ → Todo

   💬 Adding comments...
      ISSUE-001: Added implementation summary
      ISSUE-002: Added implementation summary
      ISSUE-003: Added implementation summary

   ✨ Wrap Complete!
   ```

**완료 조건:**
- [ ] frontmatter 작성
- [ ] 프로젝트 폴더 탐색 로직
- [ ] 이슈 상태 파악 로직
- [ ] Linear MCP 연동 로직
- [ ] 상태 업데이트 로직
- [ ] 코멘트 추가 로직
- [ ] 체크리스트 동기화 로직

<!-- PARALLEL_END -->

---

## Phase 2: architect 에이전트 개발

### Task 2-A: architect 에이전트 개발

- **범위**: `~/.claude/agents/architect.md`
- **복잡도**: L (Large)
- **의존성**: Phase 1 완료 불필요 (독립 개발 가능하나, /forge가 호출하므로 순차 배치)
- **설명**: PRD를 프로젝트 구조로 변환하고 Linear 이슈를 생성하는 에이전트

**구현 내용:**

1. **frontmatter 구조**
   ```yaml
   ---
   name: architect
   description: PRD를 분석하여 프로젝트 구조화, 이슈 분리, 병렬 분석, Linear 생성
   allowed-tools: Read, Write, Bash, Glob, Grep
   ---
   ```

2. **역할 정의**
   - PRD 문서를 분석하여 실행 가능한 프로젝트 구조로 변환
   - 작업을 마일스톤/이슈로 분리
   - 병렬 가능 구간 분석 및 마킹
   - Linear 프로젝트/이슈 생성

3. **실행 프로세스**

   **Step 1: PRD 파싱 및 분석**
   - PRD 문서 읽기
   - 핵심 목표, 요구사항, 기술 스택 추출
   - 작업 항목 식별

   **Step 2: 프로젝트 템플릿 생성**
   - Project Description 작성 (Linear Description용)
   - 출력: `Project-PRD.md`

   **Step 3: 마일스톤/이슈 분리**
   - 큰 작업 → 마일스톤
   - 작은 작업 → 이슈
   - 각 이슈에 예상 작업 범위 명시

   **Step 4: 병렬 가능 구간 분석**
   - 이슈 간 의존성 분석
   - 파일 충돌 가능성 분석
   - 병렬/순차 그룹 마킹

   **Step 5: DEV.md 생성**
   - 각 이슈별 `ISSUE-XXX-DEV.md` 생성
   - 수정 가능 파일 범위 (scope)
   - 구현 체크리스트
   - 참고 코드/패턴

   **Step 6: Linear 연동 (--no-linear 아닌 경우)**
   - Linear MCP로 프로젝트 생성
   - 이슈 생성 (템플릿 기반)
   - 마일스톤 설정

4. **병렬 분석 기준 (inline)**
   ```
   의존성 분석:
   - 이슈 A의 출력이 이슈 B의 입력 → 순차
   - 공통 모듈 먼저 필요 → 순차
   - 서로 독립적 → 병렬

   파일 충돌 분석:
   - 같은 파일 수정 → 순차
   - 다른 파일 수정 → 병렬
   - 새 파일만 생성 → 병렬
   ```

5. **템플릿들 (모두 inline으로 포함)**

   **Project Description 템플릿:**
   ```markdown
   # [프로젝트명]

   ## 0. 이슈 (Problem)
   [해결하려는 핵심 문제]

   ## 1. 목표 (Goal)
   ### 1.1 결과물
   ### 1.2 핵심 지표

   ## 2. 리스크

   ## 3. 가설 검증 계획

   ## 4. 산출물 점검 기준 (Done Definition)

   ## 5. 관련 링크 / 참고 자료
   ```

   **Issue 템플릿:**
   ```markdown
   ## [이슈명]

   **Start Date:** YYYY-MM-DD
   **Due Date:** YYYY-MM-DD
   **Estimate:** X hours
   **Status:** Todo | In Progress | Done
   **Member:** [담당자]

   ### To-do
   - [ ] 체크리스트 항목

   ### 구현 내용
   [구현 방향 설명]

   ### 관련 파일
   - `path/to/file`
   ```

   **DEV.md 템플릿:**
   ```markdown
   # [이슈명] - 개발 가이드

   ## 이슈 요약
   [1-2문장 요약]

   ## Scope (수정 가능 파일)
   **수정 가능:**
   - `path/to/file`

   **수정 불가:**
   - `path/to/other/*`

   ## 구현 단계
   ### 1단계: [제목]

   ## 체크리스트
   - [ ] 구현 항목

   ## 참고 코드/패턴

   ## 완료 기준
   ```

6. **출력 구조**
   ```
   /Project
   ├── Project-PRD.md
   └── /Issues
       ├── ISSUE-001.md
       ├── ISSUE-001-DEV.md
       ├── ISSUE-002.md
       ├── ISSUE-002-DEV.md
       └── ...
   ```

7. **병렬 마킹 형식**
   ```markdown
   ## 이슈 목록

   <!-- PARALLEL_START -->
   - ISSUE-001: 컴포넌트 A 구현
   - ISSUE-002: 컴포넌트 B 구현
   - ISSUE-003: API 엔드포인트 구현
   <!-- PARALLEL_END -->

   <!-- SEQUENTIAL -->
   - ISSUE-004: 통합 테스트 (위 3개 완료 후)
   <!-- SEQUENTIAL_END -->
   ```

**완료 조건:**
- [ ] frontmatter 작성 (name, description, allowed-tools)
- [ ] PRD 파싱 및 분석 로직
- [ ] Project Description 생성 로직 + 템플릿
- [ ] 마일스톤/이슈 분리 로직
- [ ] 병렬 가능 구간 분석 로직 + 기준
- [ ] DEV.md 생성 로직 + 템플릿
- [ ] Issue 템플릿
- [ ] Linear MCP 연동 로직
- [ ] 출력 구조 생성

---

## Phase 3: 통합 테스트

### Task 3-A: 통합 테스트

- **범위**: 전체 워크플로우
- **복잡도**: M (Medium)
- **의존성**: Task 1-A, 1-B, 2-A 완료 필요
- **설명**: 전체 워크플로우가 정상 동작하는지 검증

**테스트 시나리오:**

1. **기본 /forge 테스트**
   ```bash
   # 샘플 회의록으로 테스트
   /forge docs/sample-meeting.md
   ```
   - PRD 초안 생성 확인
   - /ask-question 호출 확인
   - architect 실행 및 출력 확인
   - Issues 폴더 생성 확인

2. **--no-linear 테스트**
   ```bash
   /forge docs/sample-meeting.md --no-linear
   ```
   - Linear 연동 없이 로컬 파일만 생성 확인

3. **--full 테스트**
   ```bash
   /forge docs/sample-meeting.md --full
   ```
   - 병렬 개발 실행 확인
   - reviewer 호출 확인
   - 전체 사이클 완료 확인

4. **/wrap 테스트**
   ```bash
   /wrap
   ```
   - 이슈 상태 파악 확인
   - Linear 동기화 확인

**완료 조건:**
- [ ] 기본 /forge 테스트 통과
- [ ] --no-linear 옵션 테스트 통과
- [ ] --full 옵션 테스트 통과
- [ ] /wrap 테스트 통과
- [ ] 병렬 이슈들이 실제로 동시 실행되어 시간 단축 확인

---

## 참고: 기존 커맨드/에이전트

### 재사용할 기존 컴포넌트

| 이름 | 유형 | 역할 | 호출 방식 |
|------|------|------|----------|
| `/ask-question` | 커맨드 | PRD 심층 질문 | /forge에서 직접 호출 |
| `reviewer` | 에이전트 | 코드 리뷰 | Task 도구로 호출 |

### 커맨드 파일 구조 참고

```markdown
---
description: [설명]
arguments:
  - name: [인자명]
    description: [설명]
    required: true/false
allowed-tools: [도구 목록]
---

# 커맨드 제목

## 사용법
...

## 실행 프로세스
...
```

### 에이전트 파일 구조 참고

```markdown
---
name: [에이전트명]
description: [설명]
allowed-tools: [도구 목록]
---

# 역할

## Process
...

## Output Format
...
```

---

## 완료 기준 (전체)

1. `/forge [파일]` 실행 시 PRD → 질문 → 구조화 완료
2. `--full` 옵션 시 개발 + 리뷰까지 자동 실행
3. Linear에 프로젝트/이슈 정상 생성
4. `/wrap` 실행 시 Linear 상태 동기화 완료
5. 병렬 가능 이슈들이 동시 실행되어 시간 단축
