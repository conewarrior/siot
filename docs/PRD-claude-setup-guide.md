# PRD: /setup - Claude Code 초기 세팅 커맨드

## 1. 개요

### 배경
팀원들이 새 프로젝트를 시작하거나 Claude Code를 처음 사용할 때, 디자인 시스템과 개발 가이드를 일일이 설정해야 하는 번거로움이 있다. 특히 비기획 직군(개발자 포함)은 기획/디자인 관련 설정에 익숙하지 않아 일관성 없는 환경이 만들어지기 쉽다.

### 문제 정의
- 팀마다, 사람마다 다른 CLAUDE.md 설정
- 디자인 시스템 토큰/컴포넌트 참조 방법 모름
- 폴더 구조, 네이밍 컨벤션 불일치
- 매번 수동 설정 → 시간 낭비 + 실수 발생
- 새로 만든 컴포넌트가 공유되지 않음

### 해결 방안
**단일 커맨드(`/setup`)로 일관된 개발 환경 자동 구성**

---

## 2. 목표

### 핵심 목표
1. `/setup` 한 번으로 Claude Code 개발 환경 완성
2. 팀 전체가 동일한 디자인 시스템과 개발 규칙 사용
3. 새 컴포넌트가 자동으로 공유되는 워크플로우

### 성공 지표
- 신규 팀원이 프로젝트 시작까지 걸리는 시간 단축
- CLAUDE.md 일관성 확보 (팀 내 동일한 규칙)
- 디자인 토큰 사용률 증가
- 공용 컴포넌트 재사용률 증가

---

## 3. 타겟 사용자

### 주요 대상
- **개발자**: 기획 경험 없이 코드만 쓰던 개발자
- **비개발 직군**: 디자이너, PM, 마케터 등 Claude Code 입문자

### 사용자 페르소나
> "디자인 시스템이 있다는 건 알지만, 어디서 어떻게 가져다 쓰는지 모르겠다.
> 매번 선임한테 물어보기도 눈치 보인다."

### 사용 시나리오
- 각자가 새 프로젝트/브랜치에서 `/setup` 실행
- 컴포넌트 개발 시 자동으로 공용 저장소에 등록됨

---

## 4. 핵심 내용 (Scope)

### 포함할 내용
1. **CLAUDE.md 기본 템플릿 생성** (기존 /init-claude 기능 포함)
2. **디자인 시스템 연결 설정**
   - 토큰 CDN (jsDelivr) 참조 설정
   - 컴포넌트 npm 패키지 자동 설치 (`npm install @회사/ui`)
3. **CLAUDE.md에 추가되는 규칙**
   - 디자인 시스템 규칙 (토큰 사용법, 컴포넌트 작성 규칙)
   - 폴더 구조 + 네이밍 컨벤션
   - 컴포넌트 자동 등록 규칙

### 제외할 내용
- CI/CD 설정
- 테스트 환경 구성
- Node.js/npm 설치 안내 (이미 설치됨 가정)

---

## 5. 선행 작업 (필수)

`/setup` 커맨드가 동작하려면 아래 작업이 먼저 완료되어야 함.

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

### 2. tokens.css 초기 정의

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-foreground: #ffffff;
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
}

.dark {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
}
```

### 3. GitHub Actions 설정

push 시 자동 npm 배포 워크플로우 구성
- 무료 (public 저장소 무제한, private도 월 2,000분)

### 4. 팀원 권한 설정

- design-system 저장소 write 권한
- npm 배포 토큰 (GitHub Secrets에 등록)

---

## 6. 기술 결정 사항

### 의사결정 기록

#### Q1. 디자인 토큰 관리 방식?
**결정: Tailwind + CSS Variables 조합 (shadcn/ui 스타일)**

| 고려한 옵션 | 선택 여부 | 이유 |
|------------|---------|------|
| 순수 Tailwind config | X | 런타임 변경 불가 |
| 순수 CSS Variables | X | Tailwind 생태계 활용 어려움 |
| **Tailwind + CSS Vars** | **O** | 두 장점 모두 취함, shadcn이 검증 |

#### Q2. 토큰과 컴포넌트 배포 방식?
**결정: 토큰 CDN + 컴포넌트 npm 패키지**

| 구분 | 배포 방식 | 이유 |
|------|----------|------|
| **토큰** | jsDelivr CDN | 색상/간격 변경 시 **즉시 반영** 필요 |
| **컴포넌트** | npm 패키지 | API 변경 가능성 있어 **버전 관리** 필요 |

- **토큰**: GitHub에 push → jsDelivr CDN 자동 반영
- **컴포넌트**: GitHub에 push → GitHub Actions → npm 자동 배포

#### Q3. 폴더 구조?
**결정: Next.js App Router 기본 구조**

| 고려한 옵션 | 선택 여부 | 이유 |
|------------|---------|------|
| Feature-based | X | 초기 설계 복잡, 비개발자에게 어려움 |
| **Next.js 기본** | **O** | 공식 문서와 일치, 진입장벽 낮음 |

#### Q4. 새 컴포넌트 공유 방식?
**결정: Claude가 자동으로 design-system 저장소에 push**

| 고려한 옵션 | 선택 여부 | 이유 |
|------------|---------|------|
| 매번 물어보기 | X | 번거로움, 피로감 |
| **자동 등록** | **O** | 마찰 없음, 안 쓰면 import 안 하면 됨 |

---

## 7. /setup 커맨드 동작

### 실행 순서
```
1. CLAUDE.md 기본 템플릿 생성 (/init-claude 내용)
2. --design 옵션 시:
   - CLAUDE.md에 DS 규칙 추가
   - globals.css에 토큰 CDN import 설정
   - npm install @회사/ui 실행
