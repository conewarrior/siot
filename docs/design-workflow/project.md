# AX 조직을 위한 디자인 워크플로우 구축

- **Linear**: https://linear.app/geniefy/project/ax-조직을-위한-디자인-워크플로우-구축-7911e033ac99
- **기간**: 2026-01-15 ~ 2026-01-30
- **담당**: 김한솔

## 0. 이슈 (Problem)

> 바이브코딩 환경에서 LLM이 UI를 생성할 때 프로젝트/사람/프롬프트마다 다른 스타일로 결과가 나오며,
> "예쁜 버튼" 같은 표현이 매번 다르게 해석되어 디자인 일관성과 품질이 붕괴한다.

- 디자인 기준이 명시되어 있지 않아 팀 내 결과물이 사람마다 달라짐
- 토큰/컴포넌트/규칙이 프로젝트별로 수동 세팅이라 반복 비용이 큼
- 빠른 생성이 중요한 1인 1프로덕트 환경에서 자유도가 높을수록 불안정해짐

## 1. 목표 (Goal)

### 1.1 결과물

1. **`/setup-design` 커맨드 실행 한 번으로 아래 자동 세팅**
   - `design-rules.md` 로컬 복사 (CDN에서 다운로드)
   - `CLAUDE.md`에 규칙 참조 추가
   - `globals.css`에 토큰 CDN import 추가
   - `@회사/ui` npm 패키지 설치
   - `settings.local.json`에 hook 설정 추가 (`src/components/` 감지)

2. **단일 소스 디자인 시스템 저장소** (GitHub: `design-system`)
   - `tokens.css` (토큰)
   - `components/` (공용 컴포넌트)
   - `design-rules.md` (LLM 제약 규칙 + Generation Protocol)

3. **UI 생성 skill**
   - `src/components/` 변경 감지 → `design-rules.md` 기반으로 UI 생성 + 프로토콜 검증 (위반 시 거부)

### 1.2 핵심 지표

- **핵심 지표**: `src/components/`에서 생성되는 UI가 design-rules 제약을 위반하지 않는 비율 ≥ 95%
- (보조) 신규 프로젝트에서 `/setup-design`로 초기 세팅 완료까지 소요 시간 ≤ 10분
- (보조) 팀원 8명 중 실제 사용 인원 ≥ 6명 및 체감 만족도 평가 ≥ 상

## 2. 리스크

### 2-1: md만으로 디자인 품질이 보장되지 않을 수 있음
→ **가설**: 한솔(LLM 제약 언어/프로토콜) + 수민(레퍼런스 기반 토큰/컴포넌트) 두 트랙을 병렬로 검증하면, "규칙만 빡세고 못생긴 UI" 또는 "예쁘지만 일관성 없음" 중 하나로 쏠리는 문제를 줄일 수 있다.

### 2-2: LLM이 규칙을 "알면서도" 어김
→ **가설**: `design-rules.md`를 "가이드"가 아니라 제약 언어 + Generation Protocol로 설계하고, 검증 단계에서 위반 시 출력 거부를 강제하면 준수율이 올라간다.

### 2-3: CDN 토큰 변경이 기존 프로젝트 UI를 깨뜨릴 수 있음
→ **가설**: 토큰은 "값만 변경"되는 구조로 제한하고, 롤백 전략을 마련하면 안전하게 즉시 반영 모델을 유지할 수 있다.

### 2-4: `design-rules.md`가 업데이트 없이 죽은 문서가 됨
→ **가설**: 규칙 위반 사례를 수집해서 정기 업데이트 루프를 만들면, 문서가 운영 가능한 "단일 소스"로 유지된다.

## 3. 가설 검증 계획

### 3.1 투트랙으로 LLM 기반의 문서 제약과 시각 레퍼런스로 디자인 구현 완성도 체크하기

**한솔 (기술 인프라 + 규칙)**
- npm 패키지 인프라 구축 (구조 + GitHub Actions 자동 배포)
- `/setup-design` 커맨드 구현
- UI 생성 skill 개발 (hook 트리거 → 규칙 읽기 → 생성 → 프로토콜 검증)
- `design-rules.md` 초안 작성 (제약 언어 + Generation Protocol)

**수민 (디자인 시스템 콘텐츠)**
- 코드 기반 디자인 시스템 레퍼런스 조사
- `tokens.css` 토큰값 정의 (색상/간격/radius 등)
- 공용 컴포넌트 설계 및 작성

### 3.2 통합 및 배포
- 통합 테스트 (신규 프로젝트에 적용)
- 팀 배포 + 사용성/위반 사례 수집

### 3.3 검증
- 샘플 UI 생성 과제 10개를 정의하고 (예: 로그인/대시보드/설정), 각 과제당
  - 규칙 위반 여부 체크리스트 자동/반자동 검증
  - 위반 시 "거부 → 수정" 루프가 정상 작동하는지 확인
- 결과물: 규칙 준수율(핵심 지표) 측정 + 사용자 만족도 평가

## 4. 산출물 점검 기준 (Done Definition)

- [ ] 신규 프로젝트에서 `/setup-design` 한 번으로 세팅 완료됨
- [ ] 디자인 시스템과 UI 패키지가 정상 연동됨
- [ ] `CLAUDE.md`가 자동 생성되고 팀 규칙을 반영함
- [ ] 팀 내부에서 실제 사용 가능하다고 판단됨

