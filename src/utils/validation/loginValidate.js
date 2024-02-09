export const loginValidate = (inputValues) => {
    let errors = {};
    if (!inputValues.email) {
      errors.email = "Wprowadź swoją nazwę użytkownika!"
    }
    else if (!/\S+@\S+\.\S+/.test(inputValues.email)) {
      errors.email = "Nieprawidłowy format email!"
    }
    if (!inputValues.password) {
        errors.password = "Hasło jest obowiązkowe!";
    }
    return errors
  }