import { cn } from "@/lib/utils";
import { ElementType, ComponentPropsWithoutRef } from "react";

/**
 * 타이포그래피 시스템
 *
 * 포트폴리오 전체에서 일관된 텍스트 스타일링을 위한 컴포넌트
 */

export type TypoVariant = "hero" | "h1" | "h2" | "body" | "caption";

export const variantStyles: Record<TypoVariant, string> = {
  hero: "text-6xl font-bold leading-tight text-foreground",
  h1: "text-4xl font-bold leading-snug text-foreground",
  h2: "text-2xl font-semibold leading-snug text-foreground",
  body: "text-base font-normal leading-relaxed text-foreground/80",
  caption: "text-sm font-medium leading-normal text-muted",
};

type TextProps<T extends ElementType = "p"> = {
  variant: TypoVariant;
  children: React.ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "children">;

export function Text<T extends ElementType = "p">({
  variant,
  children,
  className,
  as,
  ...props
}: TextProps<T>) {
  const Component = as || "p";
  return (
    <Component className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Component>
  );
}

// 시맨틱 래퍼 컴포넌트
interface SemanticTextProps {
  children: React.ReactNode;
  className?: string;
}

export function Hero({ children, className }: SemanticTextProps) {
  return (
    <Text variant="hero" as="h1" className={className}>
      {children}
    </Text>
  );
}

export function H1({ children, className }: SemanticTextProps) {
  return (
    <Text variant="h1" as="h1" className={className}>
      {children}
    </Text>
  );
}

export function H2({ children, className }: SemanticTextProps) {
  return (
    <Text variant="h2" as="h2" className={className}>
      {children}
    </Text>
  );
}

export function Body({ children, className }: SemanticTextProps) {
  return (
    <Text variant="body" as="p" className={className}>
      {children}
    </Text>
  );
}

export function Caption({ children, className }: SemanticTextProps) {
  return (
    <Text variant="caption" as="span" className={className}>
      {children}
    </Text>
  );
}
