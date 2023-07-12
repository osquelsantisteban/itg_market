export default function useFormValidation() {
  const validateOnlyText = (value) => {
    let pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
    return pattern.test(value);
  };

  const validateEmail = (value) => {
    let pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return pattern.test(value);
  };

  return {
    validateOnlyText,
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