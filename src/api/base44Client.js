import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

// سحب المتغيرات مع وضع قيم افتراضية عشان ما يكرش الموقع في Bolt
const appId = appParams?.appId || 'dummy_app_id';
const token = appParams?.token || '';
const functionsVersion = appParams?.functionsVersion || 'v1';
const appBaseUrl = appParams?.appBaseUrl || 'https://base44.app';

let client;

try {
  // محاولة تشغيل العميل الأساسي
  client = createClient({
    appId,
    token,
    functionsVersion,
    serverUrl: '',
    requiresAuth: false,
    appBaseUrl
  });
} catch (error) {
  console.warn("Base44 SDK Warning: Missing env variables. Using safe fallback.");
  // نسخة احتياطية آمنة (Mock) عشان الموقع يفتح وما يعطيك شاشة حمراء أو بيضاء
  client = {
    entities: {
      BlogPost: {
        filter: async () => []
      }
    }
  };
}

export const base44 = client;