// Environment variable validation

const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

const optionalEnvVars = [
  "NEXT_PUBLIC_API_URL",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
] as const;

export const validateEnv = () => {
  const missing: string[] = [];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join("\n")}\n\nPlease check your .env file.`
    );
  }
};

export const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || fallback || "";
};

// Type-safe environment variables
export const env = {
  mongodbUri: () => getEnv("MONGODB_URI"),
  jwtSecret: () => getEnv("JWT_SECRET"),
  cloudinary: {
    cloudName: () => getEnv("CLOUDINARY_CLOUD_NAME"),
    apiKey: () => getEnv("CLOUDINARY_API_KEY"),
    apiSecret: () => getEnv("CLOUDINARY_API_SECRET"),
  },
  apiUrl: () => getEnv("NEXT_PUBLIC_API_URL", "http://localhost:3000"),
  nodeEnv: () => getEnv("NODE_ENV", "development"),
  isDev: () => getEnv("NODE_ENV", "development") === "development",
  isProd: () => getEnv("NODE_ENV") === "production",
};
