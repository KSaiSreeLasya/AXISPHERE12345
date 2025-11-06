import { useEffect } from "react";

interface MetaTagsConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
}

export function useMetaTags(config: MetaTagsConfig) {
  useEffect(() => {
    // Update page title
    document.title = config.title;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      isProperty = false,
    ) => {
      const attribute = isProperty ? "property" : "name";
      let tag = document.querySelector(
        `meta[${attribute}="${name}"]`,
      ) as HTMLMetaElement | null;

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Standard meta tags
    updateMetaTag("description", config.description);
    if (config.keywords) {
      updateMetaTag("keywords", config.keywords);
    }
    if (config.robots) {
      updateMetaTag("robots", config.robots);
    }

    // Open Graph tags
    updateMetaTag("og:title", config.ogTitle || config.title, true);
    updateMetaTag(
      "og:description",
      config.ogDescription || config.description,
      true,
    );
    updateMetaTag("og:url", config.ogUrl || window.location.href, true);
    if (config.ogImage) {
      updateMetaTag("og:image", config.ogImage, true);
    }

    // Twitter tags
    updateMetaTag("twitter:title", config.twitterTitle || config.title);
    updateMetaTag(
      "twitter:description",
      config.twitterDescription || config.description,
    );
    updateMetaTag("twitter:card", "summary_large_image");
    if (config.twitterImage) {
      updateMetaTag("twitter:image", config.twitterImage);
    }

    // Canonical URL
    if (config.canonical) {
      let canonicalLink = document.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = config.canonical;
    }
  }, [config]);
}
