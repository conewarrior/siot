"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Mail, Github, ArrowUpRight } from "lucide-react";

// ============================================
// 데이터
// ============================================

const PROFILE = {
  name: "김한솔",
  role: "Product Designer & Developer",
  intro: [
    "사용자 경험과 비즈니스 목표를 연결하는 디자인을 만듭니다.",
    "데이터 기반의 의사결정과 체계적인 시스템으로 일관된 경험을 구축합니다.",
  ],
  email: "kimhansol307@gmail.com",
  github: "https://github.com/conewarrior",
};

const PROJECTS = [
  {
    id: "cro",
    title: "CRO 자동화",
    subtitle: "마케팅 분석 시간 70% 단축",
    color: "#F97316",
    company: "지피터스",
    period: "2024.12 - 2025.01",
    role: "UX 리서치 · 데이터 분석",
    heroImage: "/images/portfolio/cro/cro-hero.png",
    stats: [
      { label: "분석 시간", value: "70%↓", detail: "8h → 2.4h" },
      { label: "캠페인", value: "120+", detail: "전체 자동화" },
      { label: "인사이트", value: "실시간", detail: "주간→일간" },
    ],
    problem: {
      context: [
        "마케팅팀이 매주 120개 이상의 광고 캠페인 성과를 수동으로 분석 (주당 8시간 이상)",
        "GA4, Beusable 등 여러 툴에서 데이터를 수집해 엑셀로 취합하는 반복 작업",
        "Hero 섹션 CTR 39.9%인데 전환율 21.0%로 낮음 - 데이터가 있어도 인사이트 도출 시간 부족",
      ],
    },
    solution: {
      approach: [
        "Beusable 히트맵과 GA4 전환 데이터를 API로 자동 수집",
        "BigQuery에 통합 저장 후 Looker Studio로 실시간 대시보드 구축",
        "섹션별 Hover-to-Click 비율, 스크롤 뎁스 등 핵심 지표 자동 계산",
      ],
      images: ["/images/portfolio/cro/cro-dashboard.png"],
    },
    outcome: {
      metrics: [
        { label: "분석 시간 단축", value: "70%", change: "8h → 2.4h" },
        { label: "캠페인 분석 범위", value: "120+", change: "전체 자동화" },
        { label: "인사이트 도출 속도", value: "실시간", change: "주간→일간" },
      ],
      reflection: {
        strengths: ["자동화로 반복 작업 제거", "데이터 기반 의사결정 문화 정착"],
        improvements: ["초기 설계 시 확장성 고려 부족", "비개발자가 대시보드 설정 변경하기 어려움"],
      },
    },
  },
  {
    id: "labeling",
    title: "라벨링 UX",
    subtitle: "작업 시간 48% 단축",
    color: "#EC4899",
    company: "라벨러스",
    period: "2024.06 - 2024.09",
    role: "UX 디자인 · 사용성 개선",
    heroImage: "/images/portfolio/labeling/labeling-hero.png",
    stats: [
      { label: "작업 시간", value: "48%↓", detail: "4.5s → 2.3s" },
      { label: "단축키 사용률", value: "67%", detail: "12% → 67%" },
      { label: "일일 처리량", value: "+35%", detail: "3,200 → 4,320" },
    ],
    problem: {
      context: [
        "작업자들이 하루 8시간 동안 평균 3,200건의 이미지를 라벨링 (1건당 약 9초)",
        "클래스 선택에만 전체 작업 시간의 47%가 소요 (평균 4.2초/건)",
        "기존 단축키 사용률 단 12% - 대부분 마우스 클릭에 의존해 손목 피로 호소",
      ],
    },
    solution: {
      approach: [
        "자주 쓰는 도구에 직관적 단축키 할당: B(Bbox), P(Polygon), V(Select), Z(Undo)",
        "툴바에 단축키 힌트를 직접 노출해 학습 시간 3일→1일로 단축",
        "플로팅 툴바로 마우스 이동 거리 평균 340px → 120px 감소",
      ],
      images: ["/images/portfolio/labeling/labeling-008.png"],
    },
    outcome: {
      metrics: [
        { label: "작업 시간 단축", value: "48%", change: "4.5s → 2.3s" },
        { label: "단축키 사용률", value: "67%", change: "12% → 67%" },
        { label: "일일 처리량", value: "+35%", change: "3,200 → 4,320" },
      ],
      reflection: {
        strengths: ["사용자 관찰 기반 핵심 문제 도출", "단축키 재설계로 작업 효율 대폭 개선"],
        improvements: ["초기에 정량적 측정 기준을 더 명확히 했으면 개선 효과 증명이 수월했을 것"],
      },
    },
  },
  {
    id: "design-system",
    title: "디자인 시스템",
    subtitle: "협업 시간 20% 단축",
    color: "#7C3AED",
    company: "데이원컴퍼니 (패스트캠퍼스)",
    period: "2023.12 - 2024.03",
    role: "디자인 시스템 설계",
    heroImage: "/images/portfolio/design-system/ds-hero.png",
    stats: [
      { label: "디자인 토큰", value: "121개", detail: "체계화" },
      { label: "협업 시간", value: "20%↓", detail: "왕복 3회→1회" },
      { label: "개발자 질문", value: "-85%", detail: "구두→문서" },
    ],
    problem: {
      context: [
        "같은 색상에 3-4개의 다른 이름이 혼용 (예: primary, brand-main, main-blue)",
        "컴포넌트 스펙 전달 시 구두 설명에 의존해 디자인-개발 간 왕복 평균 3회",
        "디자인 변경 이력이 관리되지 않아 '왜 바뀌었는지' 추적 불가",
      ],
    },
    solution: {
      approach: [
        "WCAG 2.1 AA 기준 명도대비 4.5:1 이상 충족하는 10단계 스케일",
        "위치 기반(header-bg) → 용도 기반(color.bg.structural) 전환",
        "Properties 패널에 토큰명 직접 기재 - 개발자 질문 85% 감소",
      ],
      images: ["/images/portfolio/design-system/ds-010.png"],
    },
    outcome: {
      metrics: [
        { label: "디자인 토큰", value: "121개", change: "체계화" },
        { label: "협업 시간 단축", value: "20%", change: "왕복 3회→1회" },
        { label: "개발자 질문", value: "-85%", change: "구두→문서" },
      ],
      reflection: {
        strengths: ["WCAG 기준을 적용해 명도 대비 충족 여부를 객관화", "개발팀과 네이밍 규칙을 사전 합의"],
        improvements: ["신규 입사자 온보딩 문서가 부족", "기존 피그마 파일 마이그레이션에 예상보다 2주 추가 소요"],
      },
    },
  },
  {
    id: "ui-flow",
    title: "UI Flow 개선",
    subtitle: "기능 도달 시간 60% 단축",
    color: "#2563EB",
    company: "라인웍스",
    period: "2023.06 - 2023.09",
    role: "UX 설계 · IA 개선",
    heroImage: "/images/portfolio/ui-flow/flow-hero.png",
    stats: [
      { label: "도달 시간", value: "60%↓", detail: "8.5s → 3.4s" },
      { label: "메뉴 뎁스", value: "2단계", detail: "5 → 2" },
      { label: "사용자 문의", value: "-70%", detail: "12건/주 → 3건" },
    ],
    problem: {
      context: [
        "같은 기능에 도달하는 경로가 3-4개로 사용자 혼란 - '결재 어디서 하죠?' 문의 주 평균 12건",
        "HR 관련 기능이 3개 메뉴(조직도, 인사관리, 마이페이지)에 분산",
        "자주 쓰는 결재 기능이 5단계 깊이에 위치 - 도달까지 평균 8.5초 소요",
      ],
    },
    solution: {
      approach: [
        "Overview 통합 화면으로 상위 20% 자주 쓰는 기능 1클릭 접근",
        "7개 진입점 → 3개로 통합 (홈/업무/관리자)",
        "뎁스 5단계 → 2단계로 축소, 평균 도달 시간 8.5초 → 3.4초",
      ],
      images: ["/images/portfolio/ui-flow/flow-008.png"],
    },
    outcome: {
      metrics: [
        { label: "기능 도달 시간", value: "60%↓", change: "8.5s → 3.4s" },
        { label: "메뉴 뎁스", value: "2단계", change: "5 → 2" },
        { label: "사용자 문의", value: "-70%", change: "12건/주 → 3건" },
      ],
      reflection: {
        strengths: ["복잡한 플로우를 시각화해 문제점을 팀 전체가 공유", "5단계 → 2단계 단순화로 UX 개선 효과 명확히 입증"],
        improvements: ["레거시 기능 제거 시 기존 사용자 불만 대응 준비 부족"],
      },
    },
  },
];

