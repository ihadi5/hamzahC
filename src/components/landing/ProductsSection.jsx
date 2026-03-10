import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Cable, Cpu, Smartphone, ArrowLeft, Package } from 'lucide-react';

const categories = [
  {
    icon: Droplets,
    title: 'أدوات السباكة',
    items: ['مواسير وتوصيلات', 'خلاطات ومحابس', 'أحواض وبانيوهات', 'سخانات ومضخات'],
    // الصورة اللي ضابطة معك
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    color: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50',
  },
  {
    icon: Cable,
    title: 'الكابلات والأسلاك',
    items: ['كابلات نحاسية', 'أسلاك كهربائية', 'كابلات شبكات', 'كابلات صناعية'],
    // صورة جديدة للكابلات بنفس الصيغة المضمونة
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
  },
  {
    icon: Cpu,
    title: 'المعدات والأجهزة',
    items: ['لوحات كهربائية', 'مفاتيح وقواطع', 'عدد وأدوات كهربائية', 'أجهزة قياس واختبار'],
    // صورة جديدة للمعدات والأجهزة بنفس الصيغة المضمونة
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
    color: 'from-emerald-500 to-green-500',
    lightBg: 'bg-emerald-50',
  },
  {
    icon: Smartphone,
    title: 'حلول المنازل الذكية',
    items: ['أنظمة إنارة ذكية', 'أجهزة تحكم عن بُعد', 'حساسات ذكية', 'أنظمة أمان'],
    // صورة جديدة للحلول الذكية بنفس الصيغة المضمونة
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop',
    color: 'from-violet-500 to-purple-500',
    lightBg: 'bg-violet-50',
  },
];

export default function ProductsSection() {
  return (
    <section id="products" dir="rtl" className="py-24 lg:py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest mb-4 bg-white px-4 py-2 rounded-full shadow-sm">
            <Package className="w-4 h-4" />
            منتجاتنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b2d] mb-6">
            توريد شامل لجميع المعدات والأدوات
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            نوفر تشكيلة واسعة من المنتجات والمعدات الأصلية من أفضل العلامات التجارية العالمية، بالجملة والتجزئة
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60`} />
                <div className="absolute bottom-4 right-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-600">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${cat.color}`} />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-6 flex items-center text-slate-600 hover:text-orange-500 font-bold transition-colors cursor-pointer"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  اطلب قائمة الأسعار
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}