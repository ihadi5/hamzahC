import React from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, ArrowLeft } from 'lucide-react';

const categories = [
  {
    title: 'دهانات داخلية',
    desc: 'دهانات جدران داخلية بألوان متنوعة، مضادة للبكتيريا والرطوبة، ذات تشطيب ناعم ولامع.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop',
    items: ['دهان مائي', 'دهان زيتي', 'دهان مضاد للرطوبة', 'دهان بلاستيك'],
    color: 'from-purple-500 to-violet-600',
  },
  {
    title: 'دهانات خارجية',
    desc: 'دهانات مقاومة للعوامل الجوية والأشعة فوق البنفسجية، مثالية للواجهات والأسطح الخارجية.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop',
    items: ['دهان واجهات', 'دهان أكريليك', 'دهان حراري عاكس', 'طلاء أسطح'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'دهانات الأسفلت والطرق',
    desc: 'مواد أسفلتية وطلاءات تعريف مميزة للطرق والمواقف ومسارات المشاة. مطابقة للمواصفات السعودية والخليجية.',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop',
    items: ['دهان تعريف طرق (أصفر/أبيض)', 'أسفلت بارد وحار', 'مواد رقع وإصلاح الطرق', 'طلاء مواقف السيارات'],
    color: 'from-slate-600 to-slate-800',
    highlight: true,
  },
  {
    title: 'دهانات صناعية وأرضيات',
    desc: 'طلاءات مقاومة للمواد الكيميائية والزيوت، مثالية للمصانع والمستودعات والمرائب.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
    items: ['إيبوكسي أرضيات', 'دهان مقاوم كيميائي', 'دهان ميتال (معادن)', 'طلاء مانع للصدأ'],
    color: 'from-emerald-500 to-teal-600',
  },
];

export default function PaintsSection() {
  return (
    <section id="paints" dir="rtl" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Paintbrush className="w-4 h-4" /> الدهانات والطلاءات
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b2d] mb-4">توريد شامل للدهانات بجميع أنواعها</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            نوفر تشكيلة واسعة من الدهانات والطلاءات المتنوعة بالجملة والتجزئة، من أفضل الماركات العالمية والمحلية
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`group bg-white rounded-3xl overflow-hidden border hover:shadow-2xl transition-all duration-500 ${cat.highlight ? 'border-orange-200 ring-1 ring-orange-100' : 'border-slate-100'}`}>
              <div className="relative h-52 overflow-hidden">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70`} />
                {cat.highlight && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    🏗️ مشاريع البنية التحتية
                  </div>
                )}
                <h3 className="absolute bottom-4 right-4 text-white text-xl font-black">{cat.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{cat.desc}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {cat.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${cat.color} flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button 
                  className="flex items-center gap-2 p-0 text-slate-600 hover:text-orange-500 font-bold transition-colors cursor-pointer"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  استفسر عن الأسعار <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}