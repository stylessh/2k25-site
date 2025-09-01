export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[682px] mr-auto ml-16 px-6 py-16 flex flex-col gap-y-16">
      {children}
    </div>
  );
}
