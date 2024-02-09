export const newPasswordValidate = (inputValues) => {
    let errors = {}
    if (!inputValues.password) {
      errors.password = "Wprowadź hasło!"
    }else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}/.test(inputValues.password)) {
      errors.password = "Nieprawidłowy format - hasło powinno się składać z minimum 6 znaków, minimum jednego znaku specjalnego oraz jednej wielkiej litery.";
    } 
    if (!inputValues.confirmPassword) {
        errors.confirmPassword = "Powtórz hasło!"
    }
    if(inputValues.password !== inputValues.confirmPassword){
        errors.submit = "Hasła nie mogą się od siebie różnić!"
    }
    return errors
  }