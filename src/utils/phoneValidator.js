export const validatePhone = (phone) => {
  if (phone === undefined || phone === null || phone === "") {
    return ["is empthy"];
  }
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
