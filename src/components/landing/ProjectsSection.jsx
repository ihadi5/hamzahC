import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const FILTERS = ['الكل', 'سباكة', 'كهرباء', 'دهانات', 'مقاولات'];

const DEMO_PROJECTS = [
  { id: 1, title: 'تمديدات كهربائية - مجمع تجاري', category: 'كهرباء', client: 'شركة الأفق العقارية', location: 'المدينة المنورة', year: '2024', image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop' },
  { id: 2, title: 'شبكة سباكة - مجمع سكني', category: 'سباكة', client: 'مقاولات النخيل', location: 'المدينة المنورة', year: '2024', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop' },
  { id: 3, title: 'دهانات ديكورية - فيلا فاخرة', category: 'دهانات', client: 'عميل خاص', location: 'المدينة المنورة', year: '2023', image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop' },
  { id: 4, title: 'دهانات أسفلت - طريق داخلي', category: 'دهانات', client: 'بلدية المدينة', location: 'المدينة المنورة', year: '2023', image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&h=400&fit=crop' },
  { id: 5, title: 'لوحة توزيع صناعية - مصنع', category: 'كهرباء', client: 'شركة الإنتاج الوطني', location: 'المدينة المنورة', year: '2023', image_url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&h=400&fit=crop' },
  // رابط إجباري من Picsum عشان نكسر تعليق المتصفح 👇
  { id: 6, title: 'تركيب شبكة مياه - مجمع تجاري', category: 'مقاولات', client: 'مجموعة البناء الحديث', location: 'المدينة المنورة', year: '2024', image_url: 'https://picsum.photos/seed/water/600/400' },
];

const catColor = {
  'كهرباء': 'bg-amber-100 text-amber-700',
  'سباكة': 'bg-blue-100 text-blue-700',
  'دهانات': 'bg-purple-100 text-purple-700',
  'مقاولات': 'bg-slate-100 text-slate-700',
  'توريد': 'bg-green-100 text-green-700',
};

export default function ProjectsSection() {
  const [filter, setFilter] = useState('الكل');
  const [projects] = useState(DEMO_PROJECTS);

  const filtered = filter === 'الكل' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" dir="rtl" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm bg-orange-50 px-4 py-2 rounded-full mb-4">
            <Briefcase className="w-4 h-4" /> معرض المشاريع
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b2d] mb-4">أبرز مشاريعنا المنجزة</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">نفخر بإنجاز مئات المشاريع في المدينة المنورة والمنطقة الغربية</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${filter === f ? 'bg-[#0f1b2d] text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div key={p.id || p.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                className="group rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 bg-white">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${catColor[p.category] || 'bg-gray-100 text-gray-700'}`}>{p.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[#0f1b2d] font-bold text-lg mb-3">{p.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.year}</span>
                  </div>
                  {p.client && <p className="text-sm text-slate-400 mt-2">العميل: {p.client}</p>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}