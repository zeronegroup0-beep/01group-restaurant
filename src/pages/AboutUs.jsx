import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutUs() {
  const { language, t } = useLanguage();

  return (
    <div className="fade-in">
      <header className="page-header no-interaction" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `linear-gradient(var(--dark-overlay), var(--dark-overlay)), url(${import.meta.env.BASE_URL}Images/hero_shawarma.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '0 1rem' }}>
          <h1 className="scale-in" style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)', color: 'var(--gold)', textShadow: '0 8px 20px rgba(0,0,0,0.9)', marginBottom: '1rem' }}>
            {language === 'ar' ? 'حكايتنا وسر صنعتنا' : 'Our Story'}
          </h1>
          <p className="fade-in stagger-1" style={{ fontSize: 'clamp(1rem, 3vw, 1.6rem)', color: '#fff', fontWeight: 'bold', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            {language === 'ar' ? 'عشر سنين من العشق والشغف بلقمة سورية أصيلة على أرض مصر.' : 'A 10-year journey of passion for authentic Syrian cuisine.'}
          </p>
        </div>
      </header>

      <section className="section container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: '2rem', color: 'var(--gold)' }}>
              {language === 'ar' ? 'أصل الشاورما السورية في قلب مصر' : 'The Origin of Syrian Shawarma in the Heart of Egypt'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '2' }}>
              {language === 'ar' ? (
                <>
                  <p>بدأت حكاية 01Group من أكتر من ١٠ سنين، بحلم ورسالة واضحة: ننقل سر تتبيلة الشاورما السورية الأصلية لقلب مصر. ماكناش بنعمل مجرد مطعم، كنا عايزين نفتح بيت شامي دافي لكل عشاق الأكل الأصيل.</p>
                  <p>الشاورما عندنا مش مجرد سندوتش، دي صنعة وسر متوارث؛ سيخ شاورما بيستوي على الهادي، بتتبيلة بهارات شامية خاصة، مع عيش صاج سخن طالع من الفرن وتومية بيتي تظبط الدماغ. ومعانا أمهر الشيفات السوريين اللي بيطبخوا بحب وكرم، عشان كل لقمة تاكلها تحس فيها ببركة وروح الشام.</p>
                </>
              ) : (
                <>
                  <p>01Group Syrian Restaurant was founded over 10 years ago to bring a paradigm shift to Levantine cuisine in Egypt. We made it our mission to deliver authentic Syrian taste to every food lover.</p>
                  <p>We don't just serve food; we offer an authentic Syrian experience. From slow-roasted shawarma on the spit to rich fatteh plates and fresh pastries, every dish tells a story of our commitment to authentic flavors. Our team of skilled Syrian chefs ensures an unforgettable experience.</p>
                </>
              )}
            </div>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)' }}></div>

          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center', marginBottom: '4rem' }}>
            <div style={{ flex: '1 1 280px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                {language === 'ar' ? 'شهادة سلامة ونظافة الغذاء.. أمانتك في رقبتنا' : 'Food Safety Certificate'}
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {language === 'ar'
                  ? 'في 01Group، صحتك وراحة بالك خط أحمر. حاصلين على "شهادة سلامة الغذاء"، وكل خضارنا ولحومنا طازة بتيجي يوم بيوم، تحت رقابة صارمة ونظافة تفتح النفس، عشان تدوق أكل لذيذ ومضمون ١٠٠٪ وأنت مطمن لأهلك وعيلتك.'
                  : 'At 01Group, we are proud to hold the "Food Safety Certificate", ensuring the highest standards of quality and hygiene. All our ingredients are fresh, and we always prioritize the health and safety of our valued customers.'}
              </p>
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '2px solid var(--border-color)', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={import.meta.env.BASE_URL + "Images/fatteh_syrian.png"} alt="Syrian Fatteh" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '2px solid var(--border-color)', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={import.meta.env.BASE_URL + "Images/qalbouza.png"} alt="Qalbouza" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
