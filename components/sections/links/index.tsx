import { Link } from "@/components/ui/link";

export function Links() {
  return (
    <section className="flex gap-x-6">
      <Link href="https://github.com/stylessh" target="_blank">
        GitHub
      </Link>
      <Link href="https://x.com/stylesshDev" target="_blank">
        X (Twitter)
      </Link>
      <Link href="mailto:adaaanniek@gmail.com">Mail</Link>
    </section>
  );
}
