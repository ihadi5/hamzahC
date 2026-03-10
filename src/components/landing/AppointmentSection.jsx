import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Send, CheckCircle } from 'lucide-react';

// مكونات محلية لتفادي أخطاء الاستيراد والشاشة الحمراء
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-3xl shadow-xl shadow-slate-100/50 border border-slate-100 ${className}`}>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className={`w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${props.className}`}
  />
);

const Button = ({ children, onClick, type = "button", className }) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center transition-all ${className}`}
  >
    {children}
  </button>
);

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('تم طلب الموعد:', formData);
    
    // محاكاة الإرسال وإظهار رسالة نجاح
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', date: '', time: '' });
    }, 4000);
  };

  return (
    <section id="appointment" dir="rtl" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm bg-orange-50 px-4 py-2 rounded-full mb-4">
            <CalendarDays className="w-4 h-4" /> حجز موعد
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b2d] mb-4">
            حدد موعداً للمعاينة
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            اختر الوقت المناسب لك، وسيقوم فريقنا بالتواصل معك لتأكيد الموعد وتلبية احتياجات مشروعك.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="p-8 lg:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0f1b2d] mb-2">تم استلام طلبك بنجاح!</h3>
                <p className="text-slate-500">سنتواصل معك قريباً لتأكيد الموعد في الوقت المحدد.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2d] mb-2">الاسم الكامل *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك الكريم"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2d] mb-2">رقم الجوال أو البريد *</label>
                    <Input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="للتواصل معك"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2d] mb-2">تاريخ الموعد *</label>
                    <Input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0f1b2d] mb-2">الوقت المفضل *</label>
                    <div className="relative">
                      <Input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full h-14 mt-4 bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30">
                  <Send className="w-5 h-5 ml-2" />
                  تأكيد حجز الموعد
                </Button>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}