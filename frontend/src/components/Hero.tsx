import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type HeroProps = {
  heading?: string;
  subheading?: string;
};

export const Hero = ({ heading, subheading }: HeroProps) => {
  return (
    <section
      id="hero"
      className="section--first px-4 pb-16 group min-h-screen relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <picture className="block h-full w-full" aria-hidden="true">
          <source
            type="image/avif"
            srcSet="/img/hero-768.avif 768w, /img/hero-1120.avif 1120w, /img/hero-1600.avif 1600w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/img/hero-768.webp 768w, /img/hero-1120.webp 1120w, /img/hero-1600.webp 1600w"
            sizes="100vw"
          />
          <img
            src="/img/hero-1120.jpg"
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/15 rounded-full blur-xl animate-glow" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up leading-tight transition-transform duration-300 group-hover:scale-[1.02]">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{heading || 'Winove, Sua ideia online'}</span>
            <br />
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{subheading || 'Templates de websites e construções personalizadas.'}</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-up transition-colors duration-300 group-hover:text-foreground"
            style={{ animationDelay: '0.2s' }}
          >
            Do conceito ao resultado: design, tecnologia e performance para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a href="https://api.whatsapp.com/send?phone=5519982403845" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-primary text-lg px-12 py-6">Transformar Meu Negócio</Button>
            </a>

            <Link to="/cases">
              <Button
                variant="outline"
                size="lg"
                className="btn-secondary text-lg px-8 py-6 glass border-primary/30 hover:border-primary/60"
              >
                Conhecer Nossos Cases
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
