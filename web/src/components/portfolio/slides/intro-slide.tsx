import { cn } from "@/lib/utils";
import { Grid } from "@/components/portfolio/grid";
import { Hero, H2, Body, Caption } from "@/components/portfolio/typography";
import { Mail, Github, Linkedin } from "lucide-react";

interface IntroSlideProps {
  name: string;
  role: string;
  intro: string[];
  links: { type: string; label: string; href: string }[];
  projects: { title: string; highlight: string; color: string }[];
  className?: string;
}

const iconMap: Record<string, typeof Mail> = {
  email: Mail,
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
};

export function IntroSlide({
  name,
  role,
  intro,
  links,
  projects,
  className,
}: IntroSlideProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center p-8 md:p-12",
        className
      )}
    >
      <Grid cols="4-8" gap="lg" align="start" className="w-full">
        {/* 좌측 영역: 이름, 직함, 연락처 */}
        <div className="flex flex-col">
          <Hero>{name}</Hero>
          <H2 className="mt-2 text-muted">{role}</H2>

          <hr className="my-6 border-border" />

          {/* 연락처 */}
          <div className="flex flex-col gap-3">
            {links.map((link, index) => {
              const Icon = iconMap[link.type.toLowerCase()] || Mail;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4 text-muted group-hover:text-accent" />
                  <Caption className="group-hover:text-accent">
                    {link.label}
                  </Caption>
                </a>
              );
            })}
          </div>
        </div>

        {/* 우측 영역: 소개문, 프로젝트 목록 */}
        <div className="flex flex-col">
          {/* 소개문 */}
          <div className="mb-8 space-y-2">
            {intro.map((line, index) => (
              <Body key={index}>{line}</Body>
            ))}
          </div>

          {/* 프로젝트 목록 */}
          <div className="space-y-3">
            <Caption className="text-muted">Projects</Caption>
            <ul className="space-y-2">
              {projects.map((project, index) => (
                <li
                  key={index}
                  className="flex items-baseline gap-2 text-base"
                >
                  <span className="text-muted">{String(index + 1).padStart(2, "0")}.</span>
                  <span className="text-foreground">{project.title}</span>
                  <span className="text-muted">—</span>
                  <span style={{ color: project.color }}>
                    {project.highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Grid>
    </div>
  );
}
