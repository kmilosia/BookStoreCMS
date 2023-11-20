export const loginValidate = (inputValues) => {
    let errors = {};
    if (!inputValues.username) {
      errors.username = "Wprowadź swoją nazwę użytkownika!"
    }
    if (!inputValues.password) {
        errors.password = "Hasło jest obowiązkowe!";
    }
    return errors
  }