export const SITE_URL = 'https://paththriveinc.github.io';
export const SITE_NAME = 'PathThrive';
export const DEFAULT_TITLE = 'PathThrive | Job Search Support, Resume Help & Application Services';
export const DEFAULT_DESCRIPTION = 'PathThrive helps job seekers land interviews faster with ATS-friendly resumes, LinkedIn optimization, hands-on job application support, and career coaching.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/social-share.svg`;
export const DEFAULT_KEYWORDS = [
  'job search support',
  'resume writing services',
  'ATS-friendly resume',
  'LinkedIn optimization',
  'job application help',
  'career coaching',
  'PathThrive',
];

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'paththriveinc@gmail.com',
      telephone: '+1-732-668-6171',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const buildBreadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
