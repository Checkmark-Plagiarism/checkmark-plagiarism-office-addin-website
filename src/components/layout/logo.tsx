import Image from "next/image";
import { LOGO_SRC } from "@/lib/links";

const SIZES = {
  sm: { mark: "h-8 w-8", px: 32, word: "text-xl" },
  md: { mark: "h-10 w-10", px: 40, word: "text-2xl" },
  lg: { mark: "h-12 w-12 sm:h-14 sm:w-14", px: 56, word: "text-2xl sm:text-3xl" },
} as const;

/**
 * The Checkmark logo and wordmark.
 *
 * The mark is a square PNG that already carries its own rounded corners, so it is shown as is,
 * the way the public website's footer shows it. Do not add `rounded-*` to the image: this site's
 * radius token is 1rem, which turns a 32px or 40px mark into a blob.
 */
export default function Logo({
  size = "md",
  tone = "dark",
  priority = false,
}: {
  size?: keyof typeof SIZES;
  /** "dark" for the wordmark on a light background, "light" on a dark one. */
  tone?: "dark" | "light";
  priority?: boolean;
}) {
  const s = SIZES[size];
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={LOGO_SRC}
        alt="Checkmark Plagiarism logo"
        width={s.px}
        height={s.px}
        className={s.mark}
        priority={priority}
      />
      <span className={`font-bold ${s.word} ${tone === "light" ? "text-white" : "text-brand-700"}`}>
        Checkmark Plagiarism
      </span>
    </span>
  );
}
