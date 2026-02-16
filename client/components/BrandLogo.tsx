import { useEffect, useMemo, useState } from "react";

interface BrandLogoProps {
  className?: string;
  alt?: string;
}

const LOGO_DARK =
  "https://cdn.builder.io/api/v1/image/assets%2F59bf3e928fc9473a97d5e87470c824bb%2F1809671e77ec4104926014b2da4baf41?format=webp&width=1600";
const LOGO_LIGHT =
  "https://cdn.builder.io/api/v1/image/assets%2F59bf3e928fc9473a97d5e87470c824bb%2F371dc2f47d9148b097176fb26df84f2d?format=webp&width=800";

export default function BrandLogo({
  className = "h-10 w-auto",
  alt = "Brand logo",
}: BrandLogoProps) {
  const getInitialDark = () =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const [isDark, setIsDark] = useState<boolean>(getInitialDark());

  useEffect(() => {
    const handler = () => setIsDark(getInitialDark());
    window.addEventListener("theme-change", handler as EventListener);
    // Fallback: observe class changes on <html>
    const observer = new MutationObserver(handler);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      window.removeEventListener("theme-change", handler as EventListener);
      observer.disconnect();
    };
  }, []);

  const src = useMemo(() => (isDark ? LOGO_DARK : LOGO_LIGHT), [isDark]);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-contain`}
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
  );
}
