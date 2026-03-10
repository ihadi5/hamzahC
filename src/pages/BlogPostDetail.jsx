import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Zap } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import WhatsAppButton from '../components/landing/WhatsAppButton';
import { base44 } from '@/api/base44Client';

// تم استرجاع النصوص الأصلية الكاملة من Base44 بالملي
const DEMO_POSTS = [
  { id: '1', title: 'كيف تختار أنابيب السباكة المناسبة لمنزلك؟', content: `يعدّ اختيار الأنابيب المناسبة من أهم قرارات البناء والتجديد في منزلك. في هذا الدليل نستعرض أبرز أنواع الأنابيب المستخدمة في السباكة المنزلية:\n\n**أنابيب PPR (البولي بروبيلين):**\nتُعدّ الخيار الأمثل للمياه الساخنة والباردة، وهي مقاومة للتآكل وطويلة العمر. تُستخدم على نطاق واسع في المشاريع السكنية الحديثة.\n\n**أنابيب PVC:**\nمثالية لخطوط الصرف الصحي والمياه الباردة. خفيفة الوزن وسهلة التركيب وذات تكلفة منخفضة.\n\n**أنابيب النحاس:**\nتُستخدم في المشاريع الفاخرة وتتميز بمتانتها العالية ومقاومتها للبكتيريا، لكن تكلفتها أعلى.\n\n**نصائح الخبراء:**\n- تحقق دائماً من مواصفات الضغط المناسبة لكل نوع\n- اختر الأنابيب المعتمدة من هيئة المواصفات السعودية\n- لا تتردد في الاستشارة قبل الشراء`, category: 'سباكة', cover_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2024-11-15' },
  { id: '2', title: 'أبرز أخطاء التمديدات الكهربائية وكيف تتجنبها', content: `التمديدات الكهربائية من أكثر المجالات التي تحتاج دقة واحترافية. إليك أبرز الأخطاء الشائعة:\n\n**١. استخدام أسلاك غير مناسبة:**\nكثيراً ما يتم استخدام أسلاك أقل من المقطع المطلوب لتوفير التكلفة، مما يؤدي إلى ارتفاع الحرارة وخطر الحريق.\n\n**٢. عدم تأريض الدوائر الكهربائية:**\nالتأريض ضروري جداً لحماية الأجهزة والأشخاص من الصعق الكهربائي.\n\n**٣. تحميل الدوائر فوق طاقتها:**\nتوصيل أجهزة بقدرة عالية في دوائر غير مصممة لها يُسبب انهيار القواطع أو حرائق.\n\n**٤. إهمال لوحة التوزيع:**\nيجب أن تكون لوحة التوزيع مناسبة لحجم المنزل ومُصنّعة وفق المعايير السعودية.\n\n**الحل:** دائماً استعن بمختص معتمد واحرص على فحص التمديدات كل ٥ سنوات.`, category: 'كهرباء', cover_image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=500&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2024-12-01' },
  { id: '3', title: 'الفرق بين دهانات الواجهات ودهانات الداخل', content: `الفرق جوهري بين دهانات الداخل والخارج، ومعرفته يوفّر عليك كثيراً من المال:\n\n**دهانات الداخل:**\n- تُركّز على المظهر الجمالي والتشطيب الناعم\n- مقاومة للبكتيريا وسهلة التنظيف\n- متوفرة بمئات الألوان والتشطيبات (مط، لامع، نصف لامع)\n\n**دهانات الخارج (الواجهات):**\n- مصممة لتحمّل عوامل الجو (شمس، رطوبة، أمطار)\n- مقاومة للأشعة فوق البنفسجية\n- أكثر سماكة وقدرة على التمدد والانكماش\n\n**تحذير مهم:**\nاستخدام دهان داخلي في الواجهات يُسبب تقشير سريع وضياع المال. تأكد دائماً من قراءة مواصفات المنتج قبل الشراء.`, category: 'دهانات', cover_image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=500&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2025-01-10' },
  { id: '4', title: 'نصائح للحفاظ على شبكة الصرف الصحي', content: `الصرف الصحي من أكثر الأنظمة التي يهملها أصحاب المنازل حتى تحدث الكارثة! إليك النصائح الذهبية:\n\n**الوقاية أولاً:**\n- لا تُلقِ زيوت الطعام أو الدهون في البالوعة\n- استخدم شبكات فلترة على المصارف\n- تجنب إلقاء المناديل الورقية في المرحاض\n\n**الصيانة الدورية:**\n- اسكب ماء مغلياً في المصارف شهرياً لإذابة الدهون\n- استخدم خل التنظيف وصودا الخبز لتنظيف الأنابيب بشكل دوري\n- افحص وصلات الأنابيب كل سنتين\n\n**متى تتصل بالمختص؟**\nإذا لاحظت رائحة كريهة مستمرة أو تسرب ماء بجانب أي وصلة، اتصل فوراً قبل تفاقم المشكلة.`, category: 'نصائح', cover_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2025-02-05' },
  { id: '5', title: 'مواصفات دهانات الأسفلت للطرق في السعودية', content: `تُعدّ دهانات الطرق وخطوط المرور من المتطلبات الأساسية لأمان المرور. إليك أبرز المعايير السعودية:\n\n**المواصفات المعتمدة:**\n- اللون الأبيض للخطوط الطولية والعرضية\n- اللون الأصفر للخطوط الفاصلة بين الاتجاهات المتعاكسة\n- اللون الأحمر لمناطق الحظر والوقوف الممنوع\n\n**المتطلبات التقنية:**\n- مقاومة عالية للاحتكاك لمنع الانزلاق\n- مرئية ليلية عالية بإضافة كرات الزجاج العاكسة\n- مقاومة لحرارة الأسفلت في الصيف (تصل لـ ٧٠ درجة مئوية)\n\n**مؤسستنا تنفذ:**\nدهانات طرق وفق مواصفات هيئة الطرق السعودية، مع ضمان الثبات والمتانة لسنوات.`, category: 'أخبار', cover_image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=500&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2025-02-20' },
  { id: '6', title: 'كيف تختار شركة مقاولات موثوقة لمشروعك؟', content: `اختيار شركة مقاولات موثوقة قرار مصيري يحدد جودة مشروعك ومدى سلامته. إليك معايير الاختيار الصحيح:\n\n**١. التراخيص والتسجيل:**\nتأكد أن الشركة مسجلة في وزارة التجارة وهيئة المقاولين السعودية ولديها سجل تجاري ساري.\n\n**٢. الخبرة والمشاريع السابقة:**\nاطلب أمثلة على مشاريع سابقة مشابهة لمشروعك. الشركة الجيدة لن تتردد في إظهار أعمالها.\n\n**٣. الضمانات:**\nاحرص على الحصول على ضمان كتابي يشمل العمالة والمواد لمدة لا تقل عن سنة.\n\n**٤. الشفافية في الأسعار:**\nالشركة الموثوقة تقدم عرض سعر تفصيلي وواضح دون مفاجآت لاحقة.\n\n**٥. التواصل والمتابعة:**\nاختر شركة تتجاوب معك بسرعة وتُوفّر تقارير دورية عن سير المشروع.`, category: 'نصائح', cover_image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=500&fit=crop', author: 'فريق مؤسسة حمزة', created_date: '2025-03-01' },
];

const catColor = { 'سباكة': 'bg-blue-100 text-blue-700', 'كهرباء': 'bg-amber-100 text-amber-700', 'دهانات': 'bg-purple-100 text-purple-700', 'نصائح': 'bg-green-100 text-green-700', 'أخبار': 'bg-orange-100 text-orange-700' };

export default function BlogPostDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = searchParams.get('id');

    if (!id) { 
      navigate('/Blog'); 
      return; 
    }

    base44.entities.BlogPost.filter({ id }).then(data => {
      if (data && data.length > 0) {
        setPost(data[0]);
      } else {
        const demo = DEMO_POSTS.find(p => String(p.id) === String(id));
        setPost(demo || null);
      }
      setLoading(false);
    }).catch(() => {
      const demo = DEMO_POSTS.find(p => String(p.id) === String(id));
      setPost(demo || null);
      setLoading(false);
    });
  }, [searchParams, navigate]);

  const handleQuoteClick = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" dir="rtl">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center" dir="rtl">
      <Navbar />
      <p className="text-slate-500 text-lg mb-4">المقال غير موجود</p>
      <Link to="/Blog" className="text-orange-500 font-bold hover:underline">العودة للمدونة</Link>
    </div>
  );

  const paragraphs = (post.content || '').split('\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-[#0f1b2d] pt-32 pb-0 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link to="/Blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <Zap className="w-4 h-4 text-orange-400" />
              <ArrowRight className="w-4 h-4" /> العودة للمدونة
            </Link>
            <div className="mb-4">
              {post.category && (
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${catColor[post.category] || 'bg-gray-100 text-gray-700'}`}>{post.category}</span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-snug">{post.title}</h1>
            <div className="flex flex-wrap gap-5 text-white/40 text-sm pb-10">
              {post.author && <span className="flex items-center gap-2"><User className="w-4 h-4" />{post.author}</span>}
              {post.created_date && <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{post.created_date?.slice(0,10)}</span>}
            </div>
          </div>
        </div>

        {post.cover_image && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1 relative z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl overflow-hidden shadow-2xl h-72 sm:h-96">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 prose prose-lg max-w-none">
            {paragraphs.map((para, i) => {
              // هذا الكود يقرأ النصوص العريضة ويسوي لها تصميم خاص
              if (para.startsWith('**') && para.endsWith('**')) {
                return <h3 key={i} className="text-[#0f1b2d] font-black text-xl mt-8 mb-3">{para.replace(/\*\*/g, '')}</h3>;
              }
              // هذا الكود يقرأ القوائم (النقاط) ويرتبها
              if (para.startsWith('- ')) {
                return <li key={i} className="text-slate-600 leading-relaxed mb-2 mr-4">{para.slice(2)}</li>;
              }
              // النصوص العادية
              return <p key={i} className="text-slate-600 leading-relaxed mb-4">{para}</p>;
            })}
          </motion.div>

          <div className="mt-10 bg-[#0f1b2d] rounded-3xl p-8 text-center shadow-lg">
            <p className="text-white font-bold text-lg mb-4">هل تحتاج خدمات احترافية؟ تواصل معنا الآن</p>
            <button
              onClick={handleQuoteClick}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer"
            >
              اطلب تسعيرة مجانية
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}