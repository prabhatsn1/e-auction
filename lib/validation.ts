// Form validation utilities

export const validators = {
  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email format";
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain a lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain a number";
    return null;
  },

  required: (value: string, fieldName = "This field"): string | null => {
    if (!value || value.trim() === "") return `${fieldName} is required`;
    return null;
  },

  minLength: (value: string, min: number, fieldName = "This field"): string | null => {
    if (value.length < min) return `${fieldName} must be at least ${min} characters`;
    return null;
  },

  maxLength: (value: string, max: number, fieldName = "This field"): string | null => {
    if (value.length > max) return `${fieldName} must be at most ${max} characters`;
    return null;
  },

  number: (value: string | number): string | null => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "Must be a valid number";
    return null;
  },

  positiveNumber: (value: string | number): string | null => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "Must be a valid number";
    if (num <= 0) return "Must be a positive number";
    return null;
  },

  phone: (value: string): string | null => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!value) return "Phone number is required";
    if (!phoneRegex.test(value)) return "Invalid phone number format";
    if (value.replace(/\D/g, "").length < 10) return "Phone number must be at least 10 digits";
    return null;
  },

  url: (value: string): string | null => {
    try {
      new URL(value);
      return null;
    } catch {
      return "Invalid URL format";
    }
  },
};

// Sanitization utilities
export const sanitize = {
  html: (value: string): string => {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  },

  trim: (value: string): string => value.trim(),

  removeExtraSpaces: (value: string): string => value.replace(/\s+/g, " ").trim(),
};

// Form validation helper
export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, ((value: any) => string | null)[]>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const fieldRules = rules[field];

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return errors;
};
