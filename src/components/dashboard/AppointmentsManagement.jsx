import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { CalendarCheck, Eye, Loader2 } from 'lucide-react';

const statusColor = {
  'جديد': 'bg-blue-100 text-blue-700',
  'مؤكد': 'bg-green-100 text-green-700',
  'ملغي': 'bg-red-100 text-red-600',
  'منتهي': 'bg-slate-100 text-slate-500',
};

export default function AppointmentsManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.Appointment.list('-created_date')
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setItems([]); setLoading(false); });
  }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.Appointment.update(id, { status });
    setItems(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="space-y-6">
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-black text-[#0f1b2d] mb-6">تفاصيل الموعد</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-slate-400 mb-1">الاسم</p><p className="font-bold text-[#0f1b2d]">{selected.name}</p></div>
                <div><p className="text-slate-400 mb-1">الجوال</p><p className="font-bold text-[#0f1b2d]" dir="ltr">{selected.phone}</p></div>
                <div><p className="text-slate-400 mb-1">الخدمة</p><p className="font-bold text-[#0f1b2d]">{selected.service_type}</p></div>
                <div><p className="text-slate-400 mb-1">التاريخ</p><p className="font-bold text-[#0f1b2d]">{selected.appointment_date}</p></div>
                <div><p className="text-slate-400 mb-1">الوقت</p><p className="font-bold text-[#0f1b2d]">{selected.appointment_time}</p></div>
              </div>
              {selected.notes && <div><p className="text-slate-400 mb-1">ملاحظات</p><p className="bg-slate-50 p-3 rounded-xl text-slate-700">{selected.notes}</p></div>}
              <div>
                <p className="text-slate-400 mb-2 mt-4">تغيير الحالة</p>
                <select 
                  value={selected.status} 
                  onChange={e => updateStatus(selected.id, e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white text-[#0f1b2d] font-medium"
                >
                  {['جديد','مؤكد','ملغي','منتهي'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-colors">إغلاق</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-[#0f1b2d] flex items-center gap-2"><CalendarCheck className="w-5 h-5 text-orange-500" /> المواعيد ({safeItems.length})</h3>
        </div>
        {safeItems.length === 0 ? (
          <p className="text-center text-slate-400 py-16">لا توجد مواعيد بعد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">الاسم</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">الخدمة</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">التاريخ</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">الوقت</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">الحالة</th>
                  <th className="text-right px-6 py-4 text-slate-500 font-bold">تفاصيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {safeItems.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#0f1b2d]">{a.name}</td>
                    <td className="px-6 py-4 text-slate-600">{a.service_type}</td>
                    <td className="px-6 py-4 text-slate-600">{a.appointment_date}</td>
                    <td className="px-6 py-4 text-slate-600">{a.appointment_time}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor[a.status] || 'bg-slate-100'}`}>{a.status}</span></td>
                    <td className="px-6 py-4">
                      <button onClick={() => setSelected(a)} className="p-2 rounded-lg hover:bg-orange-50 text-orange-500 transition-colors"><Eye className="w-4 h-4" /></button>
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
