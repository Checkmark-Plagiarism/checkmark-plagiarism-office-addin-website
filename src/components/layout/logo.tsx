import Image from "next/image";
import { LOGO_SRC } from "@/lib/links";

/** The Checkmark logo mark and wordmark, as on the public website's header and footer. */
export default function Logo({ light = false, size = 32 }: { light?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-2">
      <Image src={LOGO_SRC} alt="Checkmark Plagiarism logo" width={size} height={size} className="rounded-md" priority />
      <span className={`font-bold text-xl ${light ? "text-white" : "text-brand-700"}`}>Checkmark Plagiarism</span>
    </span>
  );
}
