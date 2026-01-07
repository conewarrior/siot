# siot 포트폴리오 - 개발 로그

Claude Code와 함께 진행한 개발 작업 기록입니다.

---

## 2025-12-31 (Day 1)

### 1. SSH 키 설정 및 GitHub 연동

```
private 저장소인데 접근 권한을 주면 될 거 같은데, 접근권한은 어떻게 줄 수 있어?
```

**Claude 작업:**
- SSH 키가 다른 계정(hskim-a11y)에 연결되어 있는 문제 발견
- GitHub에서 기존 키 삭제 후 conewarrior 계정에 재등록 안내
- `ssh-add` 명령어로 키 등록 확인

### 2. Claude Code 스킬 설치 시도

```
/install-skill canvas-design
```

**Claude 작업:**
- GitHub 저장소 conewarrior/claude-toolkit에서 스킬 다운로드 시도
- 저장소가 존재하지 않아 실패
- 향후 스킬 관리 시스템 구축의 필요성 확인

---

## 2026-01-02 (Day 2)

### 3. Git Pull 및 프로젝트 설정

```
깃 풀해줘
로컬 파일 삭제하고 다시 pull 해줘
```

**Claude 작업:**
- Untracked working tree 충돌 문제 해결
- `.claude/skills/doc-coauthoring/SKILL.md` 삭제 후 pull 완료

### 4. 포트폴리오 사이트 개발 서버 실행

```
페이지 브라우저에 띄워줘
```

**Claude 작업:**
- `npm install` 실행
- `npm run dev` 실행 (포트 3006에서 시작)
- 브라우저에서 `http://localhost:3006` 열기

### 5. 한글화 및 폰트 변경

```
한글로 전부 바꿔줘. 폰트는 pretendard로
```

**Claude 작업:**
- `src/app/layout.tsx` - Pretendard 폰트 CDN 추가
- `src/app/page.tsx` - 히어로 섹션, 글 목록 등 한글화
- `src/components/header.tsx` - 네비게이션 한글화
- `src/app/about/page.tsx` - 소개 페이지 한글화
- `src/app/blog/page.tsx` - 블로그 목록 한글화
- `src/app/projects/page.tsx` - 프로젝트 페이지 한글화

### 6. Phase 3: SEO & 최적화

```
roadmap.md 읽어보고 phase3부터 진행해줘
```

**Claude 작업:**
- SEO 메타데이터 설정 (generateMetadata)
- OG 이미지 생성 (`opengraph-image.tsx`)
- 404 페이지 생성
- Loading 상태 컴포넌트 추가 (Suspense)
- `next/image` 최적화
- 폰트 CDN preconnect 추가

**에러 해결:**
- Edge Runtime에서 Node.js 모듈 사용 문제 → `runtime = "nodejs"` 변경
- React 19 + next-mdx-remote useState 오류 → `next-mdx-remote/rsc`로 전환

### 7. Phase 4: Vercel 배포

```
phase4 진행해줘
siot으로 해줘 도메인
커밋하고 배포해줘
siot-portfolio로 해줘
```

**Claude 작업:**
- `@vercel/analytics`, `@vercel/speed-insights` 설치
- siteConfig 설정 (name: siot, author: siot)
- Vercel 배포 실행 (`vercel --prod --yes`)
- siot.vercel.app은 이미 사용 중 → siot-portfolio.vercel.app으로 설정
- `src/app/layout.tsx` URL 업데이트

**배포 완료:** https://siot-portfolio.vercel.app

### 8. 헤더 로고 애니메이션

```
지금 로고 있는 부분을 현재 히어로 섹션에 있는 "make it ****" 문구와 애니메이션 넣어줄 수 있어?
```

**Claude 작업:**
- `src/components/header.tsx` - TextRotate 애니메이션 추가
- "siot" → "make it [pop/snappy/flow/simple/click/right]" 로테이션

### 9. 히어로 섹션 Typewriter 애니메이션

```
히어로 섹션 문구랑 애니메이션 중복되니까 아래 코드로 디자인 변경해줘
```

**Claude 작업:**
- `src/components/typewriter.tsx` 생성
- `src/components/hero-section.tsx` - Typewriter 컴포넌트로 교체
- 한글 문구 추가: "디자인은 문제 해결이다", "코드는 생각의 확장이다", "좋은 제품은 감정을 움직인다"

### 10. 로고 개인화

```
hansol makes it **** 이렇게 바꾸면 내 이름도 알릴 수 있고 make sense하니까 괜찮을 거 같지 않아?
```

**Claude 작업:**
- `src/components/header.tsx` - "make it" → "hansol makes it"로 변경
- 폰트 사이즈 text-xl → text-lg로 조정

