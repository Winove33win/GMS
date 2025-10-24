import React from 'react';

type PersonCardProps = {
  name: string;
  role: string;
  description: string;
  location?: string;
  link?: string;
};

const PersonCard: React.FC<PersonCardProps> = ({ name, role, description, location, link }) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    link ? (
      <a
        href={link}
        className="block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        {children}
      </a>
    ) : (
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">{children}</div>
    );

  return (
    <Wrapper>
      <h3 className="text-lg font-semibold text-brand-dark">{name}</h3>
      <p className="text-sm font-medium text-brand-green">{role}</p>
      <p className="mt-2 text-sm text-neutral-600">{description}</p>
      {location && <p className="mt-3 text-xs uppercase tracking-wide text-neutral-500">{location}</p>}
    </Wrapper>
  );
};

export default PersonCard;
