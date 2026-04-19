export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-2xl mx-auto px-8 py-16 sm:py-20">{children}</main>
  );
}
