import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Zap, Droplets, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" dir="rtl" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#0f1b2d] via-[#1a2744] to-[#0c1522]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-sm">نخدم المدينة المنورة والمنطقة الغربية</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              شريكك الموثوق في
              <span className="block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-400 to-amber-300">
                  السباكة والكهرباء
                </span>
              </span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
              نقدم حلولاً متكاملة في مقاولات وتوريدات السباكة والكهرباء للمشاريع السكنية والتجارية والصناعية، 
              مع التزامنا بأعلى معايير الجودة والسلامة.
            </p>

            {/* CTAs - تم تعديلها لأزرار قياسية تحافظ على التصميم الأصلي ١٠٠٪ */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center justify-center bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl px-8 h-14 text-base font-bold shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:shadow-orange-500/50"
              >
                اطلب تسعيرة لمشروعك
                <ArrowLeft className="w-5 h-5 mr-2" />
              </button>
              <button
                onClick={() => scrollTo('#products')}
                className="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/10 rounded-xl px-8 h-14 text-base font-bold bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5 ml-2" />
                تصفح منتجاتنا
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/10">
              {[
                { value: '+١٥', label: 'سنة خبرة' },
                { value: '+٥٠٠', label: 'مشروع منجز' },
                { value: '+١٢٠', label: 'عميل دائم' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-white/50 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center justify-center relative"
          >
            {/* Floating cards */}
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  {[
                    { icon: Droplets, label: 'مقاولات السباكة', desc: 'تنفيذ وصيانة شاملة', color: 'text-blue-400 bg-blue-400/10' },
                    { icon: Zap, label: 'مقاولات الكهرباء', desc: 'تمديدات وأنظمة متكاملة', color: 'text-amber-400 bg-amber-400/10' },
                    { icon: ShieldCheck, label: 'توريد المعدات', desc: 'جملة وتجزئة بأفضل الأسعار', color: 'text-green-400 bg-green-400/10' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{item.label}</p>
                        <p className="text-white/50 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-4 shadow-2xl shadow-orange-500/30"
              >
                <p className="text-white font-black text-xl">٢٤/٧</p>
                <p className="text-white/80 text-xs">خدمة طوارئ</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}