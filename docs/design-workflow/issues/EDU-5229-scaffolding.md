# EDU-5229: design-system 저장소 구조 확정 및 스캐폴딩

- **Linear**: https://linear.app/geniefy/issue/EDU-5229
- **Due Date**: 2026-01-19
- **Estimate**: 4h
- **Status**: ✅ Done

## 목표

design-system 저장소의 기본 구조를 확정하고 스캐폴딩 완료.
토큰 실제 값은 나중에 추가 (리서치 후).

## To-do (Linear 동기화)

- [x] `tokens.css`, `components/`, `design-rules.md` 기본 파일/폴더 생성
- [x] README에 운영 원칙 기재 (토큰=CDN / 컴포넌트=npm / 규칙=CDN+로컬)
- [x] 각 파일의 "단일 소스" 역할을 1~2문장으로 명시
- [x] package.json에 `@geniefy/ui` 반영

## 작업 대상 파일

```
/Users/hskim/dev/design-system/
├── package.json        # @geniefy/ui 반영
├── tokens.css          # 구조만 (값은 나중에)
├── design-rules.md     # 새로 생성
├── README.md           # 새로 생성
└── CLAUDE.md           # org 업데이트
```

## 검증

- [x] `npm run build` 성공
- [x] 모든 파일 존재 확인
- [x] package.json name = `@geniefy/ui`

## 작업 로그

### 2026-01-19

**완료된 작업:**
1. `design-rules.md` 생성 - LLM 제약 규칙 스캐폴딩 (상세 내용은 EDU-5231에서)
2. `README.md` 생성 - 운영 원칙(토큰=CDN/컴포넌트=npm/규칙=CDN+로컬) 및 각 파일의 단일 소스 역할 명시
3. `package.json` 수정 - `@{org}/ui` → `@geniefy/ui`
4. `CLAUDE.md` 수정 - `{org}` placeholder → `geniefy`
5. `tokens.css` 수정 - 단일 소스 역할 주석 추가
6. `tsconfig.json` 생성 - TypeScript 빌드 설정
7. `npm install` 및 `npm run build` 검증 완료

**최종 디렉토리 구조:**
```
design-system/
├── package.json        # @geniefy/ui ✓
├── tsconfig.json       # TypeScript 설정 (추가됨)
├── tokens.css          # 구조만 (EDU-5230에서 값 채움)
├── design-rules.md     # 스캐폴딩 (EDU-5231에서 상세화)
├── README.md           # 운영 원칙 + 파일 역할 명시
├── CLAUDE.md           # org → geniefy 업데이트
├── index.ts            # 컴포넌트 export 진입점
├── components/         # .gitkeep만 (EDU-5232에서 컴포넌트 추가)
└── dist/               # 빌드 결과물
```
