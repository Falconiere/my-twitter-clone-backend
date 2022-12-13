import { validate } from 'class-validator';

// Validate phone number format
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneNumberRegex.test(phoneNumber);
};

export async function validateEntity(entity) {
  const errors = await validate(entity);
  if (errors.length > 0) {
    throw errors.map((e) => ({
      property: e.property,
      value: e?.value,
      messages: Object.keys(e.constraints).map((k) => e.constraints[k]),
    }));
  }
}
