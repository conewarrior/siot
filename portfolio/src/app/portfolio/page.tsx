"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, ChevronLeft, ChevronRight, Download, ArrowRight, Mail, Globe, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextRotate } from "@/components/text-rotate";

// ============================================================================
// 타입 정의
// ============================================================================

type SlideLayout =
  | "cover"           // 커버: 중앙 정렬, 마일스톤
  | "problem"         // 문제정의: 6:6 그리드
  | "process"         // 과정: 4:8 그리드
  | "metric"          // 메트릭: 숫자 카드 그리드
  | "comparison"      // 비교: Before/After
  | "full-visual"     // 전체 시각자료
  | "text-heavy"      // 텍스트 중심
  | "intro"           // 인트로 전용
  | "outro";          // 아웃트로 전용

interface MetricItem {
  value: string;
  label: string;
  change?: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Achievement {
  category: string;
  items: string[];
}

interface SlideData {
  id: string;
  layout: SlideLayout;
  title: string;
  subtitle?: string;
  tagline?: string;           // 짧은 한 줄 문구
  description?: string;       // 설명 텍스트
  bullets?: string[];
  metrics?: MetricItem[];     // 메트릭 카드용
  steps?: ProcessStep[];      // 프로세스 단계
  beforeAfter?: {             // 비교용
    before: string[];
    after: string[];
  };
  quote?: string;             // 인용구
  achievements?: Achievement[]; // 주요 성과 (카테고리별)
  visualPlaceholder?: {
    type: "image" | "diagram" | "chart" | "screenshot" | "flowchart" | "code";
    description: string;
    aspectRatio?: "16:9" | "4:3" | "1:1" | "auto";
  };
}

interface SectionData {
  id: string;
  title: string;
  slides: SlideData[];
}

// ============================================================================
// 색상 팔레트
// ============================================================================

const COLORS = {
  primary: "#327039",        // Forest Fern
  primaryDark: "#133020",    // Tilled Earth
  bg: "#F8EDD9",             // Alabaster Hay
  green100: "#E8F5E9",
  green200: "#C8E6C9",
  white: "#FFFFFF",
};

// ============================================================================
// 섹션 & 슬라이드 데이터
// ============================================================================

const SECTIONS: SectionData[] = [
  // ============================================================================
  // Intro (1장)
  // ============================================================================
  {
    id: "intro",
    title: "Intro",
    slides: [
      {
        id: "intro-1",
        layout: "intro",
        title: "김한솔",
        tagline: "문제를 시스템으로 바꾸는 PM",
        description: "반복되는 문제를 발견하면, 해결책을 만들고, 그것을 누구나 쓸 수 있는 시스템으로 확장합니다.",
        bullets: [
          "Design System: AI가 일관된 UI를 만들도록 규칙을 자동화한 이야기",
          "CRO Experiments: 개발 없이 랜딩페이지를 분석하고 개선한 이야기",
        ],
      },
    ],
  },
  // ============================================================================
  // Design System (9장)
  // ============================================================================
  {
    id: "design-system",
    title: "Design System",
    slides: [
      // Page 1: 커버
      {
        id: "ds-1",
        layout: "cover",
        title: "바이브코딩 시대,\n디자인 시스템도 자동화할 수 있을까?",
        tagline: "/setup-design 한 줄로 끝나는 디자인 시스템",
        steps: [
          { number: "01", title: "문제 발견", description: "AI가 만든 UI는 왜 일관성이 없을까?" },
          { number: "02", title: "토큰 설계", description: "WCAG 기반 컬러 스케일 + Semantic 네이밍" },
          { number: "03", title: "규칙 자동화", description: "Claude Code가 규칙을 자동으로 따르게" },
          { number: "04", title: "시스템 확장", description: "개인 도구 → 팀 전체가 쓰는 시스템으로" },
        ],
        achievements: [
          {
            category: "토큰 설계",
            items: [
              "**WCAG AA 기반** 10단계 컬러 스케일 설계",
              "Semantic 토큰 네이밍 체계 수립",
              "**다크모드 자동 전환** 지원",
            ],
          },
          {
            category: "자동화",
            items: [
              "**/setup-design** 원클릭 설정 커맨드",
              "**design-rules Skill** Hook 연동",
              "하드코딩 색상 **100% → 0%** 달성",
            ],
          },
          {
            category: "배포 체계",
            items: [
              "토큰: **jsDelivr CDN** 즉시 반영",
              "컴포넌트: **npm 패키지** 버전 관리",
              "**5+ 프로젝트**에 적용 완료",
            ],
          },
        ],
      },
      // Page 2: 문제 정의
      {
        id: "ds-2",
        layout: "problem",
        title: "AI가 만든 UI는 왜 일관성이 없을까?",
        subtitle: "문제 정의",
        description: "Claude Code로 UI를 만들면 매번 다른 스타일이 나왔다. 같은 프롬프트를 줘도 색상, 간격, 폰트가 제각각이었다.",
        beforeAfter: {
          before: [
            "하드코딩된 색상값 (#fff, #333, #f5f5f5)",
            "제각각인 간격 (12px, 15px, 17px, 20px)",
            "프로젝트마다 다른 스타일",
            "다크모드? 처음부터 다시 작업",
          ],
          after: [
            "원인: AI에게 규칙을 전달하는 체계가 없음",
            "AI는 매번 새로운 값을 \"창작\"함",
            "기존 프로젝트의 컨텍스트를 모름",
          ],
        },
      },
      // Page 3: 컬러 시스템 설계
      {
        id: "ds-3",
        layout: "process",
        title: "WCAG 명도대비율 기반 10단계 스케일",
        subtitle: "컬러 시스템 설계",
        description: "접근성을 기본값으로. 모든 색상 조합이 WCAG AA 기준을 만족하도록 명도 대비를 계산해서 스케일을 설계했다.",
        bullets: [
          "Neutral Scale: gray-50 ~ gray-900 (배경부터 텍스트까지)",
          "Primary Scale: brand-50 ~ brand-900 (브랜드 색상 변형)",
          "Semantic: success, warning, error, info (상태 표현)",
        ],
        visualPlaceholder: {
          type: "diagram",
          description: "10단계 컬러 스케일 팔레트 + 명도대비율 4.5:1 이상 표시",
          aspectRatio: "16:9",
        },
      },
      // Page 4: 토큰 네이밍 체계
      {
        id: "ds-4",
        layout: "comparison",
        title: "색상이 아니라 역할로 부르기",
        subtitle: "토큰 네이밍 체계",
        description: "gray-500이 아니라 text-secondary. 색상값이 아닌 용도로 이름을 지으면 다크모드 전환도 자동이다.",
        beforeAfter: {
          before: [
            "color: #6b7280;  /* 이게 뭐지? */",
            "background: #f9fafb;  /* 왜 이 색? */",
            "border: 1px solid #e5e7eb;",
            "다크모드면 전부 다시 찾아서 바꿔야 함",
          ],
          after: [
            "color: var(--text-secondary);",
            "background: var(--bg-surface);",
            "border: 1px solid var(--border-default);",
            "다크모드: .dark에서 변수값만 바꾸면 끝",
          ],
        },
      },
      // Page 5: CDN + npm 분리 배포
      {
        id: "ds-5",
        layout: "process",
        title: "토큰은 즉시, 컴포넌트는 버전 관리",
        subtitle: "CDN + npm 분리 배포",
        description: "색상 토큰은 자주 바뀌지만 컴포넌트는 안정성이 중요하다. 그래서 배포 방식을 분리했다.",
        steps: [
          { number: "토큰", title: "jsDelivr CDN", description: "main 브랜치 push → 즉시 전 프로젝트 반영" },
          { number: "컴포넌트", title: "npm 패키지", description: "버전 태그 → 명시적 업데이트 필요" },
        ],
        bullets: [
          "토큰 수정: main push만 하면 모든 프로젝트에 즉시 반영",
          "컴포넌트 수정: npm version patch → 안전하게 버전 관리",
          "장점: 급한 색상 수정은 빠르게, 컴포넌트 변경은 신중하게",
        ],
      },
      // Page 6: /setup-design 커맨드
      {
        id: "ds-6",
        layout: "full-visual",
        title: "한 줄 명령어로 디자인 시스템 적용",
        subtitle: "/setup-design 커맨드",
        tagline: "새 프로젝트 시작할 때 /setup-design만 입력하면 끝",
        steps: [
          { number: "1", title: "패키지 설치", description: "npm install @geniefy/ui" },
          { number: "2", title: "토큰 연결", description: "layout.tsx에 tokens.css import 추가" },
          { number: "3", title: "규칙 주입", description: "CLAUDE.md에 design-rules 참조 추가" },
          { number: "4", title: "자동 업데이트", description: "Dependabot 설정으로 새 버전 자동 PR" },
        ],
        visualPlaceholder: {
          type: "code",
          description: "터미널에서 /setup-design 실행 → 4단계 자동 완료 화면",
          aspectRatio: "16:9",
        },
      },
      // Page 7: design-rules Skill
      {
        id: "ds-7",
        layout: "process",
        title: "AI가 토큰을 자동으로 사용하게 만들기",
        subtitle: "design-rules Skill",
        description: "설치만으로 끝이 아니다. Claude가 UI를 만들 때 자동으로 토큰을 사용하도록 Hook과 Skill을 연결했다.",
        steps: [
          { number: "감지", title: "UserPromptSubmit Hook", description: "\"버튼 만들어줘\" 같은 UI 키워드 감지" },
          { number: "주입", title: "design-rules Skill 로드", description: "토큰 목록과 사용 규칙을 컨텍스트에 추가" },
          { number: "생성", title: "Generation Protocol", description: "4단계 검증: 토큰 사용 → 접근성 체크 → 일관성 검사" },
          { number: "검증", title: "자동 거부/수정", description: "#fff 같은 하드코딩 발견 시 var(--bg-surface)로 교체" },
        ],
        metrics: [
          { value: "0%", label: "하드코딩 색상", change: "100% → 0%" },
          { value: "100%", label: "토큰 사용률", change: "0% → 100%" },
        ],
      },
      // Page 8: 자동 기여 시스템
      {
        id: "ds-8",
        layout: "process",
        title: "새 컴포넌트가 자동으로 중앙 저장소에",
        subtitle: "자동 기여 시스템",
        description: "프로젝트에서 새 컴포넌트를 만들면, 자동으로 디자인 시스템 저장소에 기여된다. 반대로 새 버전이 나오면 자동으로 업데이트된다.",
        steps: [
          { number: "↑", title: "auto-contribute Hook", description: "components/ 폴더에 파일 생성 감지 → GitHub API로 자동 PR" },
          { number: "↓", title: "Dependabot + 자동 머지", description: "새 버전 배포 → PR 자동 생성 → CI 통과 시 자동 머지" },
        ],
        quote: "양방향 동기화: 쓰면서 기여하고, 기여하면 자동으로 받는다",
      },
      // Page 9: 결과 & 확장
      {
        id: "ds-9",
        layout: "metric",
        title: "규칙을 코드로, 코드를 시스템으로",
        subtitle: "결과 & 확장",
        description: "개인 프로젝트에서 시작한 규칙이 팀 전체가 쓰는 시스템이 되었다.",
        metrics: [
          { value: "5+", label: "적용 프로젝트", change: "포트폴리오, 블로그, 사내 도구 등" },
          { value: "0%", label: "하드코딩 색상", change: "토큰 100% 사용" },
          { value: "1줄", label: "설정 시간", change: "/setup-design" },
          { value: "∞", label: "확장성", change: "새 프로젝트에 즉시 적용 가능" },
        ],
        bullets: [
          "Before: 프로젝트마다 색상 찾아서 복붙, 다크모드 수동 작업",
          "After: 규칙이 코드에 내장, AI가 알아서 따름",
          "확장: 다른 팀, 다른 AI 도구에도 같은 패턴 적용 가능",
        ],
      },
    ],
  },
  // ============================================================================
  // CRO Experiments (9장)
  // ============================================================================
  {
    id: "cro-experiments",
    title: "CRO Experiments",
    slides: [
      // Page 1: 커버
      {
        id: "cro-1",
        layout: "cover",
        title: "개발 리소스 없이\n랜딩페이지 운영하기",
        tagline: "분석 2시간 → 명령어 한 줄, 수정 2주 대기 → 즉시 반영",
        steps: [
          { number: "01", title: "직접 제작", description: "Claude Code로 랜딩페이지 직접 만들기" },
          { number: "02", title: "분석 자동화", description: "Beusable 데이터 → 리포트 자동 생성" },
          { number: "03", title: "정성 데이터", description: "Exit Intent로 이탈 이유 수집" },
          { number: "04", title: "시스템화", description: "개인 도구 → 팀 리포트 시스템으로 확장" },
        ],
        achievements: [
          {
            category: "제작/배포",
            items: [
              "**Claude Code**로 랜딩페이지 직접 제작",
              "**Vercel** 배포로 수정 → **1분 내 반영**",
              "개발팀 대기 **2주 → 0일**",
            ],
          },
          {
            category: "분석 자동화",
            items: [
              "Beusable **히트맵 리포트** 자동 생성",
              "분석 시간 **2시간 → 10분** (92% 절감)",
              "**/cro-report** 명령어로 즉시 실행",
            ],
          },
          {
            category: "전환 개선",
            items: [
              "**Exit Intent** 팝업으로 이탈 이유 수집",
              "스크롤 도달률 **+12%**, CTA 클릭률 **+8%**",
              "팀 전체가 쓰는 **일일 리포트** 시스템",
            ],
          },
        ],
      },
      // Page 2: 시작
      {
        id: "cro-2",
        layout: "problem",
        title: "개발자 없이 랜딩페이지 직접 만들기",
        subtitle: "시작: Claude Code로 직접 제작/배포",
        description: "마케팅팀이 랜딩페이지를 수정하려면 개발팀에 요청해야 했다. 간단한 텍스트 수정도 2주 대기. 실험은 꿈도 못 꿨다.",
        beforeAfter: {
          before: [
            "텍스트 하나 바꾸려면 개발팀 요청",
            "평균 대기 시간: 2주",
            "A/B 테스트? \"리소스 없어서 다음에...\"",
            "아이디어가 있어도 실행 불가",
          ],
          after: [
            "Claude Code로 랜딩페이지 직접 제작",
            "Vercel로 즉시 배포",
            "수정 → 커밋 → 1분 내 반영",
            "아이디어 → 실험 → 결과, 당일 완료",
          ],
        },
      },
      // Page 3: 문제 발견 #1
      {
        id: "cro-3",
        layout: "text-heavy",
        title: "매번 Beusable 들어가서 분석하는 게 번거롭다",
        subtitle: "문제 발견 #1: 분석에 2시간 소요",
        description: "랜딩페이지를 만들 수 있게 됐지만, 뭘 고쳐야 하는지 알려면 Beusable에서 히트맵 분석을 해야 했다. 매번 같은 작업의 반복.",
        bullets: [
          "Beusable 대시보드 접속",
          "히트맵 스크린샷 캡처 (스크롤, 클릭, 마우스무브)",
          "수치 정리 (PV, UV, 스크롤 깊이, 클릭률)",
          "섹션별 인사이트 도출",
          "슬랙/노션에 문서화",
        ],
        quote: "매주 2시간씩 똑같은 작업. 이걸 왜 수동으로 하고 있지?",
        metrics: [
          { value: "2시간", label: "분석 소요 시간", change: "매주 반복" },
        ],
      },
      // Page 4: 해결 #1
      {
        id: "cro-4",
        layout: "process",
        title: "Beusable 데이터 → 보고서 자동 생성",
        subtitle: "해결 #1: 뷰저블 리포트 자동화",
        description: "분석 템플릿을 만들고, Beusable 데이터를 Claude에게 전달하면 같은 형식의 리포트가 자동으로 생성되게 했다.",
        steps: [
          { number: "1", title: "템플릿 설계", description: "섹션별 분석 항목 + 인사이트 형식 정의" },
          { number: "2", title: "데이터 추출", description: "Beusable API → JSON 형태로 정리" },
          { number: "3", title: "리포트 생성", description: "Claude에게 전달 → 마크다운 보고서 출력" },
        ],
        metrics: [
          { value: "2시간", label: "Before", change: "수동 분석" },
          { value: "10분", label: "After", change: "자동 생성" },
          { value: "92%", label: "시간 절약", change: "110분 → 10분" },
        ],
      },
      // Page 5: 적용 - 실제 분석 결과
      {
        id: "cro-5",
        layout: "metric",
        title: "자동화된 리포트로 문제 구간 발견",
        subtitle: "적용: 20기 스터디 랜딩페이지 분석",
        description: "실제 운영 중인 랜딩페이지에 자동화 리포트를 적용했다. 데이터가 말해주는 문제 구간이 명확히 보였다.",
        metrics: [
          { value: "3,805", label: "Page Views", change: "분석 기간 내" },
          { value: "1,566", label: "Unique Visitors", change: "순 방문자" },
          { value: "77.2%", label: "클릭 이탈률", change: "클릭 없이 이탈" },
          { value: "25%", label: "스크롤 도달률", change: "100% → 25% 급락" },
        ],
        bullets: [
          "스크롤 절벽: Hero → Problem 섹션 전환 구간에서 75% 이탈",
          "CTA 클릭률: 메인 버튼 Hover 67건 → Click 14건 (20.9%)",
          "관심 구간: Transformation 섹션에서 체류 시간 가장 높음",
        ],
      },
      // Page 6: 개선
      {
        id: "cro-6",
        layout: "comparison",
        title: "데이터가 말해주는 곳을 고치다",
        subtitle: "개선: 시각적 UI 개선",
        description: "추측이 아닌 데이터 기반으로 개선 포인트를 잡았다. 스크롤 절벽 구간과 CTA 클릭률에 집중했다.",
        beforeAfter: {
          before: [
            "Hero → Problem 전환이 급격함",
            "CTA 버튼이 스크롤 하단에 위치",
            "Problem 섹션 텍스트 과다",
            "시각적 흐름이 끊김",
          ],
          after: [
            "Hero-Problem 사이 브릿지 섹션 추가",
            "Sticky CTA로 항상 노출",
            "핵심 메시지만 남기고 압축",
            "스크롤 유도 애니메이션 추가",
          ],
        },
        metrics: [
          { value: "+12%", label: "스크롤 도달률", change: "25% → 37%" },
          { value: "+8%", label: "CTA 클릭률", change: "20.9% → 28.9%" },
        ],
      },
      // Page 7: 문제 발견 #2
      {
        id: "cro-7",
        layout: "text-heavy",
        title: "숫자는 있는데, 왜 이탈하는지 모르겠다",
        subtitle: "문제 발견 #2: 정성적 데이터 부족",
        description: "히트맵은 '어디서' 이탈하는지 알려주지만, '왜' 이탈하는지는 말해주지 않는다. CTA를 눌렀는데 결제를 안 한 이유가 뭘까?",
        quote: "클릭률은 올랐는데 전환율은 그대로... 뭐가 문제지?",
        bullets: [
          "정량 데이터: 어디서 이탈하는지 (위치)",
          "정성 데이터: 왜 이탈하는지 (이유)",
          "히트맵만으로는 원인 파악 불가",
          "이탈 직전 사용자의 목소리가 필요",
        ],
      },
      // Page 8: 해결 #2 - Exit Intent
      {
        id: "cro-8",
        layout: "metric",
        title: "떠나려는 순간, 이유를 묻다",
        subtitle: "해결 #2: Exit Intent 팝업 도입",
        description: "마우스가 브라우저 상단(닫기 버튼 방향)으로 이동하면 팝업을 띄워 이탈 이유를 물었다. Voiceform으로 음성 피드백도 수집.",
        metrics: [
          { value: "39%", label: "가격 부담", change: "\"가격이 부담돼요\"" },
          { value: "24.4%", label: "일정 불일치", change: "\"시간이 안 맞아요\"" },
          { value: "12.2%", label: "팀원 상의 필요", change: "\"같이 결정해야 해요\"" },
          { value: "24.4%", label: "기타", change: "추가 정보 필요 등" },
        ],
        bullets: [
          "Exit Intent: 마우스가 창 상단으로 이동 시 감지",
          "Voiceform: 타이핑 대신 음성으로 간편하게 피드백",
          "Beusable 연동: 이탈 이벤트 트래킹 코드 삽입",
        ],
        quote: "가격 부담 39% → 할부 옵션 강조, 일정 불일치 → 다음 기수 사전 등록 유도",
      },
      // Page 9: 시스템 확장 & 회고
      {
        id: "cro-9",
        layout: "metric",
        title: "개인 생산성 → 팀 전체가 쓰는 시스템",
        subtitle: "시스템 확장 & 회고",
        description: "나만 쓰던 도구가 팀 전체가 쓰는 시스템이 됐다. 매일 아침 리포트가 메일로 오고, 누구나 명령어 한 줄로 분석을 볼 수 있다.",
        metrics: [
          { value: "매일", label: "자동 리포트", change: "아침 9시 메일 발송" },
          { value: "1줄", label: "분석 명령어", change: "/cro-report" },
          { value: "3명", label: "사용자", change: "PM, 마케터, 대표" },
        ],
        bullets: [
          "문제 발견 → 해결 → 시스템화 패턴의 반복",
          "핵심: 결과물이 아닌 문제 해결 '과정'의 가치",
          "학습: 개인 도구를 팀 시스템으로 확장하는 방법",
        ],
        quote: "좋은 시스템은 사용자가 늘어나면서 더 좋아진다",
      },
    ],
  },
  // ============================================================================
  // Outro (1장)
  // ============================================================================
  {
    id: "outro",
    title: "Outro",
    slides: [
      {
        id: "outro-1",
        layout: "outro",
        title: "김한솔",
        tagline: "문제를 시스템으로 바꾸는 PM",
        description: "반복되는 불편함을 발견하면, 해결책을 만들고, 누구나 쓸 수 있게 확장합니다.",
        bullets: [
          "kimhansol307@gmail.com",
          "siot.vercel.app",
          "github.com/conewarrior",
        ],
      },
    ],
  },
];

// ============================================================================
// 상단 네비게이션 컴포넌트
// ============================================================================

interface TopNavProps {
  sections: SectionData[];
  currentSectionIndex: number;
  currentSlideIndex: number;
  onSelectSection: (index: number) => void;
  onDownload?: () => void;
}

function TopNav({ sections, currentSectionIndex, currentSlideIndex, onSelectSection, onDownload }: TopNavProps) {
  return (
    <nav className="flex items-center justify-between w-full" aria-label="섹션 내비게이션">
      <div className="flex items-center gap-6">
        {/* 워드마크 - 고정 너비로 메뉴 위치 안정화 */}
        <Link
          href="/"
          className="w-[220px] flex-shrink-0 px-3 py-1.5 font-serif text-sm tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1"
          style={{ color: COLORS.primaryDark }}
        >
          <span>hansol makes it</span>
          <span
            className="inline-flex text-white px-2 py-1 rounded-md text-sm font-medium"
            style={{ backgroundColor: "#F97316" }}
          >
            <TextRotate
              texts={["pop", "snappy", "flow", "simple", "click", "yesterday", "right"]}
              mainClassName="overflow-hidden"
              staggerFrom="last"
              staggerDuration={0.02}
              rotationInterval={2500}
              transition={{ type: "spring", damping: 20, stiffness: 400 }}
            />
          </span>
        </Link>

        {/* 섹션 탭 */}
        <div className="flex items-center gap-1">
        {sections.map((section, index) => {
          const isActive = currentSectionIndex === index;
          const hasMultipleSlides = section.slides.length > 1;
          return (
            <motion.button
              key={section.id}
              onClick={() => onSelectSection(index)}
              className={cn(
                "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              )}
              style={{
                backgroundColor: isActive ? COLORS.primary : "transparent",
                color: isActive ? COLORS.white : COLORS.primaryDark,
              }}
              whileHover={{
                scale: isActive ? 1 : 1.02,
                backgroundColor: isActive ? COLORS.primary : COLORS.green100,
              }}
              whileTap={{ scale: 0.98 }}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{section.title}</span>
              {/* 닷 인디케이터 - 활성 섹션에서만 버튼 안에 펼쳐짐 */}
              <AnimatePresence>
                {isActive && hasMultipleSlides && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center gap-1 overflow-hidden"
                  >
                    {Array.from({ length: section.slides.length }).map((_, slideIdx) => (
                      <motion.div
                        key={slideIdx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: slideIdx * 0.03 }}
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: slideIdx === currentSlideIndex
                            ? COLORS.white
                            : "rgba(255,255,255,0.4)",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
        </div>
      </div>
      {/* 다운로드 버튼 - 보더 스타일 */}
      <button
        onClick={onDownload}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors hover:bg-neutral-100"
        style={{
          color: COLORS.primaryDark,
          borderColor: COLORS.green200,
        }}
      >
        <Download className="w-3.5 h-3.5" />
        <span>PDF</span>
      </button>
    </nav>
  );
}


// ============================================================================
// 레이아웃별 슬라이드 컴포넌트
// ============================================================================

interface SlideProps {
  slide: SlideData;
  sectionTitle: string;
}

// 공통 섹션 라벨
function SectionLabel({ title }: { title: string }) {
  return (
    <div className="text-sm font-medium tracking-wide uppercase" style={{ color: COLORS.primary }}>
      {title}
    </div>
  );
}

// 공통 시각자료 플레이스홀더
function VisualPlaceholder({ visual }: { visual: NonNullable<SlideData["visualPlaceholder"]> }) {
  return (
    <div
      className={cn(
        "w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6",
        visual.aspectRatio === "16:9" && "aspect-video",
        visual.aspectRatio === "4:3" && "aspect-[4/3]",
        visual.aspectRatio === "1:1" && "aspect-square"
      )}
      style={{
        borderColor: COLORS.green200,
        backgroundColor: `${COLORS.green100}30`,
      }}
    >
      <div className="text-xs font-medium mb-2 opacity-60" style={{ color: COLORS.primary }}>
        [{visual.type.toUpperCase()}]
      </div>
      <p className="text-center text-sm opacity-80" style={{ color: COLORS.primaryDark }}>
        {visual.description}
      </p>
    </div>
  );
}

// 메트릭 카드
function MetricCard({ metric }: { metric: MetricItem }) {
  return (
    <div
      className="rounded-xl p-5 text-center"
      style={{ backgroundColor: COLORS.green100 }}
    >
      <div className="text-3xl font-bold mb-1" style={{ color: COLORS.primaryDark }}>
        {metric.value}
      </div>
      <div className="text-sm font-medium mb-1" style={{ color: COLORS.primary }}>
        {metric.label}
      </div>
      {metric.change && (
        <div className="text-xs opacity-70" style={{ color: COLORS.primaryDark }}>
          {metric.change}
        </div>
      )}
    </div>
  );
}

// 프로세스 스텝
function ProcessStepCard({ step, isLast }: { step: ProcessStep; isLast: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
        style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
      >
        {step.number}
      </div>
      <div className="flex-1 pt-1">
        <div className="font-semibold mb-1" style={{ color: COLORS.primaryDark }}>
          {step.title}
        </div>
        <div className="text-sm opacity-80" style={{ color: COLORS.primaryDark }}>
          {step.description}
        </div>
      </div>
      {!isLast && (
        <ArrowRight className="flex-shrink-0 w-5 h-5 mt-2 opacity-40" style={{ color: COLORS.primary }} />
      )}
    </div>
  );
}

// ============================================================================
// 인트로 레이아웃: 중앙 정렬, 이름 + 한 줄 소개 + 프로젝트 목록
// ============================================================================
function IntroSlide({ slide }: SlideProps) {
  return (
    <div className="h-full w-full flex items-center justify-center px-16 py-12">
      <div className="max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold mb-4"
          style={{ color: COLORS.primaryDark }}
        >
          {slide.title}
        </motion.h1>
        {slide.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl mb-6"
            style={{ color: COLORS.primary }}
          >
            {slide.tagline}
          </motion.p>
        )}
        {slide.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base mb-10 leading-relaxed opacity-80"
            style={{ color: COLORS.primaryDark }}
          >
            {slide.description}
          </motion.p>
        )}
        {slide.bullets && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 text-left max-w-xl mx-auto"
          >
            {slide.bullets.map((bullet, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg"
                style={{ backgroundColor: COLORS.green100 }}
              >
                <span className="text-lg font-bold" style={{ color: COLORS.primary }}>
                  {i + 1}.
                </span>
                <span style={{ color: COLORS.primaryDark }}>{bullet}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 커버 레이아웃: 타임라인 로드맵 + 주요 성과
// ============================================================================
function CoverSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10 overflow-y-auto">
      <SectionLabel title={sectionTitle} />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold mt-3 mb-2 whitespace-pre-line leading-tight"
        style={{ color: COLORS.primaryDark }}
      >
        {slide.title}
      </motion.h1>

      {slide.tagline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base mb-8"
          style={{ color: COLORS.primary }}
        >
          {slide.tagline}
        </motion.p>
      )}

      <div className="flex-1 grid grid-cols-2 gap-12 min-h-0">
        {/* 좌측: 로드맵 타임라인 */}
        {slide.steps && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3
              className="text-sm font-medium mb-4 tracking-wide"
              style={{ color: "#E07A5F" }}
            >
              로드맵
            </h3>
            <div className="relative">
              {/* 세로 라인 */}
              <div
                className="absolute left-[3px] top-2 bottom-2 w-px"
                style={{ backgroundColor: COLORS.green200 }}
              />
              <div className="space-y-5">
                {slide.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    {/* 점 */}
                    <div
                      className="w-[7px] h-[7px] rounded-full flex-shrink-0 mt-1.5 relative z-10"
                      style={{ backgroundColor: "#E07A5F" }}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-medium mb-0.5"
                        style={{ color: COLORS.primary }}
                      >
                        {step.number}
                      </div>
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: COLORS.primaryDark }}
                      >
                        {step.title}
                      </div>
                      <div
                        className="text-sm opacity-70 leading-relaxed"
                        style={{ color: COLORS.primaryDark }}
                      >
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 우측: 주요 성과 */}
        {slide.achievements && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3
              className="text-sm font-medium mb-4 tracking-wide"
              style={{ color: "#E07A5F" }}
            >
              주요 성과
            </h3>
            <div className="space-y-5">
              {slide.achievements.map((achievement, i) => (
                <div key={i} className="flex gap-4">
                  {/* 카테고리 라벨 */}
                  <div
                    className="w-24 flex-shrink-0 text-xs font-medium pt-0.5"
                    style={{ color: COLORS.primary }}
                  >
                    {achievement.category}
                  </div>
                  {/* 항목 리스트 */}
                  <div className="flex-1 space-y-1.5">
                    {achievement.items.map((item, j) => (
                      <div
                        key={j}
                        className="text-sm leading-relaxed"
                        style={{ color: COLORS.primaryDark }}
                        dangerouslySetInnerHTML={{
                          __html: item.replace(
                            /\*\*(.*?)\*\*/g,
                            `<span style="color: #E07A5F; font-weight: 500;">$1</span>`
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 문제정의 레이아웃: 6:6 그리드, Before/After 또는 문제+원인
// ============================================================================
function ProblemSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-6">
        <SectionLabel title={sectionTitle} />
        {slide.subtitle && (
          <div className="text-sm mt-1 opacity-60" style={{ color: COLORS.primaryDark }}>
            {slide.subtitle}
          </div>
        )}
      </div>

      <h2
        className="text-3xl font-bold mb-3"
        style={{ color: COLORS.primaryDark }}
      >
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-base mb-8 max-w-2xl leading-relaxed" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* Before/After 6:6 그리드 */}
      {slide.beforeAfter && (
        <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
          {/* Before */}
          <div className="flex flex-col">
            <div
              className="text-sm font-bold mb-3 px-3 py-1 rounded-full inline-block self-start"
              style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}
            >
              Problem
            </div>
            <div className="flex-1 rounded-xl p-5" style={{ backgroundColor: "#FEF2F2" }}>
              <ul className="space-y-3">
                {slide.beforeAfter.before.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#7F1D1D" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* After (원인/인사이트) */}
          <div className="flex flex-col">
            <div
              className="text-sm font-bold mb-3 px-3 py-1 rounded-full inline-block self-start"
              style={{ backgroundColor: COLORS.green100, color: COLORS.primary }}
            >
              Insight
            </div>
            <div className="flex-1 rounded-xl p-5" style={{ backgroundColor: COLORS.green100 }}>
              <ul className="space-y-3">
                {slide.beforeAfter.after.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: COLORS.primaryDark }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 프로세스 레이아웃: 4:8 그리드 (좌측 설명 + 우측 시각자료/단계)
// ============================================================================
function ProcessSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} />
        {slide.subtitle && (
          <div className="text-sm mt-1 opacity-60" style={{ color: COLORS.primaryDark }}>
            {slide.subtitle}
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-base mb-6 max-w-3xl" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* 4:8 그리드 */}
      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        {/* 좌측 4컬럼: 단계 또는 불릿 */}
        <div className="col-span-5 flex flex-col justify-center">
          {slide.steps ? (
            <div className="space-y-4">
              {slide.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-0.5">
                    <div className="font-semibold text-sm" style={{ color: COLORS.primaryDark }}>
                      {step.title}
                    </div>
                    <div className="text-sm opacity-70" style={{ color: COLORS.primaryDark }}>
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : slide.bullets ? (
            <ul className="space-y-3">
              {slide.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: COLORS.primaryDark }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* 메트릭이 있으면 하단에 표시 */}
          {slide.metrics && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {slide.metrics.map((metric, i) => (
                <MetricCard key={i} metric={metric} />
              ))}
            </div>
          )}
        </div>

        {/* 우측 8컬럼: 시각자료 */}
        <div className="col-span-7 flex items-center justify-center">
          {slide.visualPlaceholder ? (
            <VisualPlaceholder visual={slide.visualPlaceholder} />
          ) : slide.quote ? (
            <div
              className="p-8 rounded-xl text-center italic text-lg"
              style={{ backgroundColor: COLORS.green100, color: COLORS.primaryDark }}
            >
              "{slide.quote}"
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 비교 레이아웃: Before/After 세로 분할
// ============================================================================
function ComparisonSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} />
        {slide.subtitle && (
          <div className="text-sm mt-1 opacity-60" style={{ color: COLORS.primaryDark }}>
            {slide.subtitle}
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-base mb-6 max-w-2xl" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* Before/After 세로 분할 */}
      {slide.beforeAfter && (
        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          {/* Before */}
          <div className="flex flex-col rounded-xl overflow-hidden" style={{ backgroundColor: "#FEF2F2" }}>
            <div className="px-5 py-3 font-bold text-sm" style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}>
              Before
            </div>
            <div className="flex-1 p-5">
              <ul className="space-y-2">
                {slide.beforeAfter.before.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-mono" style={{ color: "#7F1D1D" }}>
                    <span className="opacity-40">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* After */}
          <div className="flex flex-col rounded-xl overflow-hidden" style={{ backgroundColor: COLORS.green100 }}>
            <div className="px-5 py-3 font-bold text-sm" style={{ backgroundColor: COLORS.green200, color: COLORS.primaryDark }}>
              After
            </div>
            <div className="flex-1 p-5">
              <ul className="space-y-2">
                {slide.beforeAfter.after.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-mono" style={{ color: COLORS.primaryDark }}>
                    <span className="opacity-40">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 메트릭 */}
      {slide.metrics && (
        <div className="mt-6 flex gap-4">
          {slide.metrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: COLORS.green100 }}>
              <span className="font-bold" style={{ color: COLORS.primary }}>{metric.value}</span>
              <span className="text-sm" style={{ color: COLORS.primaryDark }}>{metric.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 메트릭 레이아웃: 숫자 카드 그리드 + 불릿
// ============================================================================
function MetricSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} />
        {slide.subtitle && (
          <div className="text-sm mt-1 opacity-60" style={{ color: COLORS.primaryDark }}>
            {slide.subtitle}
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-base mb-8 max-w-2xl" style={{ color: COLORS.primaryDark, opacity: 0.8 }}>
          {slide.description}
        </p>
      )}

      {/* 메트릭 카드 그리드 */}
      {slide.metrics && (
        <div className={cn(
          "grid gap-4 mb-8",
          slide.metrics.length <= 3 ? "grid-cols-3" : "grid-cols-4"
        )}>
          {slide.metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} />
          ))}
        </div>
      )}

      {/* 불릿 */}
      {slide.bullets && (
        <div className="flex-1">
          <ul className="space-y-2">
            {slide.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: COLORS.primaryDark }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.primary }} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 인용구 */}
      {slide.quote && (
        <div
          className="mt-auto p-4 rounded-xl text-center italic"
          style={{ backgroundColor: COLORS.green100, color: COLORS.primaryDark }}
        >
          "{slide.quote}"
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 텍스트 중심 레이아웃: 전체 너비 텍스트 + 인용구
// ============================================================================
function TextHeavySlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-4">
        <SectionLabel title={sectionTitle} />
        {slide.subtitle && (
          <div className="text-sm mt-1 opacity-60" style={{ color: COLORS.primaryDark }}>
            {slide.subtitle}
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-3" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.description && (
        <p className="text-lg mb-8 max-w-3xl leading-relaxed" style={{ color: COLORS.primaryDark, opacity: 0.9 }}>
          {slide.description}
        </p>
      )}

      {/* 인용구 (상단) */}
      {slide.quote && (
        <div
          className="mb-8 p-6 rounded-xl border-l-4 max-w-2xl"
          style={{
            backgroundColor: COLORS.green100,
            borderLeftColor: COLORS.primary,
            color: COLORS.primaryDark
          }}
        >
          <p className="italic text-lg">"{slide.quote}"</p>
        </div>
      )}

      {/* 불릿 리스트 (2열) */}
      {slide.bullets && (
        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-4 content-start">
          {slide.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3" style={{ color: COLORS.primaryDark }}>
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS.primary }}
              />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}

      {/* 메트릭 */}
      {slide.metrics && (
        <div className="mt-auto flex gap-4">
          {slide.metrics.map((metric, i) => (
            <div key={i} className="text-center px-6 py-3 rounded-xl" style={{ backgroundColor: COLORS.green100 }}>
              <div className="text-2xl font-bold" style={{ color: COLORS.primary }}>{metric.value}</div>
              <div className="text-sm" style={{ color: COLORS.primaryDark }}>{metric.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 전체 시각자료 레이아웃: 상단 텍스트 + 하단 시각자료/단계
// ============================================================================
function FullVisualSlide({ slide, sectionTitle }: SlideProps) {
  return (
    <div className="h-full w-full flex flex-col px-16 py-10">
      <div className="mb-3">
        <SectionLabel title={sectionTitle} />
        {slide.subtitle && (
          <div className="text-sm mt-1 opacity-60" style={{ color: COLORS.primaryDark }}>
            {slide.subtitle}
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.primaryDark }}>
        {slide.title}
      </h2>

      {slide.tagline && (
        <p className="text-base mb-6" style={{ color: COLORS.primary }}>
          {slide.tagline}
        </p>
      )}

      {/* 4단계 가로 배치 */}
      {slide.steps && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {slide.steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="p-4 rounded-xl h-full" style={{ backgroundColor: COLORS.green100 }}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mb-2"
                  style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
                >
                  {step.number}
                </div>
                <div className="font-semibold text-sm mb-1" style={{ color: COLORS.primaryDark }}>
                  {step.title}
                </div>
                <div className="text-xs opacity-70" style={{ color: COLORS.primaryDark }}>
                  {step.description}
                </div>
              </div>
              {i < slide.steps!.length - 1 && (
                <ArrowRight
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10"
                  style={{ color: COLORS.primary }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 시각자료 */}
      {slide.visualPlaceholder && (
        <div className="flex-1 min-h-0">
          <VisualPlaceholder visual={slide.visualPlaceholder} />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 아웃트로 레이아웃: 중앙 정렬 연락처
// ============================================================================
function OutroSlide({ slide }: SlideProps) {
  return (
    <div className="h-full w-full flex items-center justify-center px-16 py-12">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-3"
          style={{ color: COLORS.primaryDark }}
        >
          {slide.title}
        </motion.h1>

        {slide.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl mb-4"
            style={{ color: COLORS.primary }}
          >
            {slide.tagline}
          </motion.p>
        )}

        {slide.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base mb-10 opacity-80 max-w-lg mx-auto"
            style={{ color: COLORS.primaryDark }}
          >
            {slide.description}
          </motion.p>
        )}

        {slide.bullets && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            {slide.bullets.map((contact, i) => {
              const [label, value] = contact.includes(":")
                ? contact.split(":").map(s => s.trim())
                : ["", contact];
              const Icon = contact.includes("@") ? Mail
                : contact.includes("github") ? Github
                : Globe;

              return (
                <a
                  key={i}
                  href={contact.includes("@") ? `mailto:${value}` : `https://${value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-lg transition-colors hover:opacity-80"
                  style={{ backgroundColor: COLORS.green100, color: COLORS.primaryDark }}
                >
                  <Icon className="w-5 h-5" style={{ color: COLORS.primary }} />
                  <span>{value || contact}</span>
                </a>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 슬라이드 라우터: layout에 따라 적절한 컴포넌트 선택
// ============================================================================
function Slide({ slide, sectionTitle }: SlideProps) {
  switch (slide.layout) {
    case "intro":
      return <IntroSlide slide={slide} sectionTitle={sectionTitle} />;
    case "cover":
      return <CoverSlide slide={slide} sectionTitle={sectionTitle} />;
    case "problem":
      return <ProblemSlide slide={slide} sectionTitle={sectionTitle} />;
    case "process":
      return <ProcessSlide slide={slide} sectionTitle={sectionTitle} />;
    case "comparison":
      return <ComparisonSlide slide={slide} sectionTitle={sectionTitle} />;
    case "metric":
      return <MetricSlide slide={slide} sectionTitle={sectionTitle} />;
    case "text-heavy":
      return <TextHeavySlide slide={slide} sectionTitle={sectionTitle} />;
    case "full-visual":
      return <FullVisualSlide slide={slide} sectionTitle={sectionTitle} />;
    case "outro":
      return <OutroSlide slide={slide} sectionTitle={sectionTitle} />;
    default:
      // 기본 레이아웃
      return <ProcessSlide slide={slide} sectionTitle={sectionTitle} />;
  }
}

// ============================================================================
// 모바일 안내 모달
// ============================================================================

function MobileBlockModal() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-white">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm rounded-2xl border p-6 shadow-xl"
        style={{
          backgroundColor: COLORS.white,
          borderColor: COLORS.green200,
        }}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: COLORS.green100 }}
          >
            <Monitor className="h-7 w-7" style={{ color: COLORS.primary }} />
          </div>
          <div>
            <h3
              className="text-xl font-semibold"
              style={{ color: COLORS.primaryDark }}
            >
              데스크탑에서 확인해주세요
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: COLORS.primary }}
            >
              포트폴리오는 더 나은 경험을 위해<br />
              데스크탑 환경에 최적화되어 있습니다.
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-2 w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: COLORS.primary }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 메인 페이지 컴포넌트
// ============================================================================

export default function PortfolioPage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [direction, setDirection] = useState(0); // -1: 왼쪽, 1: 오른쪽

  const currentSection = SECTIONS[currentSectionIndex];
  const currentSlide = currentSection.slides[currentSlideIndex];
  const totalSlides = currentSection.slides.length;

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 전체 슬라이드 인덱스 계산 (키보드 네비게이션용)
  const { flatIndex, totalFlatSlides } = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      idx += SECTIONS[i].slides.length;
    }
    idx += currentSlideIndex;

    const total = SECTIONS.reduce((acc, s) => acc + s.slides.length, 0);
    return { flatIndex: idx, totalFlatSlides: total };
  }, [currentSectionIndex, currentSlideIndex]);

  // 슬라이드 이동 함수
  const goToFlatIndex = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= totalFlatSlides) return;

    let accumulated = 0;
    for (let sIdx = 0; sIdx < SECTIONS.length; sIdx++) {
      const sectionSlideCount = SECTIONS[sIdx].slides.length;
      if (targetIndex < accumulated + sectionSlideCount) {
        const newSlideIndex = targetIndex - accumulated;
        setDirection(targetIndex > flatIndex ? 1 : -1);
        setCurrentSectionIndex(sIdx);
        setCurrentSlideIndex(newSlideIndex);
        return;
      }
      accumulated += sectionSlideCount;
    }
  }, [flatIndex, totalFlatSlides]);

  // 섹션 선택
  const handleSelectSection = useCallback((sectionIndex: number) => {
    let targetFlat = 0;
    for (let i = 0; i < sectionIndex; i++) {
      targetFlat += SECTIONS[i].slides.length;
    }
    goToFlatIndex(targetFlat);
  }, [goToFlatIndex]);

  // PDF 다운로드 핸들러
  const handleDownload = useCallback(() => {
    // TODO: PDF 다운로드 구현
    alert("PDF 다운로드 기능은 추후 구현 예정입니다.");
  }, []);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToFlatIndex(flatIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToFlatIndex(flatIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flatIndex, goToFlatIndex]);

  // 스크롤(휠) 네비게이션
  const lastWheelTimeRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const WHEEL_THROTTLE = 600; // 600ms 쓰로틀

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // 페이지 바운스 방지

      const now = Date.now();
      if (now - lastWheelTimeRef.current < WHEEL_THROTTLE) return;
      if (isScrollingRef.current) return;

      if (Math.abs(e.deltaY) > 20) {
        lastWheelTimeRef.current = now;
        isScrollingRef.current = true;

        if (e.deltaY > 0) {
          goToFlatIndex(flatIndex + 1);
        } else {
          goToFlatIndex(flatIndex - 1);
        }

        // 애니메이션 완료 후 스크롤 허용
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 400);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [flatIndex, goToFlatIndex]);

  // 로딩 중
  if (isMobile === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
          style={{ borderColor: COLORS.primary, borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  // 모바일
  if (isMobile) {
    return <MobileBlockModal />;
  }

  // 슬라이드 애니메이션 variants (페이드)
  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white" style={{ overscrollBehavior: "none" }}>
      {/* 상단 네비게이션 */}
      <header className="flex-shrink-0 px-6 pt-4 pb-2">
        <TopNav
          sections={SECTIONS}
          currentSectionIndex={currentSectionIndex}
          currentSlideIndex={currentSlideIndex}
          onSelectSection={handleSelectSection}
          onDownload={handleDownload}
        />
      </header>

      {/* 메인 슬라이드 영역 */}
      <main className="flex-1 min-h-0">
        <div className="h-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSectionIndex}-${currentSlideIndex}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Slide slide={currentSlide} sectionTitle={currentSection.title} />
            </motion.div>
          </AnimatePresence>

          {/* 좌우 화살표 버튼 */}
          {flatIndex > 0 && (
            <button
              onClick={() => goToFlatIndex(flatIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors hover:bg-black/5"
              aria-label="이전 슬라이드"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: COLORS.primaryDark }} />
            </button>
          )}
          {flatIndex < totalFlatSlides - 1 && (
            <button
              onClick={() => goToFlatIndex(flatIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors hover:bg-black/5"
              aria-label="다음 슬라이드"
            >
              <ChevronRight className="w-6 h-6" style={{ color: COLORS.primaryDark }} />
            </button>
          )}

          {/* 하단 진행률 표시 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm" style={{ color: COLORS.primary }}>
            {flatIndex + 1} / {totalFlatSlides}
          </div>
        </div>
      </main>
    </div>
  );
}
