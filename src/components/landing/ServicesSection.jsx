import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Zap, Wrench, Building2, Home, Factory, ShieldCheck, Clock } from 'lucide-react';

const services = [
  {
    icon: Droplets,
    title: 'مقاولات السباكة',
    desc: 'تنفيذ وتركيب شبكات المياه والصرف الصحي للمباني السكنية والتجارية بأحدث التقنيات.',
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'مقاولات الكهرباء',
    desc: 'تمديدات كهربائية متكاملة، لوحات توزيع، وأنظمة إنارة ذكية لجميع أنواع المشاريع.',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
  },
  {
    icon: Wrench,
    title: 'الصيانة والإصلاح',
    desc: 'خدمات صيانة دورية وطارئة على مدار الساعة لضمان استمرارية عمل الأنظمة بكفاءة.',
    color: 'from-emerald-500 to-green-500',
    bgLight: 'bg-emerald-50',
  },
  {
    icon: Building2,
    title: 'المشاريع التجارية',
    desc: 'حلول متخصصة للمراكز التجارية والمكاتب والفنادق بمعايير دولية عالية.',
    color: 'from-violet-500 to-purple-500',
    bgLight: 'bg-violet-50',
  },
  {
    icon: Home,
    title: 'المشاريع السكنية',
    desc: 'تصميم وتنفيذ أنظمة السباكة والكهرباء للفلل والشقق والمجمعات السكنية.',
    color: 'from-rose-500 to-pink-500',
    bgLight: 'bg-rose-50',
  },
  {
    icon: Factory,
    title: 'المشاريع الصناعية',
    desc: 'تجهيز المصانع والمستودعات بالأنظمة الكهربائية وشبكات المياه الصناعية.',
    color: 'from-slate-500 to-slate-700',
    bgLight: 'bg-slate-50',
  },
];

const features = [
  { icon: ShieldCheck, label: 'ضمان شامل على الأعمال' },
  { icon: Clock, label: 'التزام بمواعيد التسليم' },
];

export default function ServicesSection() {
  return (
    <section id="services" dir="rtl" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-orange-500 via-amber-400 to-blue-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-orange-500 font-bold text-sm tracking-widest mb-4 bg-orange-50 px-4 py-2 rounded-full">
            ما نقدمه
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b2d] mb-6">
            خدمات متكاملة تلبي جميع احتياجاتك
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            من التصميم والتنفيذ وحتى الصيانة، نوفر لك حلولاً شاملة في مجال السباكة والكهرباء
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.bgLight} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-[#0f1b2d] mb-3">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t border-slate-100"
        >
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 text-slate-600">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <f.icon className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium">{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}