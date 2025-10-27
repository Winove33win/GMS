import type { SVGProps } from "react";

const baseProps = {
  width: 120,
  height: 36,
  viewBox: "0 0 120 36",
  fill: "none",
};

function svgProps(props: SVGProps<SVGSVGElement>) {
  return { ...baseProps, ...props };
}

export function LogoInstitutoAurora(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps(props)}>
      <rect x={4} y={6} width={16} height={24} rx={8} fill="currentColor" opacity={0.15} />
      <path
        d="M12 10c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x={36} y={22} fontFamily="'Inter', sans-serif" fontSize={14} fontWeight={600} letterSpacing={1.2} fill="currentColor">
        AURORA
      </text>
    </svg>
  );
}

export function LogoImpactLab(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps(props)}>
      <path
        d="M12 8 4 28h16L12 8Zm26 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M44 18h8m6 0h8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <text x={72} y={22} fontFamily="'Inter', sans-serif" fontSize={13} fontWeight={600} letterSpacing={1} fill="currentColor">
        IMPACT LAB
      </text>
    </svg>
  );
}

export function LogoHorizonte(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps(props)}>
      <path
        d="M8 22c2.5-6 6.5-9 12-9s9.5 3 12 9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M4 26h32" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <text x={44} y={23} fontFamily="'Inter', sans-serif" fontSize={14} fontWeight={600} letterSpacing={1.2} fill="currentColor">
        HORIZONTE
      </text>
    </svg>
  );
}

export function LogoColetivoRaiz(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps(props)}>
      <circle cx={12} cy={18} r={10} stroke="currentColor" strokeWidth={2} />
      <path
        d="M12 8v8l4 4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 26h20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <text x={36} y={23} fontFamily="'Inter', sans-serif" fontSize={13} fontWeight={600} letterSpacing={1.1} fill="currentColor">
        COLETIVO RAIZ
      </text>
    </svg>
  );
}

export function LogoEcoViva(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps(props)}>
      <path
        d="M12 10c-4 3-6 7-6 11 0 4 2.5 7 6 7s6-3 6-7c0-4-2-8-6-11Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M12 12c2 1.2 4.5 1.6 8 .8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <text x={36} y={22} fontFamily="'Inter', sans-serif" fontSize={14} fontWeight={600} letterSpacing={1.2} fill="currentColor">
        ECO VIVA
      </text>
    </svg>
  );
}

export function LogoRedeFuturo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps(props)}>
      <rect x={2} y={8} width={20} height={20} rx={6} stroke="currentColor" strokeWidth={2} />
      <path d="M6 18h12M12 12v12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <text x={36} y={22} fontFamily="'Inter', sans-serif" fontSize={13} fontWeight={600} letterSpacing={1.1} fill="currentColor">
        REDE FUTURO
      </text>
    </svg>
  );
}

export function LogoInovaCidade(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps(props)}>
      <path d="M6 26V10l6 4 6-4v16" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
      <path d="M2 26h20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <text x={36} y={22} fontFamily="'Inter', sans-serif" fontSize={13} fontWeight={600} letterSpacing={1.2} fill="currentColor">
        INOVA CIDADE
      </text>
    </svg>
  );
}

export function LogoCruzadaSocial(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps(props)}>
      <circle cx={12} cy={18} r={10} fill="currentColor" opacity={0.12} />
      <path d="M12 10v16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <text x={36} y={22} fontFamily="'Inter', sans-serif" fontSize={13} fontWeight={600} letterSpacing={1.2} fill="currentColor">
        CRUZADA SOCIAL
      </text>
    </svg>
  );
}

export const partnerLogoComponents = {
  LogoInstitutoAurora,
  LogoImpactLab,
  LogoHorizonte,
  LogoColetivoRaiz,
  LogoEcoViva,
  LogoRedeFuturo,
  LogoInovaCidade,
  LogoCruzadaSocial,
};

export type PartnerLogoName = keyof typeof partnerLogoComponents;
