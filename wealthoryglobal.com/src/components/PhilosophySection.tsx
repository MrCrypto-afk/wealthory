import { ArrowRight } from "lucide-react"

export function PhilosophySection() {
  return (
    <section id="insights" className="py-24 bg-surface-hover/30 border-y border-border">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 text-accent-primary text-sm tracking-widest uppercase font-medium">
            <span className="w-8 h-px bg-accent-primary" />
            Our Newsletter
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground leading-[1.2]">
            Data-driven insights.<br />
            <span className="text-accent-primary italic">Zero noise.</span>
          </h2>
          <p className="text-text-muted text-lg font-light leading-relaxed">
            Join thousands of smart investors who receive our weekly breakdowns on macroeconomic shifts, personal finance strategies, and actionable market analysis on Substack.
          </p>

          <div className="pt-4">
            <a 
              href="https://wealthory.substack.com/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all text-lg group"
            >
              Read on Substack
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden border border-border bg-surface p-4 flex flex-col justify-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent z-0" />
          <div className="relative z-10 text-center space-y-4 px-8 py-12 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto bg-orange-500 rounded-lg flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-medium text-foreground">Wealthory Global on Substack</h3>
            <p className="text-text-muted font-light">Navigating markets with clarity and purpose.</p>
            <div className="mt-8 w-full bg-white rounded-lg overflow-hidden shadow-inner">
              <iframe 
                src="https://wealthory.substack.com/embed" 
                width="100%" 
                height="320" 
                style={{ border: "none", background: "white" }}
                frameBorder="0" 
                scrolling="no"
                title="Wealthory Substack Subscribe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
