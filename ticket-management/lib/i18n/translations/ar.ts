import { en } from "./en";

export const ar: typeof en = {
  common: {
    search: "بحث عن التذاكر",
    status: {
      open: "مفتوحة",
      completed: "مكتملة",
      all: "الكل",
    },
    priority: {
      high: "عالية",
      medium: "متوسطة",
      low: "منخفضة",
    },
    actions: {
      create: "إنشاء تذكرة",
      update: "تحديث",
      cancel: "إلغاء",
      save: "حفظ",
      delete: "حذف",
      complete: "إكمال",
      reopen: "إعادة فتح",
      close: "إغلاق",
    },
  },
  tickets: {
    title: "التذاكر",
    newTicket: "تذكرة جديدة",
    details: {
      submitter: "المُقدم",
      location: "الموقع",
      priority: "الأولوية",
      status: "الحالة",
      created: "تاريخ الإنشاء",
      updated: "تاريخ التحديث",
      description: "الوصف",
      image: "الصورة",
    },
    filters: {
      all: "جميع التذاكر",
      open: "التذاكر المفتوحة",
      completed: "التذاكر المكتملة",
    },
    form: {
      title: "العنوان",
      submitterName: "اسم المُقدم",
      location: "الموقع",
      priority: "الأولوية",
      description: "الوصف",
      image: "الصورة",
    },
  },
  header: {
    settings: "الإعدادات",
    language: "اللغة",
  },
  languages: {
    en: "English",
    fr: "Français",
    de: "Deutsch",
    zh: "中文",
    ja: "日本語",
    tr: "Türkçe",
    es: "Español",
    yue: "粵語",
    ar: "العربية",
    pt: "Portuguese",
  },
};
