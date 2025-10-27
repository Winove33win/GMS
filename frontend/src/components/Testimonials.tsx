import { Card } from "@/components/Card";

const testimonials = [
  {
    quote: "Objetividade e mãos à obra. Em poucas semanas saímos do papel.",
    author: "Coordenador de projeto social",
  },
  {
    quote: "A mentoria abriu portas e trouxe clareza.",
    author: "Empreendedora de impacto",
  },
  {
    quote: "Troca generosa e técnica, do jeito que precisávamos.",
    author: "ONG parceira",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.quote} elevated>
          <p className="text-lg font-semibold text-brand-dark">“{testimonial.quote}”</p>
          <p className="mt-6 text-sm text-ink-muted">{testimonial.author}</p>
        </Card>
      ))}
    </div>
  );
}
