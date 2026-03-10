import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowLeft, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import WhatsAppButton from '../components/landing/WhatsAppButton';
import { base44 } from '@/api/base44Client';

const DEMO_POSTS = [
  { id: '1', title: 'كيف تختار أنابيب السباكة المناسبة لمنزلك؟', summary: 'دليل شامل لاختيار أنواع الأنابيب المختلفة.', category: 'سباكة', cover_image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2024-11-15' },
  { id: '2', title: 'أبرز أخطاء التمديدات الكهربائية وكيف تتجنبها', summary: 'تعرف على الأخطاء الشائعة في التمديدات.', category: 'كهرباء', cover_image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2024-12-01' },
  { id: '3', title: 'الفرق بين دهانات الواجهات ودهانات الداخل', summary: 'شرح تفصيلي للفروقات بين أنواع الدهانات.', category: 'دهانات', cover_image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2025-01-10' },
  { id: '4', title: 'نصائح للحفاظ على شبكة الصرف الصحي', summary: 'إرشادات عملية تساعدك على صيانة شبكة الصرف.', category: 'نصائح', cover_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2025-02-05' },
  { id: '5', title: 'مواصفات دهانات الأسفلت للطرق في السعودية', summary: 'نظرة على المواصفات والمعايير السعودية.', category: 'أخبار', cover_image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2025-02-20' },
  { id: '6', title: 'كيف تختار شركة مقاولات موثوقة لمشروعك؟', summary: 'دليلك لاختيار الشركة المناسبة لمشروعك.', category: 'نصائح', cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2025-03-01' },
];

const catColor = { 'سباكة': 'bg-blue-100 text-blue-700', 'كهرباء': 'bg-amber-100 text-amber-700', 'دهانات': 'bg-purple-100 text-purple-700', 'نصائح': 'bg-green-100 text-green-700', 'أخبار': 'bg-orange-100 text-orange-700' };

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('الكل');

  useEffect(() => {
    base44.entities.BlogPost.filter({ is_published: true }).then(data => {
      setPosts(data.length > 0 ? data : DEMO_POSTS);
    }).catch(() => setPosts(DEMO_POSTS));
  }, []);

  const categories = ['الكل', 'سباكة', 'كهرباء', 'دهانات', 'نصائح', 'أخبار'];
  const filtered = filter === 'الكل' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      <Navbar />
      <div className="flex-grow">
        {/* تم استرجاع تصميم Base44 الأصلي للهيدر مع الخلفية الشبكية والمسافات الدقيقة */}
        <div className="bg-[#0f1b2d] py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <Zap className="w-4 h-4 text-orange-400" /> مؤسسة حمزة مرغلاني
            </Link>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">المدونة والمقالات</h1>
            <p className="text-white/50 text-lg">نصائح ومعلومات تقنية من خبراء السباكة والكهرباء والدهانات</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${filter === c ? 'bg-[#0f1b2d] text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
                <div className="relative h-52 overflow-hidden shrink-0">
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {post.category && <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${catColor[post.category] || 'bg-gray-100 text-gray-700'}`}>{post.category}</span>}
                </div>
                
                {/* تم استرجاع تصميم محتوى الكرت ليكون مطابق تماماً لـ Base44 */}
                <div className="p-6">
                  <h2 className="text-[#0f1b2d] font-black text-lg mb-3 leading-snug group-hover:text-orange-600 transition-colors">{post.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{post.summary}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.created_date?.slice(0,10) || ''}</span>
                    <Link to={`/BlogPostDetail?id=${post.id}`} className="text-orange-500 font-bold hover:underline cursor-pointer flex items-center gap-1">
                      اقرأ المزيد <ArrowLeft className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>لا توجد مقالات في هذا التصنيف</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}