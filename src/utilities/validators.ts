// Validate phone number format
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneNumberRegex.test(phoneNumber);
};