### 11. 호버 언더라인 애니메이션 변경

```
현재 글 목록 호버했을 때 애니메이션 내가 아래에 붙여준 코드로 바꿔줘
```

**Claude 작업:**
- 4개 파일의 hover 애니메이션 업데이트:
  - `src/app/page.tsx`
  - `src/app/blog/page.tsx`
  - `src/app/projects/page.tsx`
  - `src/app/about/page.tsx`
- width 기반 → scale-x transform 애니메이션으로 변경

---

## 2026-01-03 (Day 3)

### 12. 다크모드 디버깅

```
다크모드 버튼은 있는데 적용이 안되는 거 같은데?
타이틀 정도나 색이 바뀌지 배경이랑 본문 내용은 하나도 안바뀌는데?
```

**Claude 작업:**
- 디자인 시스템 문서 작성
- `globals.css`에 다크모드 CSS 변수 추가
- 컴포넌트별 다크모드 스타일 적용

### 13. 메뉴 호버 스타일 개선

```
메뉴 호버 더 진하게 해주고, 글목록에 언더라인 애니메이션만 있어야지 왜 호버시 배경색이 변하냐
```

**Claude 작업:**
- 메뉴 호버 시 배경색 변경 제거
- 다크모드 메뉴 호버 색상 조정 (더 밝은 흰색으로)

### 14. 다크모드 셀렉트 상태 개선

```
다크모드 셀렉트도 더 눈에 띄게 바꿔줘
```

**Claude 작업:**
- 선택된 메뉴 항목의 다크모드 배경색 강화

---

## 2026-01-07 (Day 4)

### 15. jsDelivr CDN 이미지 업로드 자동화

```
내가 여기 contents에 이미지를 넣으면... 자동으로 특정 사이트나 깃허브에 업로드해서 링크만 받아와서 쓸 수 있게 자동으로 바꿔주는 방법이 있을까?
유료야 무료야?
응 jsDelivr로 수정해줘
```

**Claude 작업:**
- `scripts/upload-images.mjs` 생성
- MDX 파일 스캔 → 로컬 이미지 발견 → GitHub images 브랜치 업로드 → jsDelivr CDN URL로 변환
- `package.json`에 `upload-images`, `upload-images:dry` 스크립트 추가

### 16. 블로그 작성 톤 변경

```
근데 기본적으로 음... 말투가 좀 ㅈ같은 거 같아. ~다. 이런 식으로 끝내도록 커맨드좀 바꿔줘라
```

**Claude 작업:**
- `.claude/skills/blog-writer/SKILL.md` 톤 가이드라인 수정
- 해요체 → 평서체 (~했다)로 변경
- 기존 블로그 글도 평서체로 변환

### 17. jsDelivr CDN 블로그 글 작성

```
지금 cdn으로 만든 거 내가 /write-blog 커맨드 써서 블로그 글로 만들 수 있어?
```

**Claude 작업:**
- `docs/content/blog/jsdelivr-cdn-image-upload.mdx` 생성
- jsDelivr CDN 활용 경험을 블로그 글로 정리

### 18. CLAUDE.md 업데이트

```
/init
```

**Claude 작업:**
- `CLAUDE.md` 전체 업데이트
- 이미지 업로드 스크립트, 블로그 작성 가이드, CDN 정보, 배포 URL 추가

### 19. publish-command/skill 전역 지원

```
publish-command나 skill의 경우 해당 프로젝트에 있는 경우만 퍼블리시되게끔 되어있어... 전역을 확인해서 해당 파일을 퍼블리시하라는 지침을 만들어줄 수 있어?
```

**Claude 작업:**
- `~/.claude/commands/publish-command.md` 수정 - 전역 폴더 fallback 추가
- `~/.claude/commands/publish-skill.md` 수정 - 전역 폴더 fallback 추가
- `github-api-claude-commands.mdx` 블로그에 해당 내용 추가

### 20. 날짜 오류 수정

```
음 너 있잖아. 어떻게 어제 오늘 올린 걸 2025년으로 해서 올리냐. 올해는 2026년인데 말이지
```

**Claude 작업:**
- `blog-writer/SKILL.md` 예시 날짜 2025 → 2026으로 수정
- `github-api-claude-commands.mdx` 날짜 수정
- `jsdelivr-cdn-image-upload.mdx` 날짜 수정

### 21. MDX 테이블 렌더링 수정

```
지금 | | 마켓플레이스 | 개인 GitHub 저장소 | 이런식의 표현들이 블로그에서는 테이블형식으로 구현이 안되고 있거든?
```

**Claude 작업:**
- `remark-gfm` 설치
- `src/components/mdx-content.tsx`에 remarkPlugins 추가

