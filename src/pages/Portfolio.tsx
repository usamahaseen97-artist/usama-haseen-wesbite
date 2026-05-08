import { motion } from 'framer-motion';
import { 
  Bot, Code, Database, Layout, Smartphone, Video, 
  Terminal, BarChart3, ShieldCheck, Mail, Phone, 
  ChevronRight, BrainCircuit, Sparkles, Globe
} from 'lucide-react';
import { useState } from 'react';
import { db, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const services = [
  {
    title: "AI Operating Systems",
    price: "$1000",
    description: "Custom-built specialized operating systems and deep system integration.",
    icon: Terminal,
    color: "from-rose-600 to-red-600"
  },
  {
    title: "AI Agents",
    price: "$500",
    description: "Intelligent autonomous agents for task automation and decision making.",
    icon: Bot,
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "App Development",
    price: "$500",
    description: "Full-cycle mobile and web application development with AI features.",
    icon: Smartphone,
    color: "from-indigo-500 to-purple-600"
  },
  {
    title: "Corporate Website",
    price: "$500",
    description: "High-quality, secure, and modern full-stack web platforms.",
    icon: Globe,
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Backend Development",
    price: "$350",
    description: "Secure, scalable backend engineering and API design ($350).",
    icon: Database,
    color: "from-slate-600 to-slate-900"
  },
  {
    title: "Data Analysis & ML",
    price: "$350",
    description: "Data cleaning, modeling, insights, and AI tech fit consulting.",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Basic Website",
    price: "$200",
    description: "Budget-friendly full website solution for your personal brand.",
    icon: Layout,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Frontend Design",
    price: "$150",
    description: "Stunning, expert UI/UX design components and interfaces.",
    icon: Layout,
    color: "from-orange-500 to-amber-500"
  },
  {
    title: "AI Video Production",
    price: "$100",
    description: "1 minute of high-quality, professional AI-generated video content.",
    icon: Video,
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Advertising Design",
    price: "$30",
    description: "Professional advertising posts and social media marketing assets.",
    icon: Sparkles,
    color: "from-amber-400 to-orange-400"
  },
  {
    title: "Logo & Branding",
    price: "$10",
    description: "Quick, modern logo design for your business or project ($10).",
    icon: BrainCircuit,
    color: "from-yellow-400 to-emerald-400"
  }
];

import AIConsultant from '../components/AIConsultant';

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Website',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'orders'), {
        clientName: formData.name,
        clientEmail: formData.email,
        serviceType: formData.service,
        message: formData.message,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', service: 'Full Website', message: '' });
    } catch (error) {
      handleFirestoreError(error, 'write' as any, 'orders');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[var(--color-brand-dark)]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-slate-400">Available for New Projects</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
            ENGINEERING THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              FUTURE OF AI
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            I am Usama Haseen, an AI Engineer specializing in building full-stack solutions, 
            autonomous agents, and data-driven intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#services" 
              className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-full hover:scale-105 transition-transform"
            >
              View Services
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </a>
          </div>
          <div className="mt-8">
            <a 
              href="#contact" 
              className="group flex items-center justify-center gap-2 text-brand-primary font-bold uppercase tracking-[0.2em] text-sm hover:gap-4 transition-all"
            >
              Contact Us <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">PREMIUM SERVICES</h2>
            <p className="text-slate-400">High-quality solutions at industrial-disrupting prices.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative glass p-8 rounded-3xl overflow-hidden glow-hover"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl`} />
                <service.icon className="w-12 h-12 text-brand-primary mb-6" />
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <span className="text-brand-primary font-mono font-bold text-lg">{service.price}</span>
                </div>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <button 
                  onClick={() => {
                    setFormData({...formData, service: service.title});
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary hover:gap-3 transition-all"
                >
                  Order Now <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Security */}
      <section className="py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase">Uncompromising Quality & Security</h2>
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: "Secure Infrastructure", text: "I build robust, secure backends using modern architecture to keep your data safe." },
                { icon: Database, title: "Data Intelligence", text: "Expertise in data modeling, cleaning, and extracting actionable insights for your business." },
                { icon: BrainCircuit, title: "AI Strategy", text: "I help you identify the best-fit AI technologies to optimize and automate your business." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl glass flex items-center justify-center text-brand-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-[40px] aspect-square flex items-center justify-center relative">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-3/4 h-3/4 border-4 border-dashed border-brand-primary/20 rounded-full flex items-center justify-center"
            >
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="w-1/2 h-1/2 border-2 border-brand-secondary/40 rounded-full flex items-center justify-center"
               >
                 <Bot className="w-16 h-16 text-brand-primary" />
               </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 uppercase">Let's Build Something</h2>
          <p className="text-slate-400 italic">I will respond to your inquiry within 24 hours.</p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="md:col-span-1 space-y-8">
              <div className="glass p-6 rounded-3xl">
                <Mail className="w-6 h-6 text-brand-primary mb-4" />
                <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Email</p>
                <p className="font-bold">usamavszoombies@gmail.com</p>
              </div>
              <div className="glass p-6 rounded-3xl">
                <Phone className="w-6 h-6 text-brand-secondary mb-4" />
                <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Response Time</p>
                <p className="font-bold">&lt; 24 Hours</p>
              </div>
           </div>
           
           <div className="md:col-span-2 glass p-10 rounded-[40px]">
              {submitted ? (
                <div className="text-center py-10">
                   <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck className="w-10 h-10 text-brand-primary" />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Order Received!</h3>
                   <p className="text-slate-400">Thank you for your trust. Usama will contact you shortly to discuss requirements.</p>
                   <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-brand-primary font-bold hover:underline"
                   >
                     Send another message
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">Inquiry Category</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors appearance-none"
                    >
                      {services.map(s => <option key={s.title} value={s.title} className="bg-slate-900 text-white">{s.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">Project Details</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-dark font-black py-5 rounded-3xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? 'PROCESSING...' : 'DISPATCH INQUIRY'}
                  </button>
                </form>
              )}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-brand-dark" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter">USAMA HASEEN</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} AI Engineering Portfolio. All rights reserved.
          </div>
          <div className="flex gap-6">
             <a href="/admin" className="text-slate-400 hover:text-brand-primary text-sm uppercase tracking-widest font-bold">Admin</a>
          </div>
        </div>
      </footer>
      <AIConsultant />
    </div>
  );
}
