import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hero_title": "ENGINEERING AI GENIUS",
      "hero_subtitle": "I am Usama Haseen, an AI Engineer specializing in building full-stack solutions, autonomous agents, and mission-critical intelligence.",
      "view_services": "View Services",
      "get_in_touch": "Get in Touch",
      "premium_services": "PREMIUM SERVICES",
      "services_desc": "High-quality solutions at industrial-disrupting prices.",
      "contact_title": "Let's Build Something",
      "contact_desc": "I will respond to your inquiry within 24 hours.",
      "order_policy": "Note: 50% advance payment required to start, and 50% upon project completion.",
      "first_name": "First Name",
      "last_name": "Last Name",
      "email": "Email Address",
      "phone": "Phone Number",
      "country": "Country",
      "city": "City",
      "category": "Inquiry Category",
      "message": "Project Details",
      "payment_method": "Payment Method",
      "submit": "DISPATCH INQUIRY",
      "processing": "PROCESSING...",
      "success_msg": "Order Received!",
      "success_desc": "Thank you for your trust. Usama will contact you shortly.",
      "payment_options": {
        "card": "Visa / Mastercard / Debit",
        "bitcoin": "Bitcoin / Crypto",
        "bank": "Bank Transfer"
      }
    }
  },
  ur: {
    translation: {
      "hero_title": "AI میں کمال کی انجنئیبرنگ",
      "hero_subtitle": "میں اسامہ حسین ہوں، ایک AI انجنئیبر جو مکمل حل، خود مختار ایجنٹس اور اہم ذہانت بنانے میں مہارت رکھتا ہوں۔",
      "view_services": "خدمات دیکھیں",
      "get_in_touch": "رابطہ کریں",
      "premium_services": "اعلیٰ معیار کی خدمات",
      "services_desc": "صنعتی قیمتوں پر بہترین معیار کے حل۔",
      "contact_title": "آئیں کچھ بناتے ہیں",
      "contact_desc": "میں 24 گھنٹے کے اندر آپ کی انکوائری کا جواب دوں گا۔",
      "order_policy": "نوٹ: کام شروع کرنے کے لیے 50٪ پیشگی ادائیگی اور 50٪ کام مکمل ہونے پر۔",
      "first_name": "پہلا نام",
      "last_name": "آخری نام",
      "email": "ای میل ایڈریس",
      "phone": "فون نمبر",
      "country": "ملک",
      "city": "شہر",
      "category": "انکوائری کا زمرہ",
      "message": "پروجیکٹ کی تفصیلات",
      "payment_method": "ادائیگی کا طریقہ",
      "submit": "انکوائری بھیجیں",
      "processing": "عمل جاری ہے...",
      "success_msg": "آرڈر موصول ہو گیا!",
      "success_desc": "آپ کے اعتماد کا شکریہ۔ اسامہ جلد آپ سے رابطہ کریں گے۔",
      "payment_options": {
        "card": "ویزا / ماسٹر کارڈ / ڈیبٹ",
        "bitcoin": "بٹ کوائن / کرپٹو",
        "bank": "بینک ٹرانسفر"
      }
    }
  },
  hi: {
    translation: {
      "hero_title": "AI प्रतिभा की इंजीनियरिंग",
      "hero_subtitle": "मैं उसामा हसीन हूँ, एक AI इंजीनियर जो पूर्ण-स्टैक समाधान, स्वायत्त एजेंट और महत्वपूर्ण बुद्धिमत्ता बनाने में विशेषज्ञता रखता हूँ।",
      "view_services": "सेवाएं देखें",
      "get_in_touch": "संपर्क करें",
      "premium_services": "प्रीमियम सेवाएं",
      "services_desc": "औद्योगिक कीमतों पर उच्च गुणवत्ता वाले समाधान।",
      "contact_title": "आइए कुछ बनाएं",
      "contact_desc": "मैं 24 घंटों के भीतर आपकी पूछताछ का जवाब दूंगा।",
      "order_policy": "नोट: शुरू करने के लिए 50% अग्रिम भुगतान और 50% परियोजना पूरी होने पर आवश्यक है।",
      "first_name": "पहला नाम",
      "last_name": "अंतिम नाम",
      "email": "ईमेल पता",
      "phone": "फ़ोन नंबर",
      "country": "देश",
      "city": "शहर",
      "category": "पूछताछ श्रेणी",
      "message": "परियोजना विवरण",
      "payment_method": "भुगतान का तरीका",
      "submit": "पूछताछ भेजें",
      "processing": "प्रसंस्करण...",
      "success_msg": "ऑर्डर प्राप्त हुआ!",
      "success_desc": "आपके विश्वास के लिए धन्यवाद। उसामा जल्द ही आपसे संपर्क करेंगे।",
      "payment_options": {
        "card": "वीज़ा / मास्टरकार्ड / डेबिट",
        "bitcoin": "बिटकॉइन / क्रिप्टो",
        "bank": "बैंक ट्रांसफर"
      }
    }
  },
  ar: {
    translation: {
      "hero_title": "هندسة عبقرية الذكاء الاصطناعي",
      "hero_subtitle": "أنا أسامة حسين، مهندس ذكاء اصطناعي متخصص في بناء حلول متكاملة، وعملاء مستقلين، وذكاء للمهام الحرجة.",
      "view_services": "عرض الخدمات",
      "get_in_touch": "تحدث معنا",
      "premium_services": "خدمات متميزة",
      "services_desc": "حلول عالية الجودة بأسعار تنافسية للغاية.",
      "contact_title": "لنقم ببناء شيء ما",
      "contact_desc": "سأرد على استفسارك خلال 24 ساعة.",
      "order_policy": "ملاحظة: مطلوب دفع 50% كدفعة مقدمة للبدء، و50% عند اكتمال المشروع.",
      "first_name": "الاسم الأول",
      "last_name": "اسم العائلة",
      "email": "البريد الإلكتروني",
      "phone": "رقم الهاتف",
      "country": "الدولة",
      "city": "المدينة",
      "category": "فئة الاستفسار",
      "message": "تفاصيل المشروع",
      "payment_method": "طريقة الدفع",
      "submit": "إرسال الاستفسار",
      "processing": "جاري المعالجة...",
      "success_msg": "تم استلام الطلب!",
      "success_desc": "شكراً لثقتكم. أسامة سيتواصل معكم قريباً.",
      "payment_options": {
        "card": "فيزا / ماستركارد / ديبيت",
        "bitcoin": "بيتكوين / كريبتو",
        "bank": "تحويل بنكي"
      }
    }
  },
  pt: {
    translation: {
      "hero_title": "ENGENHARIA DE GÊNIO DE IA",
      "hero_subtitle": "Eu sou Usama Haseen, um engenheiro de IA especializado em soluções full-stack, agentes autônomos e inteligência de missão crítica.",
      "view_services": "Ver Serviços",
      "get_in_touch": "Entrar em Contato",
      "premium_services": "SERVIÇOS PREMIUM",
      "services_desc": "Soluções de alta qualidade a preços disruptivos na indústria.",
      "contact_title": "Vamos Construir Algo",
      "contact_desc": "Responderei ao seu inquérito em até 24 horas.",
      "order_policy": "Nota: Pagamento de 50% adiantado para começar e 50% na conclusão do projeto.",
      "first_name": "Nome",
      "last_name": "Sobrenome",
      "email": "E-mail",
      "phone": "Telefone",
      "country": "País",
      "city": "Cidade",
      "category": "Categoria de Inquérito",
      "message": "Detalhes do Projeto",
      "payment_method": "Método de Pagamento",
      "submit": "ENVIAR INQUÉRITO",
      "processing": "PROCESSANDO...",
      "success_msg": "Pedido Recebido!",
      "success_desc": "Obrigado pela sua confiança. Usama entrará em contato em breve.",
      "payment_options": {
        "card": "Visa / Mastercard / Débito",
        "bitcoin": "Bitcoin / Cripto",
        "bank": "Transferência Bancária"
      }
    }
  },
  tr: {
    translation: {
      "hero_title": "YAPAY ZEKA DEHASI MÜHENDİSLİĞİ",
      "hero_subtitle": "Ben Usama Haseen, tam yığın çözümler, otonom aracılar ve kritik görev zekası oluşturma konusunda uzmanlaşmış bir Yapay Zeka Mühendisiyim.",
      "view_services": "Hizmetleri Görüntüle",
      "get_in_touch": "İletişime Geç",
      "premium_services": "PREMİUM HİZMETLER",
      "services_desc": "Sektörü sarsan fiyatlarla yüksek kaliteli çözümler.",
      "contact_title": "Hadi Bir Şeyler İnşa Edelim",
      "contact_desc": "Sorunuza 24 saat içinde yanıt vereceğim.",
      "order_policy": "Not: Başlamak için %50 ön ödeme, proje tamamlandığında %50 ödeme gereklidir.",
      "first_name": "Ad",
      "last_name": "Soyad",
      "email": "E-posta Adresi",
      "phone": "Telefon Numarası",
      "country": "Ülke",
      "city": "Şehir",
      "category": "Talep Kategorisi",
      "message": "Proje Detayları",
      "payment_method": "Ödeme Yöntemi",
      "submit": "TALEBİ GÖNDER",
      "processing": "İŞLENİYOR...",
      "success_msg": "Sipariş Alındı!",
      "success_desc": "Güveniniz için teşekkürler. Usama kısa süre içinde sizinle iletişime geçecektir.",
      "payment_options": {
        "card": "Visa / Mastercard / Banka Kartı",
        "bitcoin": "Bitcoin / Kripto",
        "bank": "Banka Havalesi"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