### 22. Pre-commit Hook 및 블로그 폴더 구조 변경

```
pre-commit hook으로 자동화해줘. 근데 로컬이미지 경로를 한곳으로 모아두지 않으면 나중에 경로가 바뀌었을 때 되게 고생할 거 같은데
```

**Claude 작업:**
- `.git/hooks/pre-commit` 생성 - 커밋 시 자동 이미지 업로드
- `blog-writer/SKILL.md` 수정 - 폴더 구조로 변경 (`blog/slug/index.mdx` + `images/`)
- `src/lib/mdx.ts` 수정 - 파일/폴더 둘 다 지원

### 23. blog-writer 스킬 마켓플레이스 등록

```
/publish-skill blog-writer
```

**Claude 작업:**
- `.claude-plugin/plugin.json` 생성
- GitHub `conewarrior/siot-claude-toolkit`에 업로드
- `marketplace.json`에 등록

### 24. Dev Cycle 설정 설치

```
지금 내가 desktop에 claude-code-dev-cycle-setup.md를 넣어놨거든. 이걸 읽으면 agent랑 command를 설치하라고 되어있을 거야
```

**Claude 작업:**
- `prd-to-dev`, `codify`, `reviewer` 에이전트 설치
- `dev-cycle`, `parallel-dev` 커맨드 설치
- `.claude/skills/` 폴더 정리

### 25. global-plugin 커맨드 수정

```
blog-writer prd-to-dev codify reviewer frontend-design
아니 잠깐만 agents도 있는데 왜 이렇게 되는 거야...
global-plugin 수정해줘
```

**Claude 작업:**
- `~/.claude/commands/global-plugin.md` 수정
- commands → `~/.claude/commands/`
- agents → `~/.claude/agents/`
- skills → `~/.claude/skills/`
- 각 타입별 올바른 폴더로 복사하도록 지침 추가

---

## 커밋 히스토리

| 날짜 | 커밋 | 설명 |
|------|------|------|
| 01/07 | `049b8ee` | chore: .claude/skills 폴더 정리 및 포트폴리오 업데이트 |
| 01/07 | `8bd005e` | docs: github-api-claude-commands 블로그 포스트 업데이트 - 전역 커맨드 퍼블리시 섹션 추가 |
| 01/07 | `8aa9a9f` | docs: CLAUDE.md 업데이트 - 이미지 업로드 스크립트, 블로그 작성 가이드, CDN 정보, 배포 URL 추가 |
| 01/07 | `2ffc4b8` | feat: jsDelivr CDN 이미지 업로드 스크립트 및 블로그 글 추가 |
| 01/02 | `05ea469` | feat: 다크모드 지원 및 UI 개선 - 테마 토글, 새로운 블로그 포스트 추가 |
| 01/02 | `a84e593` | Update site URL to siot-portfolio.vercel.app |
| 01/02 | `96d978a` | Add deployment setup with Vercel Analytics |
| 01/02 | `23256a7` | chore: 날짜 통일 - 2024/2025년에서 2026년 1월 2일로 업데이트 |
| 01/02 | `2f02ca7` | Add MDX-based content management system |
| 01/02 | `cd23ebe` | Add animation components and improve UI/UX |
| 01/02 | `342ecbf` | Add portfolio site with Next.js 16, Tailwind CSS v4 |
| 01/01 | `6d06ed5` | Add Claude Code skills: canvas-design, doc-coauthoring, pptx |

---

## 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Animation**: Framer Motion (TextRotate, Typewriter, AnimatedText)
- **Content**: MDX (next-mdx-remote/rsc), remark-gfm
- **Styling**: Pretendard 폰트, next-themes (다크모드)
- **CDN**: jsDelivr (GitHub images 브랜치 연동)
- **Deployment**: Vercel, @vercel/analytics, @vercel/speed-insights
- **Automation**: Claude Code, GitHub API, pre-commit hook

---

## 주요 기능

1. **포트폴리오 사이트**
   - 반응형 디자인
   - 다크/라이트 모드 지원
   - 애니메이션 효과 (TextRotate, Typewriter, 호버 언더라인)

2. **블로그 시스템**
   - MDX 기반 콘텐츠 관리
   - 코드 하이라이팅
   - 테이블 렌더링 (GFM)
   - 자동 날짜 정렬

3. **이미지 CDN 자동화**
   - 로컬 이미지 → jsDelivr CDN 자동 변환
   - GitHub images 브랜치 활용
   - pre-commit hook 연동

4. **Claude Code 도구 관리**
   - 커맨드/스킬/에이전트 마켓플레이스 퍼블리시
   - 전역/로컬 폴더 자동 탐색
   - 개발 사이클 자동화 (PRD → 개발 → 리뷰 → 학습)
