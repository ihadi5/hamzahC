import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Truck, FileText, BadgePercent, Users, ArrowLeft } from 'lucide-react';

// زر محلي لمنع الشاشة الحمراء
const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`inline-flex items-center justify-center transition-colors ${className}`}>
    {children}
  </button>
);

const features = [
  {
    icon: Building2,
    title: 'المشاريع الكبرى',
    desc: 'خبرة واسعة في تنفيذ مشاريع البنية التحتية والمباني الضخمة.',
  },
  {
    icon: FileText,
    title: 'المناقصات الحكومية',
    desc: 'مسجلون ومؤهلون للدخول في المناقصات الحكومية والخاصة.',
  },
  {
    icon: Truck,
    title: 'توريد بالجملة',
    desc: 'نوفر كميات كبيرة من المواد والمعدات بأسعار تنافسية جداً.',
  },
  {
    icon: BadgePercent,
    title: 'أسعار خاصة للشركات',
    desc: 'باقات وأسعار مخصصة تناسب حجم مشروعك ومتطلباتك.',
  },
];

export default function B2BSection() {
  return (
    <section id="b2b" dir="rtl" className="py-24 lg:py-32 bg-[#0f1b2d] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-orange-400 font-bold text-sm tracking-widest mb-6 bg-orange-400/10 px-4 py-2 rounded-full border border-orange-400/20">
              <Users className="w-4 h-4" />
              قطاع الأعمال B2B
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              شريك استراتيجي
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-orange-400 to-amber-300">
                للشركات والمقاولين
              </span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              نفخر بشراكاتنا مع كبرى شركات المقاولات والجهات الحكومية في المملكة. نقدم حلولاً مخصصة 
              وأسعاراً تنافسية لمشاريع البنية التحتية والمباني التجارية والسكنية.
            </p>
            <Button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl px-8 h-14 text-base font-bold shadow-2xl shadow-orange-500/20"
            >
              تواصل مع قسم المبيعات
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-400/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-400/10 flex items-center justify-center mb-4 group-hover:bg-orange-400/20 transition-colors">
                  <f.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-white/5 text-center"
        >
          <p className="text-white/30 text-sm mb-8">معتمدون ومسجلون لدى</p>
          <div className="flex flex-wrap justify-center gap-12">
            {['وزارة التجارة', 'الغرفة التجارية', 'هيئة المقاولين', 'الدفاع المدني'].map((name) => (
              <div key={name} className="text-white/20 font-bold text-sm border border-white/5 px-6 py-3 rounded-xl">
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}