3. 완료 메시지 및 다음 단계 안내
```

### CLAUDE.md에 추가될 내용

```markdown
## 디자인 시스템

### 토큰 참조
- CSS Variables로 정의된 토큰 사용
- 직접 색상값/크기값 하드코딩 금지
- 예: `bg-primary` (O), `bg-[#3b82f6]` (X)

### 컴포넌트 규칙
- @회사/ui 패키지의 컴포넌트 우선 사용
- 새 컴포넌트는 기존 토큰 기반으로 작성
- 컴포넌트 위치: src/components/ui/

### 컴포넌트 자동 등록

새 컴포넌트(src/components/ui/) 생성 완료 시:
1. design-system 저장소 pull
2. components/{컴포넌트명}/ 에 복사
3. git commit & push 자동 실행

**규칙:**
- 물어보지 않고 자동 등록
- 중복 컴포넌트는 기존 것과 비교 후 병합 또는 업데이트
- 파일 구조: index.tsx, types.ts, {Name}.stories.tsx

### 폴더 구조
```
src/
├── app/          # Next.js App Router 페이지
├── components/   # 공유 컴포넌트
│   └── ui/       # 기본 UI 컴포넌트
├── lib/          # 유틸리티 함수
└── styles/       # 전역 스타일
```

### 네이밍 컨벤션
- 컴포넌트: PascalCase (Button.tsx)
- 파일: kebab-case (user-profile.ts)
- CSS 클래스: Tailwind 유틸리티 사용
```

---

## 8. 전체 시스템 구조

```
┌─────────────────────────────────────────────────────────────┐
│                 GitHub: design-system 저장소                 │
│                       (단일 소스)                            │
│                                                             │
│   tokens.css ──────────────────── components/               │
│       │                               │                     │
└───────┼───────────────────────────────┼─────────────────────┘
        │                               │
        ▼                               ▼
   jsDelivr CDN                  GitHub Actions
   (즉시 반영)                    (자동 npm 배포)
        │                               │
        │                               ▼
        │                         @회사/ui
        │                          (npm)
        │                               │
        ▼                               ▼
┌─────────────────────────────────────────────────────────────┐
│                        각 프로젝트                           │
│                                                             │
│   globals.css                    package.json               │
│   └── @import url(CDN)           └── @회사/ui               │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  새 컴포넌트 생성 시                                  │   │
│   │  → Claude가 자동으로 design-system에 push            │   │
│   │  → GitHub Actions가 npm 재배포                       │   │
│   │  → 다른 프로젝트에서 npm update로 사용               │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. 기술 스펙

### 기술 스택
- **프레임워크**: Next.js (App Router)
- **스타일링**: Tailwind CSS + CSS Variables
- **컴포넌트 기반**: shadcn/ui 패턴
- **토큰 배포**: jsDelivr (GitHub 연동)
- **컴포넌트 배포**: npm (GitHub Actions 자동화)

### 필요한 파일

| 파일 | 용도 |
|------|------|
| `~/.claude/commands/setup.md` | /setup 커맨드 정의 (템플릿 inline 포함) |

**설계 결정:** setup.md 파일 하나에 모든 템플릿을 inline으로 포함. 별도 templates/ 폴더 없이 단일 파일로 배포 가능.

---

## 10. 전제 조건

### 필수 환경
- Claude Code 설치됨
- Node.js/npm 설치됨
- **design-system 저장소 구축 완료** (선행 작업 참조)
- **팀원 GitHub 권한 설정 완료**

---

## 11. 배포 계획

### 산출물
- [x] PRD 문서 (현재 문서)
- [ ] design-system 저장소 생성
- [ ] GitHub Actions 워크플로우
- [ ] /setup 커맨드 구현
- [ ] 블로그 포스트 (구축 과정 + 사용법)

### 진행 순서
1. design-system 저장소 생성 및 초기 토큰 정의
2. GitHub Actions npm 배포 설정
3. /setup 커맨드 구현
4. 팀원 권한 설정 및 테스트
5. 블로그 작성

---

## 부록: 주요 논의 사항

### 토큰과 컴포넌트 분리 이유
> "컴포넌트도 디자인 시스템의 일부인데 왜 따로 관리하나?"

컴포넌트가 토큰을 **CSS 변수로 참조**하기 때문에 가능한 구조:
```tsx
// Button 컴포넌트 (npm으로 설치됨)
<button className="bg-primary text-primary-foreground">
// bg-primary → var(--color-primary) → CDN에서 가져온 값
```
토큰값이 CDN에서 바뀌면 → 컴포넌트 업데이트 없이 색상 변경됨.

### 자동 등록 vs 물어보기
> "새 컴포넌트 만들 때마다 '공유할까요?' 물어보는 게 좋지 않나?"

번거로움이 쌓이면 결국 안 쓰게 됨. 규칙이 명확하면 자동으로 등록하고, 안 쓰고 싶으면 import 안 하면 되는 구조가 더 실용적.

### CDN URL 구조
```
https://cdn.jsdelivr.net/gh/{org}/design-system/tokens.css
```
- GitHub에 푸시하면 자동으로 CDN에 반영됨
- 버전 지정 가능: `@v1.0.0`, `@main`, `@{commit}`
