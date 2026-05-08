import { motion } from 'framer-motion';
import { 
  Bot, Code, Database, Layout, Smartphone, Video, 
  Terminal, BarChart3, ShieldCheck, Mail, Phone, 
  ChevronRight, BrainCircuit, Sparkles, Globe,
  Menu, X as CloseIcon, Languages, MapPin, CreditCard, Bitcoin
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const services = [
  {
    title: "AI Operating Systems",
    price: "$3000",
    description: "Custom-built specialized operating systems and deep system integration.",
    icon: Terminal,
    color: "from-rose-600 to-red-600",
    category: "AI & Intel"
  },
  {
    title: "AI Game Development",
    price: "$2000",
    description: "Creating immersive AI-powered games with smart NPCs and procedural worlds.",
    icon: Bot,
    color: "from-purple-600 to-blue-600",
    category: "AI & Intel"
  },
  {
    title: "AI Agents",
    price: "$500",
    description: "Intelligent autonomous agents for task automation and decision making.",
    icon: Bot,
    color: "from-cyan-400 via-blue-500 to-indigo-600",
    category: "AI & Intel"
  },
  {
    title: "App Development",
    price: "$500",
    description: "Full-cycle mobile and web application development with AI features.",
    icon: Smartphone,
    color: "from-indigo-500 to-purple-600",
    category: "Web & Apps"
  },
  {
    title: "Corporate Website",
    price: "$500",
    description: "High-quality, secure, and modern full-stack web platforms.",
    icon: Globe,
    color: "from-blue-500 to-indigo-600",
    category: "Web & Apps"
  },
  {
    title: "Backend Development",
    price: "$350",
    description: "Secure, scalable backend engineering and API design ($350).",
    icon: Database,
    color: "from-slate-600 to-slate-900",
    category: "Web & Apps"
  },
  {
    title: "Data Analysis & ML",
    price: "$350",
    description: "Data cleaning, modeling, insights, and AI tech fit consulting.",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    category: "AI & Intel"
  },
  {
    title: "Basic Website",
    price: "$200",
    description: "Budget-friendly full website solution for your personal brand.",
    icon: Layout,
    color: "from-emerald-500 to-teal-500",
    category: "Web & Apps"
  },
  {
    title: "Frontend Design",
    price: "$150",
    description: "Stunning, expert UI/UX design components and interfaces.",
    icon: Layout,
    color: "from-orange-500 to-amber-500",
    category: "Design"
  },
  {
    title: "AI Video Production",
    price: "$100",
    description: "1 minute of high-quality, professional AI-generated video content.",
    icon: Video,
    color: "from-pink-500 to-rose-500",
    category: "AI & Intel"
  },
  {
    title: "Advertising Design",
    price: "$30",
    description: "Professional advertising posts and social media marketing assets.",
    icon: Sparkles,
    color: "from-amber-400 to-orange-400",
    category: "Design"
  },
  {
    title: "Logo & Branding",
    price: "$10",
    description: "Quick, modern logo design for your business or project ($10).",
    icon: BrainCircuit,
    color: "from-yellow-400 to-emerald-400",
    category: "Design"
  }
];

import AIConsultant from '../components/AIConsultant';

function FloatingRobot() {
  return (
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        rotateX: [0, 10, 0],
        rotateY: [0, 15, 0]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      {/* Robot Core */}
      <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="relative glass w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center border-brand-primary/30 rotate-12 shadow-[0_0_50px_rgba(0,255,204,0.2)]">
        <Bot className="w-16 h-16 md:w-20 md:h-20 text-brand-primary" />
        {/* Glowing Eyes */}
        <div className="absolute top-1/3 flex gap-4">
          <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#00ffff]" />
          <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#00ffff]" />
        </div>
      </div>
      
      {/* Floating Orbital Pieces */}
      {[0, 120, 240].map((deg) => (
        <motion.div
          key={deg}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full"
        >
          <div 
            className="w-4 h-4 rounded-full bg-brand-secondary shadow-[0_0_15px_rgba(0,102,255,0.8)]"
            style={{ 
              transform: `rotate(${deg}deg) translate(100px) rotate(-${deg}deg)` 
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

const categories = ['All', 'AI & Intel', 'Web & Apps', 'Design'];

export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    service: 'Full Website',
    message: '',
    paymentMethod: 'card'
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'اردو' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ar', label: 'العربية' },
    { code: 'pt', label: 'Português' },
    { code: 'tr', label: 'Türkçe' }
  ];

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'orders'), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        country: formData.country,
        city: formData.city,
        serviceType: formData.service,
        message: formData.message,
        paymentMethod: formData.paymentMethod,
        preferredLanguage: i18n.language,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        service: 'Full Website',
        message: '',
        paymentMethod: 'card'
      });
    } catch (error) {
      handleFirestoreError(error, 'write' as any, 'orders');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Sidebar Menu */}
      <div className={`fixed left-0 top-0 h-full glass z-[100] transition-all duration-500 overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'}`}>
        <div className="flex flex-col h-full py-8 items-center">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 glass rounded-2xl text-brand-primary mb-12 hover:scale-110 transition-transform"
          >
            {isSidebarOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex-1 space-y-8 flex flex-col items-center">
            <div className="relative group">
              <button className="p-3 rounded-2xl glass hover:bg-brand-primary/20 transition-colors">
                <Languages className="w-6 h-6 text-brand-primary" />
              </button>
              <div className="absolute left-full ml-4 top-0 glass rounded-2xl p-4 hidden group-hover:block blur-none min-w-32 z-[110]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`block w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest hover:text-brand-primary transition-colors ${i18n.language === lang.code ? 'text-brand-primary' : 'text-slate-400'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {[
              { icon: Globe, label: "Home", href: "#top" },
              { icon: Bot, label: "Services", href: "#services" },
              { icon: Mail, label: "Contact", href: "#contact" },
              { icon: Terminal, label: "Admin", href: "/admin" }
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-2"
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="p-3 rounded-2xl glass group-hover:bg-brand-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-slate-400 group-hover:text-brand-primary" />
                </div>
                {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Background Orbs */}
      <div id="top" className="fixed top-0 left-0 w-full h-full -z-10 bg-[var(--color-brand-dark)] ml-0 md:ml-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center pt-20 px-6 md:ml-20">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-slate-400">Available for New Projects</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight uppercase">
              {t('hero_title').split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                {t('hero_title').split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a 
                href="#services" 
                className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-full hover:scale-105 transition-transform"
              >
                {t('view_services')}
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                {t('get_in_touch')}
              </a>
            </div>
            <div className="mt-8">
              <a 
                href="#contact" 
                className="group flex items-center justify-center lg:justify-start gap-2 text-brand-primary font-bold uppercase tracking-[0.2em] text-sm hover:gap-4 transition-all"
              >
                Contact Us <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center mt-20 lg:mt-0">
          <FloatingRobot />
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 md:ml-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">{t('premium_services')}</h2>
            <p className="text-slate-400">{t('services_desc')}</p>
          </div>

          {/* Filtering UI */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-primary text-brand-dark shadow-[0_0_15px_rgba(0,255,204,0.3)]' 
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="group relative glass p-8 rounded-3xl overflow-hidden glow-hover"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl`} />
                <div className="flex justify-between items-start mb-6">
                  <service.icon className="w-12 h-12 text-brand-primary" />
                  <span className="text-[10px] items-center px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-500 uppercase tracking-widest font-bold">
                    {service.category}
                  </span>
                </div>
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
          </motion.div>
        </div>
      </section>

      {/* Expertise & Security */}
      <section className="py-32 px-6 bg-white/5 md:ml-20">
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
      <section id="contact" className="py-32 px-6 md:ml-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 uppercase">{t('contact_title')}</h2>
          <p className="text-slate-400 italic mb-6">{t('contact_desc')}</p>
          <div className="glass p-4 rounded-2xl border-brand-primary/20 inline-block">
            <p className="text-xs font-black text-brand-primary uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> {t('order_policy')}
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="md:col-span-1 space-y-8">
              <div className="glass p-6 rounded-3xl">
                <Mail className="w-6 h-6 text-brand-primary mb-4" />
                <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Email</p>
                <p className="font-bold">usamahaseen97@gmail.com</p>
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
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('first_name')}</label>
                      <input 
                        required
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors"
                        placeholder="Usama"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('last_name')}</label>
                      <input 
                        required
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors"
                        placeholder="Haseen"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('email')}</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('phone')}</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('country')}</label>
                      <input 
                        required
                        type="text" 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors"
                        placeholder="United Arab Emirates"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('city')}</label>
                      <input 
                        type="text" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors"
                        placeholder="Dubai"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('category')}</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors appearance-none"
                    >
                      {services.map(s => <option key={s.title} value={s.title} className="bg-slate-900 text-white">{s.title}</option>)}
                    </select>
                  </div>

                  <div className="space-y-4 text-left">
                    <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('payment_method')}</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'card', label: t('payment_options.card'), icon: CreditCard },
                        { id: 'bitcoin', label: t('payment_options.bitcoin'), icon: Bitcoin },
                        { id: 'bank', label: t('payment_options.bank'), icon: Terminal }
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setFormData({...formData, paymentMethod: pm.id})}
                          className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                            formData.paymentMethod === pm.id 
                              ? 'bg-brand-primary/20 border-brand-primary text-brand-primary' 
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <pm.icon className="w-6 h-6" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-center">{pm.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase tracking-widest text-slate-400 ml-4">{t('message')}</label>
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
                    {isSubmitting ? t('processing') : t('submit')}
                  </button>
                </form>
              )}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 md:ml-20">
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
