import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description: string;
};

export function Seo({ title, description }: SeoProps) {
  const siteName = 'GMS Mentoria Solidária';
  const fullTitle = title.includes('GMS') ? title : `${title} • ${siteName}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
