
const Background = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'calc(50% - 0.5px) 0px',
          opacity: 0.15,
          maskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)',
        }}
      />
      <div 
        className="absolute inset-0 h-full w-full opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '100% 120px',
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 0%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 0%, black, transparent)',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-30" />
    </div>
  );
};

export default Background;