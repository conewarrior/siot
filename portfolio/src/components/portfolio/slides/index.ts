// 슬라이드 타입별 템플릿 컴포넌트
export { CoverSlide, type CoverSlideProps } from "./cover-slide";
export { ProblemSlide, type ProblemSlideProps } from "./problem-slide";
export { ProcessSlide, type ProcessSlideProps } from "./process-slide";
export {
  OutcomeSlide,
  type OutcomeSlideProps,
  type Metric,
  type ReflectionItem,
} from "./outcome-slide";
export {
  ReflectionSlide,
  type ReflectionSlideProps,
  type Insight,
  type TimelineItem,
} from "./reflection-slide";
export {
  ProfileSlide,
  type ProfileSlideProps,
  type Skill,
} from "./profile-slide";
export {
  ContactSlide,
  type ContactSlideProps,
  type ContactLink,
} from "./contact-slide";
export {
  EpilogueSlide,
  type EpilogueSlideProps,
  type Skill as EpilogueSkill,
  type ContactLink as EpilogueContactLink,
} from "./epilogue-slide";
export {
  ScreenshotGallery,
  BeforeAfterComparison,
  type ScreenshotItem,
  type ScreenshotGalleryProps,
  type BeforeAfterProps,
} from "./screenshot-gallery";
