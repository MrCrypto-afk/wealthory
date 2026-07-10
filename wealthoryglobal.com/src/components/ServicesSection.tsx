import { Calculator, Target, PiggyBank, ArrowUpRight } from "lucide-react"

const calculators = [
  {
    title: "SIP Calculator",
    description: "Visualize the power of compounding. Plan your mutual fund investments and project your wealth over time.",
    icon: <Calculator className="w-6 h-6" />,
    link: "https://app.wealthoryglobal.com/sip"
  },
  {
    title: "Financial Goal Planner",
    description: "Set a target amount for a future milestone and calculate exactly how much you need to save every month.",
    icon: <Target className="w-6 h-6" />,
    link: "https://app.wealthoryglobal.com/goal"
  },
  {
    title: "FIRE Calculator",
    description: "Financial Independence, Retire Early. Discover exactly when you can safely retire based on your expenses and savings rate.",
    icon: <PiggyBank className="w-6 h-6" />,
    link: "https://app.wealthoryglobal.com/fire"
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground">
            Our <span className="text-accent-primary italic">Financial Tools</span>
          </h2>
          <p className="text-text-muted text-lg font-light">
            Empower your financial decisions with our suite of free, professional-grade calculators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculators.map((calc, index) => (
            <a
              href={calc.link}
              target="_blank"
              rel="noreferrer"
              key={index}
              className="group p-8 rounded-2xl bg-surface border border-border hover:border-accent-primary transition-all duration-300 hover:-translate-y-2 relative overflow-hidden block"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                  {calc.icon}
                </div>
                <ArrowUpRight className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">
                {calc.title}
              </h3>
              <p className="text-text-muted font-light leading-relaxed">
                {calc.description}
              </p>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://app.wealthoryglobal.com/" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-border hover:border-accent-primary bg-surface/50 text-foreground transition-colors font-medium group"
          >
            View All 9 Calculators
            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
