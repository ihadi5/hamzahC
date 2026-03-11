import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { FileText, Star, Briefcase, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function DashboardStats() {
  const [stats, setStats] = useState({ quotes: 0, newQuotes: 0, reviews: 0, pendingReviews: 0, projects: 0 });

  useEffect(() => {
    Promise.all([
      base44.entities.QuoteRequest.list().catch(() => []),
      base44.entities.Review.list().catch(() => []),
      base44.entities.Project.list().catch(() => []),
    ]).then(([quotes, reviews, projects]) => {
      // التأكد التام من أن كل البيانات جداول حتى لو قاعدة البيانات فارغة
      const safeQuotes = Array.isArray(quotes) ? quotes : [];
      const safeReviews = Array.isArray(reviews) ? reviews : [];
      const safeProjects = Array.isArray(projects) ? projects : [];

      setStats({
        quotes: safeQuotes.length,
        newQuotes: safeQuotes.filter(q => q.status === 'جديد').length,
        reviews: safeReviews.length,
        pendingReviews: safeReviews.filter(r => !r.is_approved).length,
        projects: safeProjects.length,
      });
    });
  }, []);

  const cards = [
    { label: 'إجمالي طلبات التسعيرة', value: stats.quotes, sub: `${stats.newQuotes} جديد`, icon: FileText, color: 'bg-blue-50 text-blue-600', accent: 'text-blue-500' },
    { label: 'التقييمات', value: stats.reviews, sub: `${stats.pendingReviews} بانتظار الموافقة`, icon: Star, color: 'bg-amber-50 text-amber-600', accent: 'text-amber-500' },
    { label: 'المشاريع المنجزة', value: stats.projects, sub: 'في معرض المشاريع', icon: Briefcase, color: 'bg-emerald-50 text-emerald-600', accent: 'text-emerald-500' },
    { label: 'معدل الاستجابة', value: '< ٢٤ ساعة', sub: 'للرد على الطلبات', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', accent: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-black text-[#0f1b2d] mb-1">{card.value}</p>
            <p className="text-slate-500 text-sm font-medium">{card.label}</p>
            <p className={`text-xs mt-1 font-bold ${card.accent}`}>{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-[#0f1b2d] mb-4 text-lg">الإجراءات المطلوبة</h3>
        <div className="space-y-3">
          {stats.newQuotes > 0 && (
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100 transition-colors hover:bg-orange-100">
              <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <p className="text-sm text-orange-800">يوجد <strong>{stats.newQuotes}</strong> طلب تسعيرة جديد بانتظار المراجعة.</p>
            </div>
          )}
          {stats.pendingReviews > 0 && (
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 transition-colors hover:bg-amber-100">
              <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-800">يوجد <strong>{stats.pendingReviews}</strong> تقييم بانتظار الموافقة للنشر.</p>
            </div>
          )}
          {stats.newQuotes === 0 && stats.pendingReviews === 0 && (
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100 transition-colors hover:bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-800 font-medium">لا توجد إجراءات معلقة. كل شيء محدّث وتحت السيطرة!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
