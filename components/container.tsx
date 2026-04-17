export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-2xl mx-auto px-8 py-24 sm:py-32">{children}</main>
  );
}
