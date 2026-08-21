export const validatePhone = (phone) => {
  const cleanValue = phone.replace(/[^\d]/g, "");
  phone.replace(" ", "");

  if (cleanValue.length !== 10) {
    return ["must be exactly 10 digits"];
  }

  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(cleanValue)) {
    return ["must start with 6, 7, 8, or 9."];
  }

  return [];
};
