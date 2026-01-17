export function MoolDefinition() {
    return (
        <div className="mb-16 p-6 sm:p-8 md:p-12 bg-subtle/50 rounded-3xl border border-primary/10 relative overflow-hidden group hover:border-primary/20 transition-colors w-full max-w-full">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-16">
                <div className="flex-shrink-0">
                    <h2 className="font-heading text-6xl sm:text-7xl md:text-8xl text-primary leading-none">मूल</h2>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <span className="font-heading text-3xl sm:text-4xl text-text-primary">Mool</span>
                        <span className="font-mono text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded-full whitespace-nowrap">/mool/ • noun</span>
                    </div>
                    <p className="font-body text-lg text-text-secondary leading-relaxed">
                        The Root. The Source. The Origin.<br />
                        <span className="opacity-80">The fundamental basis from which everything grows.</span>
                    </p>
                </div>
            </div>
            {/* Decorative watermark - Subtle on mobile, distinct on desktop */}
            <div className="absolute -right-4 -bottom-8 md:-right-8 md:-bottom-12 text-[10rem] md:text-[12rem] lg:text-[16rem] text-primary opacity-[0.03] lg:opacity-10 font-heading select-none pointer-events-none transform rotate-12 z-0 transition-opacity duration-300">
                मूल
            </div>
        </div>
    );
}
