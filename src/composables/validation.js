export default function useFormValidation() {
  const validateOnlyText = (value) => {
    let pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
    return pattern.test(value);
  };

  const validateOnlyInteger = (value) => {
    let pattern = /^[0-9\s]+$/;
    return pattern.test(value);
  };

  const validatePhone = (value) => {
      let pattern1 = /^\+?[1-9]\d{1,14}$/;
      let pattern2 = /^\+\d{1,2}\s?\(\d{3}\)\s?\d{3}-\d{4}$/;    
    return pattern1.test(value) || pattern2.test(value);
  };


  const validateCi = (value) => {
    let pattern = /^\d{11}$/;
    return pattern.test(value);
  };

  const validateEmail = (value) => {
    let pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return pattern.test(value);
  };

  return {
    validateOnlyText,
    validateOnlyInteger,
    validatePhone,
    validateCi,
    validateEmail,
  };
}


/* export const validateOnlyText = (value) =>  {
  let pattern=/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
  if (!pattern.test(value))
      return true;
  return false;
}

export const validateOnlyNumber = (value) =>  {
  let pattern=/^[0-9\s]+$/;
  if (!pattern.test(value))
      return true;
  return false;
}

export const validateEmail = (value) =>  {
  let pattern=/^[0-9\s]+$/;
  if (!pattern.test(value))
      return true;
  return false;
} */