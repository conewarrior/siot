import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";

interface ContactLink {
  type: "email" | "github" | "linkedin" | "other";
  label: string;
  href: string;
}

interface ContactSlideProps {
  children?: ReactNode;
  className?: string;
  /** 제목 */
  heading?: string;
  /** 서브텍스트 */
  subtext?: string;
  /** 연락처 링크 목록 */
  links?: ContactLink[];
  /** 추가 메시지 */
  message?: string;
  /** 테마 색상 */
  accentColor?: string;
}

const iconMap = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  other: ExternalLink,
};

/**
 * 연락처 슬라이드 컴포넌트
 * Thank You 페이지용 - 연락처, CTA 표시
 */
export function ContactSlide({
  children,
  className,
  heading = "Thank You",
  subtext,
  links,
  message,
  accentColor = "#FACC15",
}: ContactSlideProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8",
        "w-full h-full p-12",
        "text-center",
        className
      )}
    >
      {/* 제목 */}
      <div className="space-y-3">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ color: accentColor }}
        >
          {heading}
        </h2>
        {subtext && (
          <p className="text-base md:text-lg text-muted max-w-md">
            {subtext}
          </p>
        )}
      </div>

      {/* 연락처 링크 */}
      {links && links.length > 0 && (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {links.map((link, index) => {
            const IconComponent = iconMap[link.type];
            return (
              <a
                key={index}
                href={link.href}
                target={link.type !== "email" ? "_blank" : undefined}
                rel={link.type !== "email" ? "noopener noreferrer" : undefined}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 rounded-xl",
                  "bg-secondary/50 border border-border/50",
                  "hover:bg-secondary/80 hover:border-border transition-colors",
                  "group"
                )}
              >
                <IconComponent
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: accentColor }}
                />
                <span className="text-sm font-medium text-foreground flex-1 text-left">
                  {link.label}
                </span>
                <ExternalLink className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })}
        </div>
      )}

      {/* 추가 메시지 */}
      {message && (
        <p className="text-xs text-muted/70 italic mt-4">
          {message}
        </p>
      )}

      {children}
    </div>
  );
}

export type { ContactSlideProps, ContactLink };
