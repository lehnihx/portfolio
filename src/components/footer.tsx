export const Footer = () => (
  <div className="border-t border-foreground/10 flex items-center justify-between">
    <p className="text-[11px] text-foreground/20">© {new Date().getFullYear()} Lenix</p>
    <div className="flex gap-5">
      {[
        { label: 'GitHub', url: 'https://github.com/lenixdev' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/lenixdev' },
        { label: 'X', url: 'https://x.com/lenixdev' },
      ].map(({ label, url }) => (
        <a key={label} href={url} target="_blank" rel="noopener noreferrer"
          className="text-[11px] tracking-[2px] uppercase text-foreground/20 hover:text-foreground transition-colors"
        >{label}</a>
      ))}
    </div>
  </div>
)