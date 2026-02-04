# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working on the design-workflow project.

## 프로젝트 개요

AX 조직을 위한 디자인 워크플로우 구축 프로젝트. `/setup-design` 커맨드와 디자인 시스템 저장소를 통해 LLM 기반 UI 생성의 일관성을 확보한다.

## 작업 저장소

| 저장소 | 위치 | 용도 |
|--------|------|------|
| design-system | `/Users/hskim/dev/design-system/` | 토큰, 컴포넌트, 규칙 |
| siot (현재) | `/Users/hskim/dev/siot/` | 문서, 이슈 파일 |

## 이슈 작업 흐름

### 작업 시작
```
EDU-5229 작업해줘
```

1. Linear에서 이슈 조회 (`mcp__plugin_linear_linear__get_issue`)
2. `docs/design-workflow/issues/EDU-XXXX-*.md` 읽기
3. 해당 저장소에서 실제 작업 수행
4. 이슈 파일 업데이트 (체크리스트 완료, 작업 로그)
5. Linear 이슈 업데이트 (아래 규칙 참고)

### Linear 이슈 업데이트 규칙

**작업 완료 시:**
1. Linear 이슈 description의 체크리스트 `[x]` 완료 처리
2. 작업 결과 요약을 **코멘트**로 남기기
3. **상태(Done) 변경은 하지 않음** → 사용자가 직접 확인 후 변경

**코멘트 형식:**
```
## 작업 완료

- [x] 완료 항목 1
- [x] 완료 항목 2

**커밋**: [해시](GitHub 링크)
**다음 이슈**: EDU-XXXX (간단 설명)
```

## design-system 저장소 규칙

### 운영 원칙

| 파일 | 배포 방식 | 업데이트 반영 |
|------|-----------|---------------|
| `tokens.css` | CDN (jsDelivr) | 즉시 반영 |
| `components/` | npm 패키지 | 버전 업데이트 후 설치 |
| `design-rules.md` | CDN + 로컬 복사 | CDN 최신 + 로컬 커스텀 병행 |

### 명령어

```bash
cd /Users/hskim/dev/design-system
npm install          # 의존성 설치
npm run build        # TypeScript 컴파일 (dist/ 생성)
```

### 토큰 규칙

- CSS 변수는 `:root`에 정의
- 다크모드는 `.dark` 클래스로 오버라이드
- 네이밍: `--{category}-{name}` (예: `--color-primary`, `--spacing-md`)

### 컴포넌트 추가

1. `components/{ComponentName}/` 폴더 생성
2. `index.ts`에서 export 추가
3. main 브랜치 push → GitHub Actions가 npm 자동 배포

## 관련 링크

- [Linear 프로젝트](https://linear.app/geniefy/project/ax-조직을-위한-디자인-워크플로우-구축-7911e033ac99)
- [프로젝트 문서](./project.md)
- CDN: `https://cdn.jsdelivr.net/gh/geniefy/design-system/tokens.css`
