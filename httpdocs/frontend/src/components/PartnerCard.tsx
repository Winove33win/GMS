import React from 'react';

type PartnerCardProps = {
  name: string;
  type: string;
  description: string;
  link?: string;
};

const PartnerCard: React.FC<PartnerCardProps> = ({ name, type, description, link }) => {
  const content = (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-wide text-neutral-500">{type}</p>
        <h3 className="text-lg font-semibold text-brand-dark">{name}</h3>
      </div>
      <p className="text-sm text-neutral-600 flex-1">{description}</p>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block h-full transition hover:-translate-y-1 hover:shadow-lg">
        {content}
      </a>
    );
  }

  return content;
};

export default PartnerCard;
