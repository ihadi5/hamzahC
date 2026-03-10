import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Upload, X, Loader2, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    service_type: '', project_type: '', message: '', attachment_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // محاكاة لعملية رفع الملف (بدلاً من base44)
    setTimeout(() => {
      setForm(prev => ({ ...prev, attachment_url: 'fake_url' }));
      setFileName(file.name);
      setUploading(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // محاكاة لعملية الإرسال (بدلاً من base44)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <section id="contact" dir="rtl" className="py-24 lg:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 rounded-3xl p-12"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0f1b2d] mb-3">تم إرسال طلبك بنجاح!</h3>
            <p className="text-slate-500 leading-relaxed">
              شكراً لتواصلك مع مؤسسة حمزة. سيقوم فريقنا بمراجعة طلبك والرد عليك في أقرب وقت ممكن.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name:'', company:'', email:'', phone:'', service_type:'', project_type:'', message:'', attachment_url:'' }); setFileName(''); }}
              className="mt-8 bg-[#0f1b2d] hover:bg-[#1a2744] text-white rounded-xl px-6 py-3 font-bold transition-colors"
            >
              إرسال طلب آخر
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" dir="rtl" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-orange-500 font-bold text-sm tracking-widest mb-4 bg-orange-50 px-4 py-2 rounded-full">
            تواصل معنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b2d] mb-6">
            نحن هنا لمساعدتك
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            أرسل لنا تفاصيل مشروعك وسنعود إليك بعرض سعر مفصّل خلال ٢٤ ساعة
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-3xl p-8 lg:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[#0f1b2d] font-bold text-sm block">الاسم الكامل *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="محمد أحمد"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[#0f1b2d] font-bold text-sm block">اسم الشركة / المؤسسة</label>
                  <input
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="اختياري"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[#0f1b2d] font-bold text-sm block">رقم الجوال *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white text-left"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[#0f1b2d] font-bold text-sm block">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[#0f1b2d] font-bold text-sm block">نوع الخدمة *</label>
                  <select 
                    required
                    value={form.service_type} 
                    onChange={(e) => handleChange('service_type', e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white appearance-none"
                  >
                    <option value="" disabled>اختر نوع الخدمة</option>
                    <option value="سباكة">سباكة</option>
                    <option value="كهرباء">كهرباء</option>
                    <option value="سباكة وكهرباء">سباكة وكهرباء</option>
                    <option value="توريد معدات">توريد معدات</option>
                    <option value="مناقصة">مناقصة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[#0f1b2d] font-bold text-sm block">نوع المشروع</label>
                  <select 
                    value={form.project_type} 
                    onChange={(e) => handleChange('project_type', e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white appearance-none"
                  >
                    <option value="" disabled>اختر نوع المشروع</option>
                    <option value="سكني">سكني</option>
                    <option value="تجاري">تجاري</option>
                    <option value="صناعي">صناعي</option>
                    <option value="حكومي">حكومي</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#0f1b2d] font-bold text-sm block">تفاصيل المشروع أو الطلب</label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="اكتب تفاصيل مشروعك هنا..."
                  className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white resize-none"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-[#0f1b2d] font-bold text-sm block">إرفاق ملف (مخططات، كميات، الخ)</label>
                <div className="relative">
                  {fileName ? (
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="flex-1 text-sm text-slate-700 truncate">{fileName}</span>
                      <button type="button" onClick={() => { setFileName(''); handleChange('attachment_url', ''); }}>
                        <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-3 p-6 bg-white rounded-xl border-2 border-dashed border-slate-200 hover:border-orange-300 cursor-pointer transition-colors">
                      {uploading ? (
                        <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                      ) : (
                        <Upload className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-500">
                        {uploading ? 'جاري رفع الملف...' : 'اضغط هنا لإرفاق ملف'}
                      </span>
                      <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !form.name || !form.phone || !form.service_type}
                className="w-full h-14 flex items-center justify-center gap-2 bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-base font-bold shadow-xl shadow-orange-500/20 disabled:opacity-50 transition-all"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    إرسال الطلب
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: Phone, label: 'اتصل بنا', value: '+966 55 606 9600', href: 'tel:+966556069600', color: 'bg-blue-50 text-blue-600' },
              { icon: Mail, label: 'البريد الإلكتروني', value: 'HamzahMarghlany@gmail.com', href: 'mailto:HamzahMarghlany@gmail.com', color: 'bg-orange-50 text-orange-600' },
              { icon: MapPin, label: 'الموقع', value: 'المدينة المنورة، المملكة العربية السعودية', href: 'https://maps.app.goo.gl/v3pXZAvJABakd9Jz8', color: 'bg-green-50 text-green-600' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">{item.label}</p>
                  <p className="text-[#0f1b2d] font-bold">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Working Hours */}
            <div className="p-6 rounded-2xl bg-[#0f1b2d] text-white">
              <h4 className="font-bold mb-4">ساعات العمل</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">السبت - الخميس (ص)</span>
                  <span className="font-bold">٧:٠٠ ص – ٢:٠٠ م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">السبت - الخميس (م)</span>
                  <span className="font-bold">٤:٠٠ م – ١٠:٠٠ م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">الجمعة</span>
                  <span className="font-bold text-orange-400">٤:٠٠ م – ٨:٠٠ م</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}