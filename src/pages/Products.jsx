import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Phone, Zap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import WhatsAppButton from '../components/landing/WhatsAppButton';
import { base44 } from '@/api/base44Client';

const DEMO_PRODUCTS = [
  { id: 1, name: 'أنبوب PVC ضغط 4 بوصة', category: 'سباكة', price: 45, unit: 'قطعة', brand: 'Wavin', image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop', is_available: true, is_featured: true },
  { id: 2, name: 'كيبل كهربائي 2.5 مم', category: 'كهرباء', price: 120, unit: 'متر', brand: 'Riyadh Cables', image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop', is_available: true, is_featured: true },
  { id: 3, name: 'دهان أكريليك خارجي 18 لتر', category: 'دهانات', price: 280, unit: 'علبة', brand: 'Jotun', image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop', is_available: true, is_featured: false },
  { id: 4, name: 'دهان تعريف طرق أصفر', category: 'أسفلت', price: 190, unit: 'كيلو', brand: 'Sika', image_url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop', is_available: true, is_featured: true },
  { id: 5, name: 'عداد مياه 1/2 بوصة', category: 'سباكة', price: 85, unit: 'قطعة', brand: 'Zenner', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', is_available: true, is_featured: false },
  { id: 6, name: 'قاطع كهربائي 63A', category: 'كهرباء', price: 65, unit: 'قطعة', brand: 'Schneider', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop', is_available: true, is_featured: false },
  { id: 7, name: 'إيبوكسي أرضيات صناعي', category: 'دهانات', price: 320, unit: 'كيلو', brand: 'Mapei', image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop', is_available: true, is_featured: false },
  { id: 8, name: 'خرطوم مياه مرن 3/4', category: 'سباكة', price: 30, unit: 'متر', brand: 'Gardena', image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop', is_available: false, is_featured: false },
];

const catColor = { 'سباكة': 'bg-blue-100 text-blue-700', 'كهرباء': 'bg-amber-100 text-amber-700', 'دهانات': 'bg-purple-100 text-purple-700', 'أسفلت': 'bg-slate-700 text-white', 'أدوات': 'bg-green-100 text-green-700', 'أخرى': 'bg-gray-100 text-gray-700' };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('الكل');
  const [search, setSearch] = useState('');

  useEffect(() => {
    base44.entities.Product.list().then(data => {
      setProducts(data.length > 0 ? data : DEMO_PRODUCTS);
    }).catch(() => setProducts(DEMO_PRODUCTS));
  }, []);

  const categories = ['الكل', 'سباكة', 'كهرباء', 'دهانات', 'أسفلت', 'أدوات'];
  const filtered = products
    .filter(p => filter === 'الكل' || p.category === filter)
    .filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      {/* النافبار الآن موجود ومتصل بالتنقل الذكي */}
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-[#0f1b2d] pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* استخدمنا Link بدل الرابط العادي لتفادي الشاشة البيضاء */}
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <Zap className="w-4 h-4 text-orange-400" /> مؤسسة حمزة مرغلاني
            </Link>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">كتالوج المنتجات</h1>
            <p className="text-white/50 text-lg">تصفح جميع منتجاتنا وتواصل معنا للحصول على الأسعار</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="ابحث عن منتج..." 
                className="w-full pr-10 pl-4 h-11 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white" 
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === c ? 'bg-[#0f1b2d] text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-44 overflow-hidden">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {product.is_featured && <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">مميز</span>}
                  {!product.is_available && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="bg-red-500 text-white text-sm font-bold px-4 py-1 rounded-full">نفذت الكمية</span></div>}
                  <span className={`absolute bottom-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${catColor[product.category] || 'bg-gray-100 text-gray-700'}`}>{product.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0f1b2d] mb-1 text-sm leading-snug">{product.name}</h3>
                  {product.brand && <p className="text-slate-400 text-xs mb-3">{product.brand}</p>}
                  <div className="flex items-center justify-between">
                    {product.price ? (
                      <p className="text-orange-500 font-black text-lg">{product.price} <span className="text-xs font-normal text-slate-400">ر.س / {product.unit}</span></p>
                    ) : (
                      <p className="text-slate-400 text-sm">السعر عند التواصل</p>
                    )}
                  </div>
                  <a href="tel:+966556069600"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-[#0f1b2d] hover:bg-orange-500 text-white text-sm font-bold rounded-xl transition-colors duration-300">
                    <Phone className="w-4 h-4" /> استفسر الآن
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>لا توجد منتجات تطابق بحثك</p>
            </div>
          )}
        </div>
      </div>
      
      {/* الفوتر وزر الواتساب رجعوا لمكانهم الطبيعي */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}