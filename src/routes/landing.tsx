import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  School, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Bus, 
  Shield, 
  Layout, 
  Smartphone,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/landing")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-schoolgate-green rounded-xl flex items-center justify-center text-white">
              <School size={24} />
            </div>
            <span className="text-xl font-black tracking-tight">Schoolgate ERP</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-600 hover:text-schoolgate-green transition-colors">Features</a>
            <a href="#solutions" className="text-sm font-bold text-slate-600 hover:text-schoolgate-green transition-colors">Solutions</a>
            <a href="#pricing" className="text-sm font-bold text-slate-600 hover:text-schoolgate-green transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost" className="font-bold text-slate-600">Login</Button>
            </Link>
            <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold rounded-lg px-6">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-schoolgate-green to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-schoolgate-green/10 text-schoolgate-green text-sm font-black">
                <ShieldCheck size={16} />
                <span>Modern SaaS Platform for Schools</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
                Empower Your School with <span className="text-schoolgate-green">Intelligence</span>
              </h1>
              
              <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                The ultimate enterprise-grade management system designed for modern educational institutions. Manage finance, academics, and operations in one unified multi-tenant platform.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button className="w-full sm:w-auto bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold h-14 px-8 text-lg rounded-xl shadow-lg shadow-schoolgate-green/20">
                  Start Your Free Trial
                </Button>
                <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl border-slate-200 font-bold">
                  Schedule Demo
                </Button>
              </div>

              <div className="pt-12 flex flex-wrap justify-center gap-8 items-center opacity-50 grayscale">
                <span className="font-black text-2xl tracking-tighter">EDUCLOUD</span>
                <span className="font-black text-2xl tracking-tighter">ACADEMIA</span>
                <span className="font-black text-2xl tracking-tighter">SCHOLAR</span>
                <span className="font-black text-2xl tracking-tighter">INSIGHT</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-page-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-sm font-black text-schoolgate-green uppercase tracking-[0.2em]">Platform Pillars</h2>
              <p className="text-4xl font-black text-foreground tracking-tight">Everything you need to run your institution at scale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={TrendingUp} 
                title="Finance & Fees" 
                description="Transaction-based auditable ledger system with automated invoicing, fee collection, and financial reporting."
                color="emerald"
              />
              <FeatureCard 
                icon={Users} 
                title="Student Lifecycle" 
                description="360-degree student profiles covering admissions, attendance, medical records, and academic progress."
                color="blue"
              />
              <FeatureCard 
                icon={Smartphone} 
                title="Parent Portal" 
                description="Transparent child-specific dashboards for fees, results, and school communication."
                color="indigo"
              />
              <FeatureCard 
                icon={Layout} 
                title="Academic Management" 
                description="Smart timetabling, curriculum planning, and AI-assisted lesson note generation for teachers."
                color="amber"
              />
              <FeatureCard 
                icon={Shield} 
                title="Tenant Isolation" 
                description="Enterprise-grade security ensuring every school's data is completely isolated and protected."
                color="rose"
              />
              <FeatureCard 
                icon={Bus} 
                title="Operations" 
                description="Fleet management, library systems, inventory tracking, and staff payroll all in one place."
                color="purple"
              />
            </div>
          </div>
        </section>

        {/* Multi-tenant CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-slate-900 rounded-[32px] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-20 opacity-10">
                <School size={400} />
              </div>
              
              <div className="p-12 lg:p-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                    Built for Multi-Campus <br/> & Multi-School Systems
                  </h2>
                  <p className="text-xl text-slate-400 leading-relaxed">
                    Whether you run a single school or a national educational group, Schoolgate ERP provides the centralized control and isolated campus management you need.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-white font-bold">
                      <CheckCircle2 className="text-schoolgate-green" size={20} />
                      <span>Individual Branding for every campus</span>
                    </li>
                    <li className="flex items-center gap-3 text-white font-bold">
                      <CheckCircle2 className="text-schoolgate-green" size={20} />
                      <span>Consolidated group financial reporting</span>
                    </li>
                    <li className="flex items-center gap-3 text-white font-bold">
                      <CheckCircle2 className="text-schoolgate-green" size={20} />
                      <span>Global platform administration control</span>
                    </li>
                  </ul>
                  <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold h-14 px-8 text-lg rounded-xl">
                    Explore Enterprise Solutions
                  </Button>
                </div>
                
                <div className="hidden lg:block">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
                    <div className="space-y-4">
                      <div className="h-4 w-1/3 bg-white/20 rounded-full"></div>
                      <div className="h-12 w-full bg-white/10 rounded-xl"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-20 bg-white/10 rounded-xl"></div>
                        <div className="h-20 bg-white/10 rounded-xl"></div>
                        <div className="h-20 bg-white/10 rounded-xl"></div>
                      </div>
                      <div className="h-32 w-full bg-schoolgate-green/20 rounded-xl border border-schoolgate-green/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / CTA */}
        <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ready to transform your school?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join hundreds of institutions using Schoolgate ERP to deliver a premium educational experience.
            </p>
            <div className="pt-4">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-14 px-12 text-lg rounded-xl shadow-xl">
                Get Started Today <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-schoolgate-green rounded-lg flex items-center justify-center text-white">
                  <School size={20} />
                </div>
                <span className="text-lg font-black tracking-tight">Schoolgate ERP</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Empowering educational excellence through modern technology and data-driven management.
              </p>
            </div>
            
            <FooterLinkGroup title="Product" links={["Features", "Parent Portal", "Finance", "Security"]} />
            <FooterLinkGroup title="Solutions" links={["Primary Schools", "Secondary Schools", "Multi-Campus", "Enterprise"]} />
            <FooterLinkGroup title="Resources" links={["Documentation", "Help Center", "API Reference", "Status"]} />
            <FooterLinkGroup title="Company" links={["About Us", "Contact", "Privacy", "Terms"]} />
          </div>
          
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-bold">
            <p>© 2026 Schoolgate ERP. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-schoolgate-green">Twitter</a>
              <a href="#" className="hover:text-schoolgate-green">LinkedIn</a>
              <a href="#" className="hover:text-schoolgate-green">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-card p-8 rounded-3xl border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colorMap[color]}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-black text-foreground mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
  );
}

function FooterLinkGroup({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, idx) => (
          <li key={idx}>
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-schoolgate-green transition-colors">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
