export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function validateContact(fields: ContactFields) {
  const errors: Partial<Record<keyof ContactFields, string>> = {};
  if (fields.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Please enter a valid email.";
  }
  if (fields.subject.trim().length < 3) errors.subject = "Please add a short subject.";
  if (fields.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}
