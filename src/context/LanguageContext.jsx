import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.about': 'About Us',
    'nav.reservations': 'Reservations',
    'nav.contact': 'Contact',
    'hero.title': '01Group',
    'hero.subtitle': 'The Origin of Syrian Shawarma in Egypt. Discover the authentic Syrian taste.',
    'hero.book': 'View Menu',
    'hero.menu': 'Order Now',
    'info.address': 'Cairo, Egypt',
    'info.hours': 'Open Daily: 24 Hours',
    'info.phone': 'Hotline: 19000',
    'story.subtitle': 'Our 10-Year Journey',
    'story.title': '#1 Choice in Egypt',
    'story.text': 'For over 10 years, 01Group has been the premier choice in Egypt for authentic Syrian cuisine. Holding a Food Safety Certificate, we guarantee the highest quality, clean, and authentic shawarma taste.',
    'story.btn': 'Discover Our Story',
    'featured.subtitle': 'Signature Dishes',
    'featured.title': 'Authentic Syrian Masterpieces',
    'featured.dish1.name': 'Meat & Chicken Shawarma',
    'featured.dish1.desc': 'Slow-roasting Syrian meat and chicken shawarma on a spit.',
    'featured.dish2.name': 'Syrian Fatteh',
    'featured.dish2.desc': 'Rich plates of Fatteh with toasted bread, yogurt sauce, and roasted nuts.',
    'featured.dish3.name': 'Crispy Chicken Pizza',
    'featured.dish3.desc': 'Crispy golden fried chicken on a rich mozzarella pizza.',
    'featured.btn': 'View Full Menu',
    'footer.desc': '01Group Syrian Restaurant - Authentic Shawarma Taste.',
    'footer.gallery': 'Gallery',
    'footer.locations': 'Locations',
    'footer.story': 'Our Story',
    'footer.chef': 'Our Chefs',
    'footer.events': 'Events',
    'footer.testimonials': 'Testimonials',
    'footer.feedback': 'Feedback',
    'footer.rights': '01Group. All rights reserved.',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Fastest Delivery in Egypt',
    'contact.getInTouch': 'Get in Touch',
    'contact.getInTouchDesc': '01Group has the largest call center in Egypt, operating 24 hours. Message us on WhatsApp or call our hotlines.',
    'contact.location': '📍 Location',
    'contact.locationDesc': 'Cairo, Egypt',
    'contact.phone': '📞 Phone',
    'contact.phoneDesc': '19000 (Hotline)\n+20 100 000 0000 (WhatsApp)',
    'contact.email': '✉️ Email',
    'contact.emailDesc': 'hello@01group.com',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'Tell us your opinion...',
    'contact.form.message': 'Message',
    'contact.form.sending': 'Sending...',
    'contact.form.send': 'Send Message',
    'contact.status.success': 'Message sent!',
    'contact.status.fail': 'Failed to send message.',
    'contact.status.networkError': 'Network error.',
    'track.title': 'Track Your Order',
    'track.subtitle': 'Enter your Order ID',
    'track.placeholder': 'e.g. Order #42',
    'track.btn': 'Track',
    'track.checking': 'Checking status...',
    'track.notFound': 'Order not found.',
    'track.networkError': 'Network error.',
    'track.orderNum': 'Order #',
    'track.placedOn': 'Placed on',
    'track.address': 'Delivery Address',
    'track.step.placed': 'Placed',
    'track.step.preparing': 'Preparing',
    'track.step.onway': 'On the Way',
    'track.step.delivered': 'Delivered',
    'track.payment.vodafone': 'Vodafone Cash',
    'track.payment.cash': 'Cash',
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Click to order',
    'menu.filter.all': 'All',
    'menu.categories': {
      'shawarma': 'Shawarma',
      'fatteh': 'Syrian Fatteh',
      'pizza': 'Pizza & Pastries',
      'inventions': '01Group Inventions',
    },
    'menu.items': {
      'sh_1': { name: 'Meat Shawarma', desc: 'Authentic Syrian meat shawarma.', price: 120 },
      'sh_2': { name: 'Chicken Shawarma', desc: 'Slow-roasted chicken shawarma.', price: 100 },
      'ft_1': { name: 'Meat Fatteh', desc: 'Rice, toasted bread, yogurt and meat shawarma.', price: 150 },
      'ft_2': { name: 'Chicken Fatteh', desc: 'Rice, toasted bread, yogurt and chicken shawarma.', price: 140 },
      'pz_1': { name: 'Crispy Chicken Pizza', desc: 'Signature crispy chicken with mozzarella.', price: 160 },
      'pz_2': { name: 'Cheese Pastry', desc: 'Authentic Syrian cheese manakeesh.', price: 60 },
      'inv_1': { name: 'Qalbouza', desc: 'Stuffed pastry with melting cheese and shawarma.', price: 180 },
    }
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.menu': 'المنيو والأسعار',
    'nav.about': 'حكايتنا',
    'nav.reservations': 'احجز ترابيزتك',
    'nav.contact': 'تواصل معانا',
    'hero.title': 'أصل الشاورما الدمشقية في قلب مصر',
    'hero.subtitle': 'من حارات الشام لقلب مصر.. سر التتبيلة العتيقة ولقمة شامية تدوب في البق!',
    'hero.book': 'شوف المنيو ونقّي',
    'hero.menu': 'اطلب دلوقتي دليفري',
    'info.address': 'القاهرة، مصر',
    'info.hours': 'شغالين يومياً: ٢٤ ساعة',
    'info.phone': 'الخط الساخن: 19000',
    'story.subtitle': 'عشرة وسيرة طيبة بقالها ١٠ سنين',
    'story.title': 'أصل اللقمة السورية العتيقة',
    'story.text': 'من أكتر من ١٠ سنين و01Group هو بيتك السوري في مصر. أخدنا سر تتبيلة دمشق من حارات الشام القديمة، بسيخ شاورما على الفحم، وعيش صاج طازة طالع من الفرن، وخبرة سنين بنحطها في كل لقمة عشان تاكل حاجة تفرّح قلبك وتعدل مزاجك.',
    'story.btn': 'اعرف حكايتنا وسر صنعتنا',
    'featured.subtitle': 'من أسرار الشيف',
    'featured.title': 'حبايب القلب.. أطباق مبيختلفش عليها اتنين',
    'featured.dish1.name': 'مكس شاورما لحمة وفراخ',
    'featured.dish1.desc': 'مكس السعادة على أصوله بتتبيلة دمشقية عتيقة وتومية بيتي تضرب في النفوخ.',
    'featured.dish2.name': 'فتة شاورما سوري ملوكي',
    'featured.dish2.desc': 'أرز بسمتي مفلفل وعيش صاج محمص يقرش مع صوص تومية وخلطة دمشقية دافية.',
    'featured.dish3.name': 'بيتزا كرسبي دجاج مقرمشة',
    'featured.dish3.desc': 'قطع فراخ مقرمشة تتبيلتها سرية، غرقانة في الموتزاريلا الطبيعية وتمط معاك للآخر.',
    'featured.btn': 'افتح المنيو وشوف الباقي',
    'footer.desc': '01Group - أصل اللقمة السورية وريحة دمشق العتيقة في قلب مصر.',
    'footer.gallery': 'معرض الصور',
    'footer.locations': 'فروعنا القريبة منك',
    'footer.story': 'حكايتنا وسر الصنعة',
    'footer.chef': 'شيفات دمشق',
    'footer.events': 'العزومات والمناسبات',
    'footer.testimonials': 'كلام الناس عننا',
    'footer.feedback': 'رأيك يهمنا',
    'footer.rights': '01Group للمأكولات السورية. جميع الحقوق محفوظة.',
    'contact.title': 'دليفري طيارة.. يوصلك سخن مولع!',
    'contact.subtitle': 'أكبر كول سنتر ٢٤ ساعة جاهز يخدمك في أي وقت ومكان في مصر.',
    'contact.getInTouch': 'كلمنا في ثواني',
    'contact.getInTouchDesc': 'جعان ومش قادر تستنى؟ كلمنا أو ابعتلنا واتساب وهنكون عندك بأحلى لقمة.',
    'contact.location': '📍 موقعنا الرئيسي',
    'contact.locationDesc': 'القاهرة، مصر',
    'contact.phone': '📞 التليفون',
    'contact.phoneDesc': '19000 (الخط الساخن)\n01000000000 (واتساب)',
    'contact.email': '✉️ الإيميل',
    'contact.emailDesc': 'hello@01group.com',
    'contact.form.name': 'اسمك الكريم',
    'contact.form.email': 'إيميلك الشخصي',
    'contact.form.subject': 'الموضوع بخصوص إيه؟',
    'contact.form.subjectPlaceholder': 'قولنا رأيك أو اقتراحك بصراحة...',
    'contact.form.message': 'رسالتك لينا',
    'contact.form.sending': 'بنبعت رسالتك ثواني...',
    'contact.form.send': 'ابعت الرسالة',
    'contact.status.success': 'وصلتنا رسالتك، تسلم إيدك وهنرد عليك فوراً!',
    'contact.status.fail': 'حصلت مشكلة في الإرسال، معلش جرب تاني.',
    'contact.status.networkError': 'مشكلة في النت، اتأكد وحاول تاني.',
    'track.title': 'أكلك وصل فين دلوقتي؟',
    'track.subtitle': 'اكتب رقم الأوردر وخلي عينك عليه وهو جاي في السكة',
    'track.placeholder': 'اكتب رقم الأوردر بتاعك هنا',
    'track.btn': 'شوف الأوردر وصل فين',
    'track.checking': 'بنطمنلك على الأوردر ثواني...',
    'track.notFound': 'ملقناش أوردر بالرقم ده، اتأكد من الرقم وجرب تاني.',
    'track.networkError': 'خطأ في الاتصال، جرب كمان شوية.',
    'track.orderNum': 'أوردر رقم #',
    'track.placedOn': 'اتطلب يوم',
    'track.address': 'عنوان التوصيل',
    'track.step.placed': 'استلمنا طلبك',
    'track.step.preparing': 'على النار في المطبخ',
    'track.step.onway': 'الطيار طالع في السكة',
    'track.step.delivered': 'بالهنا والشفا.. وصلك!',
    'track.payment.vodafone': 'فودافون كاش',
    'track.payment.cash': 'كاش عند الاستلام',
    'menu.title': 'منيو الخيرات والبركة',
    'menu.subtitle': 'نقي الصنف اللي يفتح نفسك واطلبه بضغطة واحدة',
    'menu.filter.all': 'كل الأصناف',
    'menu.categories': {
      'shawarma': 'عالم الشاورما',
      'fatteh': 'فتات دمشقية ملوكي',
      'pizza': 'بيتزا ومعجنات شامية',
      'inventions': 'اختراعات 01Group الحصرية',
    },
    'menu.items': {
      'sh_1': { name: 'شاورما لحمة بلدي', desc: 'شاورما لحمة بتتبيلة دمشقية عتيقة وعيش صاج دافي.', price: 120 },
      'sh_2': { name: 'شاورما فراخ مقرمشة', desc: 'شاورما فراخ متبلة بالبهار الشامي وتومية بيتي خطيرة.', price: 100 },
      'ft_1': { name: 'فتة شاورما لحمة ملوكي', desc: 'أرز بسمتي مفلفل، عيش محمص مقرمش، شاورما لحمة وصوص فتة دافي.', price: 150 },
      'ft_2': { name: 'فتة شاورما فراخ غرقانة', desc: 'أرز بسمتي، عيش صاج محمص، شاورما فراخ وصوص التومية البلدي.', price: 140 },
      'pz_1': { name: 'بيتزا كرسبي تشيكن غرقانة', desc: 'بيتزا كرسبي مقرمشة محشوة موتزاريلا طبيعية تشد معاك.', price: 160 },
      'pz_2': { name: 'فطيرة جبنة سوري عالصاج', desc: 'معجنات بجبنة عكاوي شامية طازة تسيح في البق.', price: 60 },
      'inv_1': { name: 'القلبوظة الأصلية', desc: 'اختراع 01Group: معجنات سخنة محشوة جبنة سايحة وغرقانة شاورما.', price: 180 },
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    // Try exact flat match first
    if (translations[language][key]) {
      return translations[language][key];
    }
    // Try nested match
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
