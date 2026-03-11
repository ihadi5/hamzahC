import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Phone, Mail, FileText, Eye, Loader2, ClipboardList } from 'lucide-react';

const statusColor = {
  'جديد': 'bg-blue-100 text-blue-700',
  'قيد المراجعة': 'bg-amber-100 text-amber-700',
  'تم الرد': 'bg-green-100 text-green-700',
  'مغلق': 'bg-slate-100 text-slate-500',
};

export default function QuoteRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.QuoteRequest.list('-created_date')
      .then(data => { setRequests(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setRequests([]); setLoading(false); });
  }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.QuoteRequest.update(id, { status });
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  const safeRequests = Array.isArray(requests) ? requests : [];

  return (
    <div className="space-y-6">
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-black text-[#0f1b2d] mb-6 border-b pb-4">تفاصيل طلب التسعيرة</h3>
            <div className="space-y-5 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-slate-400 mb-1">الاسم</p><p className="font-bold text-[#0f1b2d]">{selected.name}</p></div>
                <div><p className="text-slate-400 mb-1">الشركة</p><p className="font-bold text-[#0f1b2d]">{selected.company || '-'}</p></div>
                <div>
                  <p className="text-slate-400 mb-1">الجوال</p>
                  <a href={`tel:${selected.phone}`} className="font-bold text-orange-500 hover:underline flex items-center gap-1" dir="ltr">
                    <Phone className="w-3 h-3" /> {selected.phone}
                  </a>
                </div>
                <div>
                  <p className="text-slate-400 mb-1">البريد الإلكتروني</p>
                  {selected.email ? (
                    <a href={`mailto:${selected.email}`} className="font-bold text-orange-500 hover:underline flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {selected.email}
                    </a>
                  ) : <p className="font-bold text-[#0f1b2d]">-</p>}
                </div>
                <div><p className="text-slate-400 mb-1">الخدمة المطلوبة</p><p className="font-bold text-[#0f1b2d]">{selected.service_type}</p></div>
                <div><p className="text-slate-400 mb-1">نوع المشروع</p><p className="font-bold text-[#0f1b2d]">{selected.project_type || '-'}</p></div>
              </div>
              {selected.message && (
                <div>
                  <p className="text-slate-400 mb-2">التفاصيل والوصف</p>
                  <p className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed border border-slate-100">{selected.message}</p>
                </div>
              )}
              {selected.attachment_url && (
                <div className="pt-2">
                  <a href={selected.attachment_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-bold">
                    <FileText className="w-4 h-4" /> عرض الملف المرفق
                  </a>
                </div>
              )}
              <div className="pt-4 border-t">
                <p className="text-slate-400 mb-2">تحديث حالة الطلب</p>
                <select 
                  value={selected.status} 
                  onChange={e => updateStatus(selected.id, e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white text-[#0f1b2d] font-bold"
                >
                  {['جديد','قيد المراجعة','تم الرد','مغلق'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-8 w-full py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-colors">إغلاق</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-[#0f1b2d] flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-orange-500" /> طلبات التسعيرة ({safeRequests.length})
          </h3>
        </div>
        {safeRequests.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">لا توجد طلبات تسعيرة بعد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">الاسم والشركة</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">الخدمة المطلوبة</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">التواصل</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">الحالة</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {safeRequests.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#0f1b2d] text-base">{r.name}</p>
                      {r.company && <p className="text-slate-400 text-xs mt-1">{r.company}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-700 font-medium">{r.service_type}</p>
                      {r.project_type && <p className="text-slate-400 text-xs mt-1">{r.project_type}</p>}
                    </td>
                    <td className="px-6 py-4"><p className="text-slate-600 font-medium" dir="ltr">{r.phone}</p></td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusColor[r.status] || 'bg-slate-100'}`}>{r.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setSelected(r)} className="p-2.5 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 hover:shadow-sm transition-all" title="عرض التفاصيل">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