// ============================================
// 히어로 인트로 섹션
// ============================================

function IntroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* 이름 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-muted text-sm font-medium tracking-widest uppercase mb-4"
        >
          Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-foreground mb-4"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted mb-8"
        >
          {PROFILE.role}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-2 mb-12"
        >
          {PROFILE.intro.map((line, i) => (
            <p key={i} className="text-foreground/70 text-lg">
              {line}
            </p>
          ))}
        </motion.div>

        {/* 프로젝트 프리뷰 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12"
        >
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.id}
              href={`#\${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative p-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:border-foreground/20 transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full mb-3"
                style={{ backgroundColor: project.color }}
              />
              <p className="font-medium text-foreground text-sm mb-1">
                {project.title}
              </p>
              <p className="text-xs text-muted">
                {project.subtitle}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-muted" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================
// 프로젝트 히어로 섹션 (전체 화면, 컬러 배경)
// ============================================

interface ProjectHeroProps {
  project: typeof PROJECTS[0];
}

function ProjectHero({ project }: ProjectHeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={project.id}
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: project.color }}
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 좌측: 텍스트 */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white/60 text-sm font-medium mb-2">
                {project.company} · {project.period}
              </p>
              <p className="text-white/80 text-sm mb-6">
                {project.role}
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {project.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-8"
            >
              {project.subtitle}
            </motion.p>

            {/* 주요 지표 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              {project.stats.map((stat, i) => (
                <div key={i} className="text-white">
                  <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="text-xs text-white/40">{stat.detail}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 우측: 이미지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 프로젝트 상세 섹션
// ============================================

interface ProjectDetailProps {
  project: typeof PROJECTS[0];
}

function ProjectDetail({ project }: ProjectDetailProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* 문제 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-sm font-medium text-muted uppercase tracking-widest mb-4">
            Problem
          </h3>
          <div className="space-y-3">
            {project.problem.context.map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="text-foreground/80 text-lg leading-relaxed pl-4 border-l-2 border-muted/30"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* 해결 방법 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-sm font-medium text-muted uppercase tracking-widest mb-4">
            Solution
          </h3>
          <div className="space-y-3">
            {project.solution.approach.map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="text-foreground/80 text-lg leading-relaxed pl-4 border-l-2"
                style={{ borderColor: project.color }}
              >
                {item}
              </motion.p>
            ))}
          </div>

          {/* 스크린샷 */}
          {project.solution.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 rounded-xl overflow-hidden border border-border"
            >
              <Image
                src={project.solution.images[0]}
                alt={`\${project.title} 솔루션`}
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </motion.div>
          )}
        </motion.div>

        {/* 회고 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="p-6 rounded-xl bg-secondary/30">
            <h4 className="text-sm font-medium text-foreground mb-4">잘한 점</h4>
            <ul className="space-y-2">
              {project.outcome.reflection.strengths.map((item, i) => (
                <li key={i} className="text-sm text-muted flex items-start gap-2">
                  <span className="text-green-500 mt-1">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-secondary/30">
            <h4 className="text-sm font-medium text-foreground mb-4">개선할 점</h4>
            <ul className="space-y-2">
              {project.outcome.reflection.improvements.map((item, i) => (
                <li key={i} className="text-sm text-muted flex items-start gap-2">
                  <span className="text-amber-500 mt-1">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// About 섹션
// ============================================

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-foreground">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
            Thank You
          </h2>
          <p className="text-background/60 text-lg">
            새로운 프로젝트, 협업 제안, 또는 단순한 대화도 환영합니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`mailto:\${PROFILE.email}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-background/30 text-background font-medium hover:bg-background/10 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-background/40 text-sm mt-16"
        >
          이 포트폴리오는 Next.js와 Framer Motion으로 제작되었습니다.
        </motion.p>
      </div>
    </section>
  );
}

// ============================================
// 메인 페이지
// ============================================

export default function PortfolioPage() {
  return (
    <main className="bg-background">
      <IntroSection />

      {PROJECTS.map((project) => (
        <div key={project.id}>
          <ProjectHero project={project} />
          <ProjectDetail project={project} />
        </div>
      ))}

      <AboutSection />
    </main>
  );
}
