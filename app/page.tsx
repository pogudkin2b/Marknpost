'use client';

import { useState, useEffect } from 'react';

// FAQ Accordion Item
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, index }: FAQItemProps) => (
  <div className="border-b-2 border-stone-900 last:border-0">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <div className="flex items-baseline gap-4">
        <span className="text-xs font-mono text-stone-400">0{index + 1}</span>
        <span className="text-lg md:text-xl font-semibold text-stone-900 group-hover:text-amber-600 transition-colors">
          {question}
        </span>
      </div>
      <span className={`w-8 h-8 rounded-full border-2 border-stone-900 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-stone-900 text-white rotate-45' : 'group-hover:bg-amber-400'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
      <p className="text-stone-600 leading-relaxed pl-10 pr-12 text-lg">{answer}</p>
    </div>
  </div>
);

// Service Card with geometric accent
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, title, subtitle, description, index }: ServiceCardProps) => (
  <div className="group relative bg-white border-2 border-stone-200 hover:border-stone-900 transition-all duration-300 p-8 overflow-hidden">
    {/* Geometric corner accent */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400 transform translate-x-8 -translate-y-8 rotate-45 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
    
    <div className="relative">
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-xs text-stone-400">/{String(index + 1).padStart(2, '0')}</span>
        <div className="w-12 h-12 border-2 border-stone-900 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-300">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-stone-900 mb-2 tracking-tight">{title}</h3>
      {subtitle && (
        <span className="inline-block text-xs font-mono text-amber-600 bg-amber-50 px-2 py-1 mb-4">
          {subtitle}
        </span>
      )}
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

// Marquee component for dynamic feel
interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
}

const Marquee = ({ children, reverse = false }: MarqueeProps) => (
  <div className="overflow-hidden whitespace-nowrap">
    <div className={`inline-flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {children}
      {children}
    </div>
  </div>
);

export default function MarknPostLanding() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      question: "Что можно отправлять?",
      answer: "Документы, личные вещи, одежду, технику, подарки и многое другое. Запрещены опасные грузы, легковоспламеняющиеся материалы, оружие и контрабанда. Сомневаетесь — спросите менеджера."
    },
    {
      question: "Как упаковать хрупкие вещи?",
      answer: "Упакуйте сами по нашим рекомендациям: пузырчатая плёнка, картон, заполните пустоты. Или доверьте нам — подберём материалы и упакуем профессионально."
    },
    {
      question: "Что делать, если посылка тяжёлая?",
      answer: "Для грузов более 4 кг или крупногабаритных отправок может понадобиться отдельный транспорт. Свяжитесь — организуем забор и доставку."
    },
    {
      question: "Как работает хранение?",
      answer: "Разместите вещи на складе на нужный срок. Удобно при переезде или ремонте. Заберите самовывозом или доставим по адресу."
    },
    {
      question: "Документы для международной отправки?",
      answer: "Базовый пакет: паспорт и описание содержимого. Для отдельных стран могут быть доп. требования — уточним при оформлении."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-400 selection:text-stone-900">
      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;500;600;700;800;900&display=swap');
        
        :root {
          --font-display: 'Outfit', sans-serif;
          --font-mono: 'Space Mono', monospace;
        }
        
        body { font-family: var(--font-display); }
        .font-mono { font-family: var(--font-mono); }
        
        html { scroll-behavior: smooth; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        
        .grain::before {
          content: '';
          position: absolute;
          inset: -200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          animation: grain 8s steps(10) infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-stone-100/95 backdrop-blur-md border-b-2 border-stone-900' : ''}`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-stone-900 flex items-center justify-center overflow-hidden">
                <span className="text-white font-bold text-xl relative z-10">M</span>
                <div className="absolute inset-0 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="absolute text-stone-900 font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-20">M</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl tracking-tight">Mark'n'Post</span>
                <span className="block text-xs font-mono text-stone-500">TBILISI</span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10">
              {['Услуги', 'Бизнес', 'Частные', 'FAQ', 'Контакты'].map((item, i) => (
                <a 
                  key={i}
                  href={`#${['services', 'business', 'personal', 'faq', 'contacts'][i]}`} 
                  className="relative text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="tel:+995511282228" className="font-mono text-sm text-stone-600 hover:text-stone-900 transition-colors">
                +995 511 282 228
              </a>
              <a 
                href="#calculate" 
                className="relative px-6 py-3 bg-stone-900 text-white text-sm font-semibold overflow-hidden group"
              >
                <span className="relative z-10">Рассчитать →</span>
                <div className="absolute inset-0 bg-amber-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-stone-900 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Рассчитать →</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-12 h-12 border-2 border-stone-900 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
            <div className="border-t-2 border-stone-900 pt-6 space-y-4">
              {['Услуги', 'Бизнес', 'Частные', 'FAQ', 'Контакты'].map((item, i) => (
                <a 
                  key={i}
                  href={`#${['services', 'business', 'personal', 'faq', 'contacts'][i]}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-semibold text-stone-900 hover:text-amber-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a href="tel:+995511282228" className="block font-mono text-amber-600 pt-4">
                +995 511 282 228
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden grain">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large geometric shapes */}
          <div className="absolute top-20 right-[10%] w-64 h-64 border-2 border-stone-300 rotate-12 animate-float" />
          <div className="absolute bottom-40 left-[5%] w-32 h-32 bg-amber-400/20 rotate-45" />
          <div className="absolute top-1/3 right-[25%] w-4 h-4 bg-stone-900 rotate-45" />
          <div className="absolute bottom-1/4 right-[15%] w-8 h-8 border-2 border-amber-400" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(to right, #1c1917 1px, transparent 1px), linear-gradient(to bottom, #1c1917 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-0.5 bg-amber-400" />
                <span className="font-mono text-sm text-stone-500">LOGISTICS & DELIVERY</span>
              </div>

              {/* Main headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight mb-8">
                <span className="block">Логистика,</span>
                <span className="block">которая</span>
                <span className="block relative inline-block">
                  <span className="relative z-10">работает</span>
                  <div className="absolute bottom-2 left-0 w-full h-4 bg-amber-400 -z-0 transform -skew-x-6" />
                </span>
                <span className="block text-stone-400">как надо.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl lg:text-2xl text-stone-600 leading-relaxed max-w-2xl mb-12">
                Международные отправки, курьерская доставка по Грузии, склад и упаковка. 
                От посылок до e-commerce — мы берём ответственность за весь путь.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-16">
                <a 
                  href="#calculate" 
                  className="group relative px-8 py-4 bg-stone-900 text-white font-semibold text-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Отправить посылку
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-amber-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="absolute inset-0 flex items-center justify-center gap-3 text-stone-900 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Отправить посылку
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
                <a 
                  href="#business" 
                  className="px-8 py-4 border-2 border-stone-900 font-semibold text-lg hover:bg-stone-900 hover:text-white transition-colors"
                >
                  Для бизнеса
                </a>
              </div>
            </div>

            {/* Right side - floating card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-amber-400 transform rotate-3" />
                <div className="relative bg-stone-900 text-white p-8">
                  <div className="font-mono text-xs text-stone-400 mb-4">СТАТИСТИКА</div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-4xl font-black text-amber-400">7+</div>
                      <div className="text-stone-400">лет опыта</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-amber-400">3</div>
                      <div className="text-stone-400">интеграции маркетплейсов</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-amber-400">24/7</div>
                      <div className="text-stone-400">поддержка в мессенджерах</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="max-w-3xl mt-8 lg:mt-0">
            <div className="flex items-start gap-4 border-l-4 border-amber-400 pl-6">
              <p className="text-stone-500 text-lg italic">
                "Когда вещи нужно доставить туда, где их ждут — скорость, порядок и человеческий подход становятся важнее всего."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="bg-stone-900 text-white py-4 border-y-2 border-stone-800 overflow-hidden">
        <Marquee>
          <div className="flex items-center gap-12 px-6">
            {['CDEK', 'WILDBERRIES', 'OZON', 'МЕЖДУНАРОДНЫЕ ОТПРАВКИ', 'СКЛАД', 'УПАКОВКА', 'DOOR-TO-DOOR', 'ТБИЛИСИ'].map((item, i) => (
              <span key={i} className="flex items-center gap-4 font-mono text-sm tracking-wider">
                <span className="w-2 h-2 bg-amber-400 rotate-45" />
                {item}
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-50 hidden lg:block" />
        
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-amber-400" />
                <span className="font-mono text-sm text-stone-500">О КОМПАНИИ</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">
                Кто такие<br />Mark'n'Post
              </h2>
              
              <p className="text-xl text-stone-600 leading-relaxed mb-12">
                Иногда проще начать с фактов. Mark'n'Post — логистический сервис из Тбилиси, 
                который помогает и людям, и бизнесу отправлять, хранить и получать вещи без головной боли.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "Адрес", value: "Дигоми, 3-й квартал, здание 7" },
                  { label: "График", value: "пн–пт 10–19, сб–вс 11–16" },
                  { label: "Направления", value: "Европа, СНГ, Грузия" },
                  { label: "Интеграции", value: "CDEK, WB, OZON" },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-stone-200 pl-4 hover:border-amber-400 transition-colors">
                    <div className="font-mono text-xs text-stone-400 mb-1">{item.label}</div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative w-full">
                <div className="absolute -inset-6 bg-amber-400 transform -rotate-2" />
                <div className="relative bg-stone-900 text-white p-8 lg:p-12">
                  <svg className="w-12 h-12 text-amber-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-2xl lg:text-3xl font-bold leading-tight mb-6">
                    Логистика — это не про коробки. Это про спокойствие.
                  </blockquote>
                  <p className="text-stone-400 text-lg">
                    Ты доверяешь нам вещь, а мы берём ответственность за весь путь: от двери до двери.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 bg-stone-100 relative grain">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-amber-400" />
                <span className="font-mono text-sm text-stone-500">УСЛУГИ</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
                Что мы делаем
              </h2>
            </div>
            <p className="text-stone-600 max-w-md text-lg">
              Полный спектр логистических услуг для бизнеса и частных клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              index={0}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>}
              title="Международные и внутренние отправки"
              description="Документы, посылки и грузы по Европе, СНГ и Грузии. Без бюрократии: принесли — отправили. Нужно забрать — заберём."
            />
            <ServiceCard
              index={1}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
              title="Логистика для маркетплейсов"
              subtitle="WB • OZON • CDEK"
              description="Мы — мост между вашими товарами и клиентами. Приём, отправка, учёт, упаковка. Для магазинов и брендов."
            />
            <ServiceCard
              index={2}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>}
              title="Склад и хранение"
              description="Переезд, ремонт или много вещей? Держим на складе, пока не появится место или не придёт время доставки."
            />
            <ServiceCard
              index={3}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
              title="Упаковка и материалы"
              description="Коробки, защита для хрупкого, аккуратная ручная упаковка. Чтобы вещи доехали в том виде, в каком передали."
            />
            <ServiceCard
              index={4}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
              title="Door-to-door"
              description="Заберём из дома или офиса. Привезём получателю. Вам не нужно выходить из квартиры."
            />
            <ServiceCard
              index={5}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
              title="Консультации"
              description="Подбираем маршрут, сроки, упаковку. Полезно малому бизнесу, который хочет системы вместо хаоса."
            />
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="py-24 lg:py-32 bg-stone-900 text-white relative overflow-hidden">
        {/* Geometric background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 border border-stone-800 rounded-full transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border border-stone-800 transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-amber-400" />
                <span className="font-mono text-sm text-stone-500">ДЛЯ БИЗНЕСА</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
                Решения для<br />бизнеса и e-commerce
              </h2>
              
              <p className="text-2xl text-stone-400 mb-12">
                Бизнес платит не за доставку.<br />
                <span className="text-amber-400">Он платит за отсутствие проблем.</span>
              </p>

              <div className="space-y-4 mb-12">
                {[
                  "Единый подрядчик: отправка, хранение, упаковка, курьеры",
                  "Интеграции с Wildberries, OZON и CDEK",
                  "Стабильные сроки и менеджеры, которые отвечают",
                  "Полный цикл: товар → склад → упаковка → клиент",
                  "Вы на продажах — мы на движении товара"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 border-2 border-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-400 transition-colors">
                      <svg className="w-3 h-3 text-amber-400 group-hover:text-stone-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg text-stone-300">{item}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#contacts" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-400 text-stone-900 font-bold text-lg hover:bg-amber-300 transition-colors"
              >
                Узнать условия
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                {/* Integration cards */}
                <div className="space-y-4">
                  {[
                    { name: 'Wildberries', color: 'bg-purple-500' },
                    { name: 'OZON', color: 'bg-blue-500' },
                    { name: 'CDEK', color: 'bg-green-500' },
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-4 bg-stone-800/50 backdrop-blur-sm border border-stone-700 p-6 hover:border-amber-400/50 transition-colors"
                      style={{ transform: `translateX(${i * 20}px)` }}
                    >
                      <div className={`w-3 h-3 ${item.color} rounded-full`} />
                      <span className="font-mono text-lg">{item.name}</span>
                      <span className="ml-auto text-xs text-stone-500">CONNECTED</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section id="personal" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-stone-200 transform rotate-2" />
                <div className="relative bg-stone-100 p-8 lg:p-12">
                  <div className="font-mono text-xs text-stone-400 mb-6">СЦЕНАРИИ</div>
                  <div className="space-y-4">
                    {[
                      "Отправка личных вещей и подарков",
                      "Пересылка документов",
                      "Помощь при переездах",
                      "Хранение вещей до отправки",
                      "Упаковка хрупких и ценных вещей"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white border-l-4 border-amber-400 hover:translate-x-2 transition-transform">
                        <span className="font-mono text-xs text-stone-400">0{i + 1}</span>
                        <span className="text-stone-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-amber-400" />
                <span className="font-mono text-sm text-stone-500">ЧАСТНЫЕ КЛИЕНТЫ</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">
                Для частных<br />клиентов
              </h2>
              
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Жизнь проще, когда логистика работает. Вам не нужно читать километры правил — 
                достаточно сказать, что и куда отправить.
              </p>

              <blockquote className="border-l-4 border-amber-400 pl-6 mb-10">
                <p className="text-xl text-stone-600 italic">
                  "Вы решаете, что отправить. Всё остальное — наша зона ответственности."
                </p>
              </blockquote>

              <a 
                href="#calculate" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white font-semibold text-lg hover:bg-stone-800 transition-colors"
              >
                Как отправить посылку
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Calculate Section */}
      <section id="calculate" className="py-24 lg:py-32 bg-stone-100 relative grain">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-amber-400" />
                <span className="font-mono text-sm text-stone-500">СРОКИ</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">
                Сроки и<br />ориентиры
              </h2>
              
              <p className="text-xl text-stone-600 leading-relaxed mb-12">
                Точные сроки зависят от направления, веса и объёма. 
                Мы дадим ориентиры и быстро посчитаем ваш маршрут.
              </p>

              <div className="space-y-4">
                {[
                  { route: "Европа", time: "от 5–7 дней", note: "зависит от города" },
                  { route: "СНГ", time: "от 3–5 дней", note: "Россия, Казахстан, Беларусь" },
                  { route: "Грузия", time: "1–2 дня", note: "Тбилиси и регионы" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white border-2 border-stone-200 hover:border-amber-400 transition-colors group">
                    <div>
                      <span className="font-bold text-lg">{item.route}</span>
                      <span className="text-stone-500 ml-3 text-sm">{item.note}</span>
                    </div>
                    <span className="font-mono text-amber-600 font-bold">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute -inset-3 bg-amber-400 transform rotate-1" />
                <div className="relative bg-white p-8 lg:p-10 border-2 border-stone-900">
                  <h3 className="text-2xl font-black mb-8">Рассчитать отправку</h3>
                  
                  <form className="space-y-6">
                    <div>
                      <label className="block font-mono text-xs text-stone-500 mb-2">ИМЯ</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-4 border-2 border-stone-200 focus:border-stone-900 outline-none transition-colors bg-stone-50"
                        placeholder="Как к вам обращаться?"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-stone-500 mb-2">КОНТАКТ</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-4 border-2 border-stone-200 focus:border-stone-900 outline-none transition-colors bg-stone-50"
                        placeholder="+995 или email"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-stone-500 mb-2">НАПРАВЛЕНИЕ</label>
                      <select className="w-full px-4 py-4 border-2 border-stone-200 focus:border-stone-900 outline-none transition-colors bg-stone-50 appearance-none cursor-pointer">
                        <option value="">Выберите направление</option>
                        <option value="europe">Европа</option>
                        <option value="cis">СНГ</option>
                        <option value="georgia">Грузия</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-stone-500 mb-2">ВЕС (КГ)</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-4 border-2 border-stone-200 focus:border-stone-900 outline-none transition-colors bg-stone-50"
                        placeholder="Например: 2.5"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-4 bg-stone-900 text-white font-bold text-lg hover:bg-stone-800 transition-colors"
                    >
                      Отправить запрос →
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-amber-400" />
            <span className="font-mono text-sm text-stone-500">ПРАКТИКА</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-16">
            Как мы работаем
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Помогли семье перевезти вещи при переезде в другую страну: упаковка, склад, несколько партий отправки.",
              "Настроили регулярные отправки для локального бренда одежды на маркетплейсы. Теперь фокус на продукте.",
              "Организовали бережную упаковку и доставку хрупких предметов. Антиквариат доехал идеально."
            ].map((text, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-2 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity transform rotate-1" />
                <div className="relative p-8 border-2 border-stone-200 bg-white group-hover:border-stone-900 transition-colors">
                  <div className="font-mono text-xs text-stone-400 mb-4">КЕЙС 0{i + 1}</div>
                  <p className="text-stone-600 leading-relaxed text-lg">"{text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 lg:py-32 bg-stone-100 grain">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-amber-400" />
            <span className="font-mono text-sm text-stone-500">FAQ</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-12">
            Частые вопросы
          </h2>

          <div className="bg-white border-2 border-stone-200 p-6 lg:p-8">
            {faqItems.map((item, idx) => (
              <FAQItem
                key={idx}
                index={idx}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === idx}
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-24 lg:py-32 bg-stone-900 text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-amber-400" />
                <span className="font-mono text-sm text-stone-500">КОНТАКТЫ</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-12">
                Связаться<br />с нами
              </h2>

              <div className="space-y-8 mb-12">
                <div>
                  <div className="font-mono text-xs text-stone-500 mb-2">АДРЕС</div>
                  <div className="text-xl">Тбилиси, Дигоми, 3-й квартал, здание 7</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-stone-500 mb-2">ТЕЛЕФОН</div>
                  <a href="tel:+995511282228" className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
                    +995 511 282 228
                  </a>
                </div>
                <div>
                  <div className="font-mono text-xs text-stone-500 mb-2">ГРАФИК</div>
                  <div className="text-lg">пн–пт 10:00–19:00</div>
                  <div className="text-lg text-stone-400">сб–вс 11:00–16:00</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a 
                  href="tel:+995511282228"
                  className="px-6 py-3 bg-amber-400 text-stone-900 font-bold hover:bg-amber-300 transition-colors"
                >
                  Позвонить
                </a>
                <a 
                  href="https://wa.me/995511282228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-stone-700 hover:border-green-500 hover:text-green-500 transition-colors"
                >
                  WhatsApp
                </a>
                <a 
                  href="https://t.me/+995511282228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-stone-700 hover:border-sky-500 hover:text-sky-500 transition-colors"
                >
                  Telegram
                </a>
              </div>
            </div>

            <div>
              <div className="bg-stone-800 border border-stone-700 p-8 lg:p-10">
                <h3 className="text-xl font-bold mb-8">Обратная связь</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block font-mono text-xs text-stone-500 mb-2">ИМЯ</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-4 bg-stone-900 border border-stone-700 focus:border-amber-400 outline-none transition-colors text-white"
                      placeholder="Как к вам обращаться?"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-stone-500 mb-2">КОНТАКТ</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-4 bg-stone-900 border border-stone-700 focus:border-amber-400 outline-none transition-colors text-white"
                      placeholder="+995 или email"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-stone-500 mb-2">СООБЩЕНИЕ</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-4 bg-stone-900 border border-stone-700 focus:border-amber-400 outline-none transition-colors text-white resize-none"
                      placeholder="Чем можем помочь?"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-amber-400 text-stone-900 font-bold hover:bg-amber-300 transition-colors"
                  >
                    Отправить →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-16 border-t border-stone-800">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-400 flex items-center justify-center">
                  <span className="text-stone-900 font-black text-xl">M</span>
                </div>
                <div>
                  <span className="font-bold text-xl block">Mark'n'Post</span>
                  <span className="font-mono text-xs text-stone-500">TBILISI LOGISTICS</span>
                </div>
              </div>
              <p className="text-stone-400 max-w-md mb-6">
                Инновационный логистический сервис из Тбилиси. 
                Международные отправки, склад, упаковка и курьерская доставка.
              </p>
              <div className="font-mono text-sm text-stone-500 space-y-1">
                <p>Дигоми, 3-й квартал, здание 7</p>
                <p>пн–пт 10–19, сб–вс 11–16</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Навигация</h4>
              <div className="space-y-3">
                {['Услуги', 'Для бизнеса', 'Для частных', 'FAQ', 'Контакты'].map((item, i) => (
                  <a 
                    key={i}
                    href={`#${['services', 'business', 'personal', 'faq', 'contacts'][i]}`}
                    className="block text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Контакт</h4>
              <div className="space-y-3">
                <a href="tel:+995511282228" className="block text-amber-400 font-mono">
                  +995 511 282 228
                </a>
                <a href="https://wa.me/995511282228" className="block text-stone-400 hover:text-green-400 transition-colors">
                  WhatsApp
                </a>
                <a href="https://t.me/+995511282228" className="block text-stone-400 hover:text-sky-400 transition-colors">
                  Telegram
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-600 text-sm font-mono">
              © 2024 MARK'N'POST. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-stone-500 text-sm font-mono">ONLINE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
