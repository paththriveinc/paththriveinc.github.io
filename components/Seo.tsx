import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  organizationSchema,
  websiteSchema,
} from '../seo';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string[];
  schema?: Array<Record<string, unknown>>;
}

const ensureMetaTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const ensureLinkTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const Seo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  keywords = DEFAULT_KEYWORDS,
  schema = [],
}: SeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const resolvedPath = path ?? location.pathname;
    const canonicalUrl = new URL(resolvedPath, SITE_URL).toString();
    const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
    const schemaGraph = [organizationSchema, websiteSchema, ...schema];

    document.documentElement.lang = 'en';
    document.title = title;

    ensureMetaTag('meta[name="description"]', { name: 'description', content: description });
    ensureMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    ensureMetaTag('meta[name="robots"]', { name: 'robots', content: robots });
    ensureMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    ensureMetaTag('meta[property="og:type"]', { property: 'og:type', content: type });
    ensureMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    ensureMetaTag('meta[property="og:image"]', { property: 'og:image', content: image });
    ensureMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    ensureLinkTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    let schemaNode = document.head.querySelector<HTMLScriptElement>('script[data-seo-schema="true"]');
    if (!schemaNode) {
      schemaNode = document.createElement('script');
      schemaNode.type = 'application/ld+json';
      schemaNode.setAttribute('data-seo-schema', 'true');
      document.head.appendChild(schemaNode);
    }
    schemaNode.textContent = JSON.stringify(schemaGraph);
  }, [description, image, keywords, location.pathname, noindex, path, schema, title, type]);

  return null;
};

export default Seo;
