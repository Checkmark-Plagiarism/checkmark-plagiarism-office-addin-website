import Image from "next/image";
import { LOGO_SRC } from "@/lib/links";

/**
 * The Checkmark logo and wordmark, drawn the way the public website draws them
 * (src/components/layout/header.tsx and footer.tsx there).
 *
 * The mark is a square PNG that already carries its own rounded corners, so it is shown as is.
 * Do not add `rounded-*` to the image: the site's radius token is 1rem, which turns a 32px or
 * 40px mark into a blob.
 */
export default function Logo({ light = false, variant = "header" }: { light?: boolean; variant?: "header" | "footer" }) {
  if (variant === "footer") {
    return (
      <span className="flex items-center gap-2">
        <Image src={LOGO_SRC} alt="Checkmark Plagiarism Logo" width={40} height={40} className="h-10 w-10" />
        <span className="font-bold text-2xl text-white">Checkmark Plagiarism</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <Image src={LOGO_SRC} alt="Checkmark Plagiarism Logo" width={50} height={50} priority />
      </span>
      <span className={`font-bold text-xl ${light ? "text-white" : "text-brand-700"}`}>Checkmark Plagiarism</span>
    </span>
  );
}
