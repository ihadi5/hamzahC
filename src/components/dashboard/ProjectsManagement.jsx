import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Loader2, X, Save, Upload } from 'lucide-react';

const EMPTY = { title: '', description: '', category: '', client: '', location: '', year: new Date().getFullYear().toString(), image_url: '', is_featured: false };

export default function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    base44.entities.Project.list('-created_date')
      .then(data => {
        // حماية البيانات
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!form.title || !form.category) return;
    setSaving(true);
    if (form.id) {
      const updated = await base44.entities.Project.update(form.id, form);
      setProjects(prev => prev.map(p => p.id === form.id ? updated : p));
    } else {
      const created = await base44.entities.Project.create(form);
      setProjects(prev => [created, ...prev]);
    }
    setSaving(false);
    setForm(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    await base44.entities.Project.delete(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm(prev => ({ ...prev, image_url: file_url }));
    } catch(err) {
      console.error(err);
    }
    setUploading(false);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <div className="space-y-6">
      {/* نافذة الإضافة والتعديل */}
      {form && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-[#0f1b2d]">{form.id ? 'تعديل المشروع' : 'إضافة مشروع'}</h3>
              <button onClick={() => setForm(null)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4">
              <input type="text" placeholder="عنوان المشروع *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-4 h-11 rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white" />
              
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-4 h-11 rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white text-slate-700 font-medium">
                <option value="" disabled>اختر فئة المشروع *</option>
                {['سباكة','كهرباء','دهانات','مقاولات','توريد'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="اسم العميل" value={form.client} onChange={e => setForm(p => ({ ...p, client: e.target.value }))} className="w-full px-4 h-11 rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white" />
                <input type="text" placeholder="الموقع" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className="w-full px-4 h-11 rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white" />
              </div>
              
              <input type="text" placeholder="سنة الإنجاز" value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))} className="w-full px-4 h-11 rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white" />
              
              <textarea placeholder="وصف المشروع" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white resize-none min-h-[80px]" />
              
              {/* رفع الصورة */}
              <div>
                {form.image_url ? (
                  <div className="relative">
                    <img src={form.image_url} alt="صورة المشروع" className="w-full h-40 object-cover rounded-xl border border-slate-100" />
                    <button onClick={() => setForm(p => ({ ...p, image_url: '' }))} className="absolute top-2 left-2 p-1.5 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors">
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-2 h-28 border-2 border-dashed border-slate-200 rounded-xl hover:border-orange-300 hover:bg-orange-50/50 cursor-pointer transition-colors">
                    {uploading ? <Loader2 className="w-6 h-6 text-orange-500 animate-spin" /> : <Upload className="w-6 h-6 text-slate-400" />}
                    <span className="text-sm font-medium text-slate-500">{uploading ? 'جاري الرفع...' : 'اضغط لرفع صورة المشروع'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors w-max">
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(p => ({ ...p, is_featured: e.target.checked }))} className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500" />
                <span className="text-sm font-bold text-slate-700">تثبيت كمشروع مميز</span>
              </label>
            </div>
            
            <button onClick={handleSave} disabled={saving || !form.title || !form.category} className="w-full flex items-center justify-center h-12 mt-8 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold transition-colors">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 ml-2" /> حفظ المشروع</>}
            </button>
          </div>
        </div>
      )}

      {/* قائمة المشاريع */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h3 className="font-bold text-[#0f1b2d] text-lg">المشاريع ({safeProjects.length})</h3>
          <button onClick={() => setForm(EMPTY)} className="flex items-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-colors text-sm">
            <Plus className="w-4 h-4 ml-2" /> إضافة مشروع جديد
          </button>
        </div>
        
        {safeProjects.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">لا توجد مشاريع. أضف أول مشروع لك الآن!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {safeProjects.map(p => (
              <div key={p.id} className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-5 hover:bg-slate-50 transition-colors">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-slate-100 shadow-sm" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-300">بدون</div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0f1b2d] truncate text-base">{p.title}</p>
                  <p className="text-slate-500 text-sm mt-1">{p.category} {p.location && `• ${p.location}`} {p.year && `• ${p.year}`}</p>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
                  <button onClick={() => setForm(p)} className="flex-1 sm:flex-none flex justify-center p-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="flex-1 sm:flex-none flex justify-center p-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
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
