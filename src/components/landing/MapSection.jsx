import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export default function MapSection() {
  return (
    <section id="map" dir="rtl" className="py-24 lg:py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm bg-orange-100 px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" /> موقعنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b2d] mb-4">زورنا في المدينة المنورة</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">نرحب بزيارتكم في مقرنا لمعاينة المنتجات والحصول على الاستشارة المناسبة</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Info Cards */}
          <div className="space-y-5">
            {[
              { icon: MapPin, title: 'العنوان', value: 'الامير عبدالمجيد بن عبدالعزيز، الاسكان، المدينة المنورة 42317، السعودية', color: 'bg-blue-50 text-blue-600' },
              { icon: Phone, title: 'الهاتف', value: '+966 55 606 9600', color: 'bg-orange-50 text-orange-600', isLtr: true },
              { icon: Clock, title: 'ساعات العمل', value: 'السبت – الخميس: ٧ص–٢م و٤م–١٠م\nالجمعة: ٤م – ٨م', color: 'bg-green-50 text-green-600' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">{item.title}</p>
                  <p className="text-[#0f1b2d] font-bold text-sm whitespace-pre-line">
                    {/* هنا الحل: إذا كان النص يحتاج LTR نغلفه بـ span */}
                    {item.isLtr ? <span dir="ltr" className="inline-block">{item.value}</span> : item.value}
                  </p>
                </div>
              </div>
            ))}
            <a href="https://maps.app.goo.gl/mt5xxxGyfJpChiz9A" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 mt-2 bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 text-sm">
              <Navigation className="w-4 h-4" /> افتح في خرائط جوجل
            </a>
          </div>

          {/* Map Embed */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="lg:col-span-2 rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-[420px] bg-slate-100 relative">
            <iframe
              src="https://maps.google.com/maps?q=24.4672489,39.6364379&hl=ar&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع مؤسسة حمزة مرغلاني التجارية"
              className="absolute inset-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}