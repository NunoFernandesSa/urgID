const sanitizeText = (value: string, max = 80) =>
  value.trim().replace(/\s+/g, " ").slice(0, max);

const sanitizePhone = (value: string) =>
  value
    .trim()
    .replace(/[^\d+()\-\s]/g, "")
    .slice(0, 20);

export { sanitizePhone, sanitizeText };
