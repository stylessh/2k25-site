import Script from "next/script";

const SOURCE = `
(function () {
  function apply(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  apply(mq.matches);
  mq.addEventListener("change", function (e) {
    apply(e.matches);
  });
})();
`;

export function ThemeScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {SOURCE}
    </Script>
  );
}
