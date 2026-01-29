export interface ToolkitItem {
  name: string
  slug: string
  type: "command" | "skill" | "agent"
  description: string
  icon: string
  year: string
  link?: string
}

// 타입별 색상 매핑
export const typeColors: Record<ToolkitItem["type"], string> = {
  command: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  skill: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  agent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
}

export const typeLabels: Record<ToolkitItem["type"], string> = {
  command: "command",
  skill: "skill",
  agent: "agent",
}

const BASE_URL = "https://github.com/conewarrior/siot-claude-toolkit/tree/main"

export const toolkitItems: ToolkitItem[] = [
  // Commands (16개)
  {
    name: "ask-question",
    slug: "ask-question",
    type: "command",
    description: "MD 파일을 읽고 심층 인터뷰를 통해 스펙을 완성",
    icon: "❓",
    year: "2025",
    link: `${BASE_URL}/commands/commands/ask-question.md`,
  },
  {
    name: "cheatsheet",
    slug: "cheatsheet",
    type: "command",
    description: "자주 쓰는 명령어 모음",
    icon: "📝",
    year: "2025",
    link: `${BASE_URL}/commands/commands/cheatsheet.md`,
  },
  {
    name: "cleanup-ui",
    slug: "cleanup-ui",
    type: "command",
    description: "UI 코드 구조 정리 및 최적화",
    icon: "🧹",
    year: "2025",
    link: `${BASE_URL}/commands/commands/cleanup-ui.md`,
  },
  {
    name: "dev-cycle",
    slug: "dev-cycle",
    type: "command",
    description: "PRD부터 개발, 리뷰, 학습까지 전체 개발 사이클 자동 실행",
    icon: "🔄",
    year: "2025",
    link: `${BASE_URL}/commands/commands/dev-cycle.md`,
  },
  {
    name: "global-hooks",
    slug: "global-hooks",
    type: "command",
    description: "GitHub에서 스킬 Hook 설정을 글로벌에 설치",
    icon: "🪝",
    year: "2025",
    link: `${BASE_URL}/commands/commands/global-hooks.md`,
  },
  {
    name: "global-plugin",
    slug: "global-plugin",
    type: "command",
    description: "플러그인을 전역에 설치",
    icon: "🔌",
    year: "2025",
    link: `${BASE_URL}/commands/commands/global-plugin.md`,
  },
  {
    name: "init-claude",
    slug: "init-claude",
    type: "command",
    description: "CLAUDE.md 초기화 및 프로젝트 설정",
    icon: "📋",
    year: "2025",
    link: `${BASE_URL}/commands/commands/init-claude.md`,
  },
  {
    name: "install-agent",
    slug: "install-agent",
    type: "command",
    description: "GitHub에서 에이전트를 현재 프로젝트에 설치",
    icon: "🤖",
    year: "2025",
    link: `${BASE_URL}/commands/commands/install-agent.md`,
  },
  {
    name: "install-command",
    slug: "install-command",
    type: "command",
    description: "GitHub에서 커맨드를 현재 프로젝트에 설치",
    icon: "⬇️",
    year: "2025",
    link: `${BASE_URL}/commands/commands/install-command.md`,
  },
  {
    name: "install-skill",
    slug: "install-skill",
    type: "command",
    description: "GitHub에서 스킬을 현재 프로젝트에 설치하고 hook까지 자동 등록",
    icon: "📦",
    year: "2025",
    link: `${BASE_URL}/commands/commands/install-skill.md`,
  },
  {
    name: "parallel-dev",
    slug: "parallel-dev",
    type: "command",
    description: "Development Guide의 병렬 작업을 서브에이전트로 동시 실행",
    icon: "⚡",
    year: "2025",
    link: `${BASE_URL}/commands/commands/parallel-dev.md`,
  },
  {
    name: "publish-agent",
    slug: "publish-agent",
    type: "command",
    description: "현재 프로젝트의 에이전트를 GitHub에 업로드",
    icon: "🚀",
    year: "2025",
    link: `${BASE_URL}/commands/commands/publish-agent.md`,
  },
  {
    name: "publish-command",
    slug: "publish-command",
    type: "command",
    description: "현재 프로젝트의 커맨드를 GitHub에 업로드",
    icon: "📤",
    year: "2025",
    link: `${BASE_URL}/commands/commands/publish-command.md`,
  },
  {
    name: "publish-skill",
    slug: "publish-skill",
    type: "command",
    description: "현재 프로젝트의 스킬을 GitHub에 업로드하고 마켓플레이스에 등록",
    icon: "🎁",
    year: "2025",
    link: `${BASE_URL}/commands/commands/publish-skill.md`,
  },
  {
    name: "register-skill",
    slug: "register-skill",
    type: "command",
    description: "새 스킬의 Hook과 권한을 settings.local.json에 자동 등록",
    icon: "🔧",
    year: "2025",
    link: `${BASE_URL}/commands/commands/register-skill.md`,
  },
  {
    name: "write-blog",
    slug: "write-blog",
    type: "command",
    description: "경험/주제를 설명하면 블로그 형식에 맞는 MDX 초안을 생성",
    icon: "✍️",
    year: "2025",
    link: `${BASE_URL}/commands/write-blog.md`,
  },

  // Skills (7개)
  {
    name: "blog-writer",
    slug: "blog-writer",
    type: "skill",
    description: "튜토리얼/경험 공유 스타일의 기술 블로그 작성 가이드",
    icon: "📰",
    year: "2025",
    link: `${BASE_URL}/skills/blog-writer`,
  },
  {
    name: "canvas-design",
    slug: "canvas-design",
    type: "skill",
    description: "캔버스 기반 디자인 작업 지원",
    icon: "🎨",
    year: "2025",
    link: `${BASE_URL}/skills/canvas-design`,
  },
  {
    name: "design-system",
    slug: "design-system",
    type: "skill",
    description: "디자인 토큰 계층 구조와 컴포넌트 라이브러리를 체계적으로 구축",
    icon: "🎯",
    year: "2025",
    link: `${BASE_URL}/skills/design-system`,
  },
  {
    name: "doc-coauthoring",
    slug: "doc-coauthoring",
    type: "skill",
    description: "문서 공동 작성 및 협업 지원",
    icon: "📝",
    year: "2025",
    link: `${BASE_URL}/skills/doc-coauthoring`,
  },
  {
    name: "frontend-design",
    slug: "frontend-design",
    type: "skill",
    description: "높은 디자인 퀄리티의 프론트엔드 인터페이스 생성",
    icon: "🖼️",
    year: "2025",
    link: `${BASE_URL}/skills/frontend-design`,
  },
  {
    name: "pdf",
    slug: "pdf",
    type: "skill",
    description: "PDF 텍스트/테이블 추출, 생성, 병합/분할, 폼 처리",
    icon: "📄",
    year: "2025",
    link: `${BASE_URL}/skills/pdf`,
  },
  {
    name: "pptx",
    slug: "pptx",
    type: "skill",
    description: "PowerPoint 프레젠테이션 생성 및 편집",
    icon: "📊",
    year: "2025",
    link: `${BASE_URL}/skills/pptx`,
  },

  // Agents (3개)
  {
    name: "codify",
    slug: "codify",
    type: "agent",
    description: "개발 과정에서 학습한 패턴과 규칙을 CLAUDE.md에 명문화",
    icon: "📚",
    year: "2025",
    link: `${BASE_URL}/agents/codify`,
  },
  {
    name: "prd-to-dev",
    slug: "prd-to-dev",
    type: "agent",
    description: "PRD 문서를 읽고 병렬 작업이 명시된 Development Guide를 생성",
    icon: "📐",
    year: "2025",
    link: `${BASE_URL}/agents/prd-to-dev`,
  },
  {
    name: "reviewer",
    slug: "reviewer",
    type: "agent",
    description: "개발 완료 후 코드 품질 검토, 문제점 식별, 단순화 수행",
    icon: "🔍",
    year: "2025",
    link: `${BASE_URL}/agents/reviewer`,
  },
]

// 최신 등록순 정렬 (현재는 모두 2025년이므로 원래 순서 유지)
export function getRecentToolkitItems(count: number = 6): ToolkitItem[] {
  return toolkitItems.slice(0, count)
}

// 타입별 필터링
export function getToolkitItemsByType(type: ToolkitItem["type"]): ToolkitItem[] {
  return toolkitItems.filter((item) => item.type === type)
}
