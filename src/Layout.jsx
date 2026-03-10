import React, { useEffect } from 'react';

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    const pages = {
      Home: {
        title: 'مؤسسة حمزة مرغلاني التجارية | سباكة وكهرباء ودهانات - المدينة المنورة',
        description: 'مؤسسة حمزة مرغلاني التجارية - خدمات متكاملة في مقاولات السباكة والكهرباء والدهانات وتوريد المعدات في المدينة المنورة. خبرة أكثر من 15 عاماً. اتصل: 0556069600',
      },
      Blog: {
        title: 'المدونة والمقالات التقنية | مؤسسة حمزة مرغلاني',
        description: 'مقالات ونصائح تقنية في السباكة والكهرباء والدهانات من خبراء مؤسسة حمزة مرغلاني التجارية.',
      },
      Products: {
        title: 'كتالوج المنتجات | مؤسسة حمزة مرغلاني',
        description: 'تصفح كتالوج منتجاتنا من معدات السباكة والكهرباء والدهانات وأسعارها. مؤسسة حمزة مرغلاني - المدينة المنورة.',
      },
      Dashboard: {
        title: 'لوحة التحكم | مؤسسة حمزة مرغلاني',
        description: 'لوحة إدارة مؤسسة حمزة مرغلاني التجارية.',
      },
    };

    const meta = pages[currentPageName] || pages.Home;
    document.title = meta.title;

    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc); }
    desc.content = meta.description;

    // OG tags
    const ogTags = [
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ar_SA' },
    ];
    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
      tag.content = content;
    });

    // Keywords
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) { kw = document.createElement('meta'); kw.name = 'keywords'; document.head.appendChild(kw); }
    kw.content = 'سباكة المدينة المنورة, كهرباء المدينة المنورة, دهانات, مقاولات, توريد معدات, حمزة مرغلاني, صيانة, أسفلت طرق';

    // Robots
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots); }
    robots.content = 'index, follow';

    // lang + dir
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, [currentPageName]);

  return (
    <>
      <style>{`
        :root {
          --navy: #0f1b2d;
          --electric-orange: #f97316;
        }
      `}</style>
      {children}
    </>
  );
}