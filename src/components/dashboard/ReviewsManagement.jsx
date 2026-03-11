import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Star, Check, X, Trash2, Loader2, MessageSquare } from 'lucide-react';

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Review.list('-created_date')
      .then(data => {
        // التعديل السحري: نتأكد إن البيانات دائماً قائمة، وإذا مافي بيانات نحط قائمة فاضية
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setReviews([]);
        setLoading(false);
      });
  }, []);

  const approve = async (id) => {
    await base44.entities.Review.update(id, { is_approved: true });
    setReviews(prev => prev.map(r => r.id === id ? { ...r, is_approved: true } : r));
  };

  const reject = async (id) => {
    await base44.entities.Review.update(id, { is_approved: false });
    setReviews(prev => prev.map(r => r.id === id ? { ...r, is_approved: false } : r));
  };

  const remove = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا التقييم؟')) return;
    await base44.entities.Review.delete(id);
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  // حماية إضافية قبل الفلترة
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h3 className="font-bold text-[#0f1b2d] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            التقييمات ({safeReviews.length})
          </h3>
          <div className="flex gap-4 text-sm bg-slate-50 px-4 py-2 rounded-xl">
            <span className="text-green-600 font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> {safeReviews.filter(r => r.is_approved).length} منشور
            </span>
            <span className="text-amber-600 font-bold flex items-center gap-1">
              <X className="w-4 h-4" /> {safeReviews.filter(r => !r.is_approved).length} معلق
            </span>
          </div>
        </div>
        
        {safeReviews.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">لا توجد تقييمات بعد</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {safeReviews.map(r => (
              <div key={r.id} className={`p-6 flex flex-col sm:flex-row items-start gap-4 transition-colors ${!r.is_approved ? 'bg-amber-50/30 hover:bg-amber-50/50' : 'hover:bg-slate-50'}`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0f1b2d] to-slate-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                  {r.name?.charAt(0) || 'ع'}
                </div>
                
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <p className="font-bold text-[#0f1b2d] text-lg">{r.name}</p>
                    {r.service_type && <span className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-bold">{r.service_type}</span>}
                    <span className={`text-xs px-3 py-1 rounded-full font-bold shadow-sm ${r.is_approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 animate-pulse'}`}>
                      {r.is_approved ? 'منشور للعامة' : 'بانتظار الموافقة'}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= (r.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-100/50">{r.comment}</p>
                </div>
                
                <div className="flex sm:flex-col gap-2 flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
                  {!r.is_approved && (
                    <button onClick={() => approve(r.id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 hover:shadow-sm transition-all font-bold text-sm" title="موافقة ونشر">
                      <Check className="w-5 h-5" /> <span className="sm:hidden">نشر</span>
                    </button>
                  )}
                  {r.is_approved && (
                    <button onClick={() => reject(r.id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:shadow-sm transition-all font-bold text-sm" title="إلغاء النشر">
                      <X className="w-5 h-5" /> <span className="sm:hidden">إخفاء</span>
                    </button>
                  )}
                  <button onClick={() => remove(r.id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:shadow-sm transition-all font-bold text-sm" title="حذف نهائي">
                    <Trash2 className="w-5 h-5" /> <span className="sm:hidden">حذف</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
