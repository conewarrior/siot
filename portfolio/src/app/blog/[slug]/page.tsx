import { Header } from "@/components/header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const posts: Record<string, {
  title: string
  date: string
  category: string
  content: string
}> = {
  "building-design-system": {
    title: "처음부터 디자인 시스템 구축하기",
    date: "2024.12.28",
    category: "디자인",
    content: `
디자인 시스템은 단순한 컴포넌트 라이브러리 그 이상입니다. 제품의 시각적 언어, 인터랙션 패턴, 디자인 원칙을 담은 살아있는 문서입니다.

## 왜 디자인 시스템을 구축해야 할까요?

팀이 몇 명을 넘어서면 일관성 유지가 어려워집니다. 공유된 기반 없이는 디자이너와 개발자마다 조금씩 다른 결정을 내리게 되고, 이는 파편화된 사용자 경험으로 이어집니다.

잘 만들어진 디자인 시스템이 제공하는 것:

- **일관성** - 모든 터치포인트에서 통일된 경험
- **효율성** - 재사용 가능한 컴포넌트로 개발 속도 향상
- **확장성** - 제품이 성장해도 유지 가능한 구조
- **공유 어휘** - 디자인과 개발 간의 원활한 소통

## 작게 시작하기

팀이 범하는 가장 큰 실수는 한 번에 모든 것을 만들려고 하는 것입니다. 기본부터 시작하세요:

1. **컬러 팔레트** - 주요 색상, 보조 색상, 의미론적 색상 정의
2. **타이포그래피** - 타입 스케일과 폰트 패밀리 선택
3. **여백** - 일관된 스페이싱 시스템 구축
4. **컴포넌트** - 가장 많이 사용되는 UI 요소부터 제작

## 문서화가 핵심입니다

문서화 없는 디자인 시스템은 그냥 컴포넌트 폴더에 불과합니다. 각 요소가 *무엇*인지뿐만 아니라 *언제* 그리고 *어떻게* 사용해야 하는지 문서화하세요.

좋은 문서에는 다음이 포함됩니다:
- 사용 가이드라인
- 해야 할 것과 하지 말아야 할 것
- 코드 예시
- 접근성 고려사항

## 시간이 지나며 발전하기

디자인 시스템은 결코 "완성"되지 않습니다. 제품과 함께 진화하며, 팀의 피드백과 사용자 리서치에서 배운 것들을 반영해야 합니다.

목표는 완벽함이 아니라 발전입니다.
    `.trim(),
  },
  "minimal-interfaces": {
    title: "미니멀 인터페이스의 예술",
    date: "2024.12.15",
    category: "디자인",
    content: `
디자인에서의 미니멀리즘은 아무것도 남지 않을 때까지 제거하는 것이 아닙니다. 무엇이 주목받을 가치가 있는지 의도적으로 선택하고, 사용자에게 도움이 되지 않는 모든 것을 제거하는 것입니다.

## 선택의 역설

연구에 따르면 더 많은 옵션이 종종 더 나쁜 결정과 낮은 만족도로 이어집니다. 시각적 노이즈를 줄이고 선택지를 제한함으로써 사용자가 중요한 것에 집중하도록 도와줍니다.

## 시각적 계층구조

미니멀한 인터페이스에서 모든 요소는 자신의 자리를 증명해야 합니다. 이는 계층구조에 대해 신중하게 생각하도록 강제합니다:

- 주요 액션은 무엇인가?
- 필수 정보와 부가 정보는 무엇인가?
- 사용자의 시선을 어떻게 유도할 것인가?

## 여백의 힘

화이트 스페이스는 빈 공간이 아닙니다. 능동적입니다. 리듬을 만들고, 요소 간의 관계를 설정하며, 눈이 쉴 곳을 제공합니다.

넉넉한 마진과 패딩은 품질과 자신감을 전달합니다. 빽빽한 레이아웃은 불안하고 압도적으로 느껴집니다.

## 디테일

볼 것이 적을수록, 남아있는 것은 완벽해야 합니다. 타이포그래피, 정렬, 색상—미니멀리즘의 렌즈 아래에서 모든 디테일이 확대됩니다.

이것이 좋은 미니멀 디자인과 게으른 디자인을 구분 짓습니다. 미니멀은 쉽다는 것을 의미하지 않습니다.
    `.trim(),
  },
  "react-server-components": {
    title: "React 서버 컴포넌트 심층 분석",
    date: "2024.12.01",
    category: "개발",
    content: `
React 서버 컴포넌트는 React 애플리케이션에 대한 사고 방식의 근본적인 변화를 나타냅니다. 모든 것을 렌더링하기 위해 JavaScript를 클라이언트로 보내는 대신, 이제 컴포넌트를 서버에 유지할 수 있습니다.

## 문제점

전통적인 React 앱은 많은 JavaScript를 전송합니다. 코드 스플리팅을 사용하더라도, 사용자는 무엇인가 유용한 것을 보기 전에 상당한 양의 코드를 다운로드하고 파싱합니다.

## 해결책

서버 컴포넌트는 서버에서 실행되고 HTML을 클라이언트로 전송합니다. 클라이언트는 상호작용에 필요한 최소한의 JavaScript만 받습니다.

## 주요 이점

- **더 작은 번들** - 서버 컴포넌트는 번들에 0바이트를 추가
- **직접 데이터 접근** - API 라우트 없이 직접 데이터베이스 쿼리
- **스트리밍** - UI가 준비되는 대로 전송, 한 번에 모두가 아닌

## 클라이언트 컴포넌트를 사용해야 할 때

모든 것이 서버 컴포넌트일 필요는 없습니다. 다음을 위해서는 클라이언트 컴포넌트를 사용하세요:

- 인터랙티브 요소 (버튼, 폼)
- 브라우저 API (localStorage, geolocation)
- 상태와 이펙트

## 멘탈 모델

서버 컴포넌트를 기본값으로 생각하세요. 상호작용이 필요할 때만 클라이언트 컴포넌트로 "옵트인"하세요.

이 반전은 익숙해지는 데 시간이 걸리지만, 더 빠르고 간단한 애플리케이션으로 이어집니다.
    `.trim(),
  },
  "digital-typography": {
    title: "디지털 제품의 타이포그래피",
    date: "2024.11.20",
    category: "디자인",
    content: `
타이포그래피는 디지털 인터페이스의 기반입니다. 사용자와 소통하고, 계층구조를 설정하며, 브랜드 개성을 표현하는 방법입니다.

## 서체 선택하기

디지털 제품을 위한 폰트를 선택할 때 고려할 사항:

- **가독성** - 작은 크기와 화면에서의 가독성
- **문자 세트** - 다국어 지원을 위한 확장성
- **가변 굵기** - 유연성을 위한 다양한 웨이트
- **성능** - 로딩 시간과 파일 크기

## 타입 스케일

일관된 타입 스케일은 타이포그래피에 질서를 가져옵니다. 기본 크기에서 시작하여 수학적 비율을 사용해 다른 크기를 도출하세요.

일반적인 비율로는 1.25 (장3도), 1.333 (완전4도), 1.5 (완전5도)가 있습니다.

## 행간과 글줄 길이

행간은 가독성에 극적인 영향을 미칩니다. 본문 텍스트의 경우 폰트 크기의 1.5-1.7배가 적당합니다. 제목의 경우 더 좁은 행간 (1.1-1.3)이 종종 더 좋아 보입니다.

글줄 길이는 편안한 독서를 위해 45-75자 정도가 적당합니다.

## 서체 조합하기

여러 서체를 사용할 때:

- 대비가 핵심입니다—세리프와 산세리프를 조합
- 최대 2-3개의 폰트로 제한
- x높이와 비율을 고려

## 성능 고려사항

폰트는 렌더링 차단 리소스입니다. 다음을 통해 최적화하세요:

- 필요한 문자만 서브세팅
- font-display: swap 사용
- 중요한 폰트 프리로딩
    `.trim(),
  },
  "ai-apis": {
    title: "AI API로 개발하기",
    date: "2024.11.10",
    category: "개발",
    content: `
AI를 애플리케이션에 통합하는 것이 그 어느 때보다 접근하기 쉬워졌습니다. OpenAI, Anthropic 등의 API를 통해 단 몇 줄의 코드로 강력한 언어 기능을 추가할 수 있습니다.

## 시작하기

대부분의 AI API는 비슷한 패턴을 따릅니다:

1. API 키로 인증
2. 프롬프트 또는 메시지 배열 전송
3. 생성된 응답 수신

## 프롬프트 엔지니어링

출력의 품질은 입력에 크게 의존합니다. 좋은 프롬프트는:

- 원하는 형식과 내용에 대해 **구체적**
- 관련 배경으로 **맥락화**됨
- 원치 않는 출력을 방지하도록 **제약**됨

## 스트리밍 응답

더 나은 UX를 위해, 전체 응답을 기다리는 대신 토큰 단위로 스트리밍하세요. 이는 AI를 더 반응적이고 자연스럽게 느끼게 만듭니다.

## 에러 처리

AI API는 독특한 방식으로 실패할 수 있습니다:

- 속도 제한
- 토큰 한도 초과
- 안전 필터 트리거
- 모델 과부하

견고한 에러 처리와 폴백을 구축하세요.

## 비용 최적화

API 호출은 빠르게 누적됩니다. 다음을 통해 최적화하세요:

- 공통 응답 캐싱
- 적절한 경우 더 작은 모델 사용
- 응답의 최대 토큰 제한
- 가능할 때 요청 배칭

## 책임감 있는 사용

항상 AI 생성 콘텐츠의 영향을 고려하세요. 중요한 출력에 대해서는 사람의 검토를 포함하고, AI 관련 사항에 대해 사용자에게 투명하게 공개하세요.
    `.trim(),
  },
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <article className="w-full max-w-2xl mx-auto px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          블로그로 돌아가기
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-muted mb-4">
            <span className="uppercase tracking-wide">{post.category}</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{post.date}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-serif text-xl mt-10 mb-4 tracking-tight"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").filter((line) => line.startsWith("- "))
              return (
                <ul key={i} className="my-4 space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="text-muted leading-relaxed pl-4 border-l-2 border-border">
                      {item.replace("- ", "").split("**").map((part, k) =>
                        k % 2 === 1 ? (
                          <strong key={k} className="text-foreground font-medium">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </li>
                  ))}
                </ul>
              )
            }
            if (paragraph.match(/^\d\./)) {
              const items = paragraph.split("\n").filter((line) => line.match(/^\d\./))
              return (
                <ol key={i} className="my-4 space-y-2 list-decimal list-inside">
                  {items.map((item, j) => (
                    <li key={j} className="text-muted leading-relaxed">
                      {item.replace(/^\d\.\s*/, "").split("**").map((part, k) =>
                        k % 2 === 1 ? (
                          <strong key={k} className="text-foreground font-medium">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </li>
                  ))}
                </ol>
              )
            }
            return (
              <p key={i} className="text-muted leading-relaxed my-4">
                {paragraph}
              </p>
            )
          })}
        </div>
      </article>
    </main>
  )
}
