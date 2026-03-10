import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'المنتجات', href: '/Products' }, // تم تحديث مسار المنتجات
  { label: 'الدهانات', href: '#paints' },
  { label: 'مشاريعنا', href: '#projects' },
  { label: 'المدونة', href: '/Blog' },
  { label: 'تواصل معنا', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href) => {
    setIsOpen(false);
    // إذا كان الرابط يبدأ بـ / (مثل /Blog أو /Products) بننتقل له كصفحة جديدة
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      // إذا كنا في صفحة ثانية ونبغى نرجع لقسم في الرئيسية
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        // إذا كنا أصلاً في الرئيسية، ننزل للقسم فوراً
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleClick('#hero')}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              scrolled ? 'bg-[#0f1b2d]' : 'bg-white/10 backdrop-blur-sm border border-white/20'
            }`}>
              <Zap className={`w-5 h-5 ${scrolled ? 'text-orange-400' : 'text-orange-300'}`} />
            </div>
            <div>
              <h1 className={`text-lg font-bold leading-tight ${scrolled ? 'text-[#0f1b2d]' : 'text-white'}`}>
                مؤسسة حمزة
              </h1>
              <p className={`text-[10px] tracking-wider ${scrolled ? 'text-slate-500' : 'text-white/60'}`}>
                سباكة • كهرباء • توريدات
              </p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-slate-600 hover:text-[#0f1b2d] hover:bg-slate-100'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+966556069600" className={`flex items-center gap-2 text-sm font-medium ${
              scrolled ? 'text-slate-600' : 'text-white/80'
            }`}>
              <Phone className="w-4 h-4" />
              <span dir="ltr">+966 55 606 9600</span>
            </a>
            <button
              onClick={() => handleClick('#contact')}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2.5 shadow-lg shadow-orange-500/25 font-bold transition-all duration-300"
            >
              اطلب تسعيرة
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl ${
              scrolled ? 'text-[#0f1b2d] hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="block w-full text-right px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t mt-4">
                <button
                  onClick={() => handleClick('#contact')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-bold shadow-lg transition-all duration-300"
                >
                  اطلب تسعيرة لمشروعك
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}