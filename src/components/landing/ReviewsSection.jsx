import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Loader2, CheckCircle } from 'lucide-react';

// مكونات محلية لتجنب الشاشة الحمراء
const Button = ({ children, onClick, disabled, className, type = "button" }) => (
  <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center transition-colors ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    {children}
  </button>
);

const Input = (props) => (
  <input {...props} className={`w-full px-4 py-2 border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${props.className}`} />
);

const Textarea = (props) => (
  <textarea {...props} className={`w-full px-4 py-2 border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${props.className}`} />
);

const STATIC_REVIEWS = [
  { id: 1, name: 'أحمد الشمري', company: 'مؤسسة البناء الحديث', rating: 5, comment: 'خدمة ممتازة واحترافية عالية جداً، فريق متميز والتزام تام بالمواعيد. أنصح الجميع بالتعامل مع مؤسسة حمزة.', service_type: 'كهرباء' },
  { id: 2, name: 'محمد الغامدي', company: 'شركة الإعمار', rating: 5, comment: 'أتعاملوا معاهم من سنوات، دايماً على مستوى عالي في كل شيء. الجودة والسعر والالتزام.', service_type: 'مقاولات' },
  { id: 3, name: 'خالد العتيبي', company: '', rating: 4, comment: 'تركيب الشبكة الكهربائية في فلتي تم باحترافية تامة. سأتعامل معهم مستقبلاً بكل تأكيد.', service_type: 'سباكة' },
];

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1 flex-row-reverse justify-end">
      {[5, 4, 3, 2, 1].map(s => (
        <button key={s} type="button" onClick={() => onChange(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}>
          <Star className={`w-8 h-8 transition-colors ${s <= (hover || value) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews] = useState(STATIC_REVIEWS);
  const [form, setForm] = useState({ name: '', company: '', rating: 0, comment: '', service_type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.rating) return;
    setSubmitting(true);
    
    // محاكاة إرسال البيانات (بدل قاعدة البيانات مؤقتاً)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="reviews" dir="rtl" className="py-24 lg:py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" /> آراء عملائنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b2d] mb-4">ماذا يقول عملاؤنا؟</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">ثقة عملائنا هي أكبر جائزة نسعى إليها</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {reviews.slice(0, 3).map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className={`w-5 h-5 ${s <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">"{r.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0f1b2d] flex items-center justify-center text-white font-bold text-sm">
                  {r.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#0f1b2d] text-sm">{r.name}</p>
                  {r.company && <p className="text-slate-400 text-xs">{r.company}</p>}
                </div>
                {r.service_type && <span className="mr-auto text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full font-medium">{r.service_type}</span>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Review Form */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-100/50">
          <h3 className="text-xl font-black text-[#0f1b2d] mb-2">أضف تقييمك</h3>
          <p className="text-slate-500 text-sm mb-8">شاركنا تجربتك مع مؤسسة حمزة</p>

          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h4 className="font-bold text-[#0f1b2d] text-lg mb-2">شكراً على تقييمك!</h4>
              <p className="text-slate-500 text-sm">سيتم مراجعة تقييمك ونشره قريباً.</p>
              <Button onClick={() => { setSubmitted(false); setForm({ name:'', company:'', rating:0, comment:'', service_type:'' }); }} className="mt-6 px-6 py-3 bg-[#0f1b2d] text-white rounded-xl">إضافة تقييم آخر</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#0f1b2d] mb-2">تقييمك *</label>
                <StarRating value={form.rating} onChange={v => setForm(p => ({ ...p, rating: v }))} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#0f1b2d] mb-2">اسمك *</label>
                  <Input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="الاسم الكامل" className="h-11 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0f1b2d] mb-2">نوع الخدمة</label>
                  <select 
                    value={form.service_type} 
                    onChange={e => setForm(p => ({ ...p, service_type: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  >
                    <option value="">اختر الخدمة</option>
                    {['سباكة','كهرباء','توريد','دهانات','مقاولات'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0f1b2d] mb-2">تعليقك *</label>
                <Textarea required value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))} placeholder="اكتب تجربتك هنا..." className="rounded-xl resize-none min-h-[100px]" />
              </div>
              <Button type="submit" disabled={submitting || !form.rating} className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 ml-2" />إرسال التقييم</>}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}