## 5. 관련 링크 / 참고 자료

- https://designsystems.surf/design-systems
- PRD: `docs/PRD-claude-setup-guide.md`
- design-system 저장소: `/Users/hskim/dev/design-system/`

---

## 6. 마일스톤 & 이슈 일정

### Milestone 1: Design-system 저장소 기반 구축 (01-19 ~ 01-22)

| ID | 이슈명 | Due | Est | Status |
|----|--------|-----|-----|--------|
| EDU-5229 | design-system 저장소 구조 확정 및 스캐폴딩 | 01-19 | 4h | ✅ Done |
| EDU-5230 | tokens.css v0 정의 (색상/간격/라디우스) | 01-20 | 8h | 🔲 Todo |
| EDU-5231 | design-rules.md v1 작성 (제약 언어 + Generation Protocol) | 01-21 | 8h | 🔲 Todo |
| EDU-5232 | 공용 컴포넌트 v0 구현 (Button + 1개) | 01-22 | 8h | 🔲 Todo |

### Milestone 2: /Setup-design 커맨드 구현 + UI 생성 skill (01-19 ~ 01-26)

| ID | 이슈명 | Due | Est | Status |
|----|--------|-----|-----|--------|
| EDU-5233 | /setup-design 동작 명세 확정 (5단계 + 재실행 정책) | 01-19 | 2h | 🔄 In Progress |
| EDU-5234 | /setup-design 구현 (규칙 복사 + CLAUDE 참조 + 토큰 CDN) | 01-22 | 8h | 🔲 Todo |
| EDU-5235 | /setup-design 구현 (UI 패키지 설치 + hook 설정) | 01-23 | 4h | 🔲 Todo |
| EDU-5236 | UI 생성 Skill MVP (규칙 기반 생성 + 검증/거부 루프) | 01-26 | 16h | 🔲 Todo |

### Milestone 3: 통합 테스트 + 팀 배포 + 측정 및 개선 (01-27 ~ 01-30)

| ID | 이슈명 | Due | Est | Status |
|----|--------|-----|-----|--------|
| EDU-5237 | 통합 테스트 (신규 1 + 기존 1) E2E 검증 | 01-27 | 8h | 🔲 Todo |
| EDU-5238 | 평가 과제 10개 + 체크리스트로 준수율 측정 체계 | 01-28 | 8h | 🔲 Todo |
| EDU-5239 | 팀 배포 + 위반 사례/피드백 수집 | 01-29 | 8h | 🔲 Todo |
| EDU-5240 | 준수율 리포트 작성 + Top 3 개선 이슈 생성 | 01-30 | 4h | 🔲 Todo |

---

## 7. Claude에게 작업 요청하는 방법

### 이슈 작업 시작
```
EDU-5229 작업해줘
```

Claude가 할 일:
1. `docs/design-workflow/issues/EDU-5229-scaffolding.md` 읽기
2. To-do에 따라 `/Users/hskim/dev/design-system/` 에서 실제 작업 수행
3. 완료 후 이슈 파일 업데이트 (체크리스트 완료, 작업 로그 기록)
4. **Linear 이슈 업데이트** (아래 규칙 참고)

### Linear 이슈 업데이트 규칙

**작업 완료 시:**
1. Linear 이슈 description의 체크리스트 `[x]` 완료 처리
2. 작업 결과 요약을 **코멘트**로 남기기
3. **상태(Done) 변경은 하지 않음** → 사용자가 직접 확인 후 변경

**코멘트 예시:**
```
## 작업 완료

- [x] tokens.css 구조 생성
- [x] README 운영 원칙 기재
- [x] 각 파일 단일 소스 역할 명시

**커밋**: 8d57e18
**다음 이슈**: EDU-5230 (토큰 값 정의)
```

### 이슈 파일 생성 (아직 없는 경우)
```
EDU-5230 이슈 파일 만들어줘
```

Claude가 할 일:
1. Linear에서 이슈 상세 조회 (`mcp__linear__get_issue`)
2. `docs/design-workflow/issues/EDU-5230-tokens.md` 생성
3. To-do, 작업 대상 파일, 검증 기준 포함

### 작업 범위 확인
```
EDU-5229 작업 범위가 뭐야?
```

Claude가 할 일:
1. 이슈 파일에서 "작업 대상 파일" 섹션 확인
2. 해당 파일들만 수정 (다른 파일 건드리지 않음)

---

## 8. 작업 저장소 정보

### design-system 저장소
- **위치**: `/Users/hskim/dev/design-system/`
- **패키지명**: `@geniefy/ui`
- **배포**: GitHub Actions → npm 자동 배포
- **CDN**: `https://cdn.jsdelivr.net/gh/geniefy/design-system/`

### 현재 저장소 구조
```
design-system/
├── package.json        # @geniefy/ui
├── tokens.css          # 토큰 정의 (CDN 배포)
├── design-rules.md     # LLM 제약 규칙 (CDN 배포)
├── components/         # 공용 컴포넌트 (npm 배포)
├── CLAUDE.md           # 저장소 가이드
└── .github/workflows/  # 자동 배포
```

### 토큰값 결정 보류
- 현재: 스캐폴딩만 완료 (placeholder)
- 추후: 디자인 시스템 레퍼런스 리서치 후 실제 값 채우기
- 참고할 시스템: Tailwind, shadcn/ui, GOV.UK, GitHub Primer
