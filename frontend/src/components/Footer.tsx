export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-medium text-foreground">Winove Infrastructure</p>
        <p className="max-w-xl leading-relaxed">
          Esta é uma versão limpa da interface. Estamos preservando a infraestrutura existente para acelerar a construção do novo
          site.
        </p>
      </div>
    </footer>
  );
}
