import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react";

export const CTA = () => {
  const benefits = [
    {
      icon: Zap,
      text: "Resultados em até 30 dias"
    },
    {
      icon: Target,
      text: "Estratégia personalizada"
    },
    {
      icon: TrendingUp,
      text: "ROI comprovado"
    }
  ];

  const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || "contato@example.com";

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="glass rounded-3xl p-8 md:p-12 mb-8 glow-soft">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Pronto para transformar
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                seu negócio?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Chegou a hora de acelerar seus resultados com estratégias digitais que realmente funcionam
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={benefit.text}
                    className="flex items-center gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="https://api.whatsapp.com/send?phone=5519982403845" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="btn-primary text-xl px-12 py-6 animate-glow"
                >
                  <span className="flex items-center gap-3">
                    Fale com a gente agora
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </a>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-secondary text-lg px-8 py-6 glass border-primary/30 hover:border-primary/60"
              >
                Ver nossos cases
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="glass rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
              <p className="text-primary font-medium">+55 19 98240-3845</p>
            </div>
            
            <div className="glass rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-semibold text-foreground mb-2">Email</h4>
              <p className="text-primary font-medium">{contactEmail}</p>
            </div>
            
            <div className="glass rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-semibold text-foreground mb-2">Resposta</h4>
              <p className="text-muted-foreground">Em até 2 horas úteis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};