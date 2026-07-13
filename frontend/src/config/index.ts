/// <reference types="vite/client" />

export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'CUHP Question Bank',
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

export const AppConfig = {
  defaultTheme: 'light',
  maxUploadSize: 10 * 1024 * 1024, // 10MB
  supportedFormats: ['application/pdf'],
};
