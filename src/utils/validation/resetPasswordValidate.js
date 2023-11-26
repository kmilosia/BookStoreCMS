export const resetPasswordValidate = (data) => {
    let errors = {}
    if (!data.oldPassword) {
      errors.oldPassword = "Wprowadź obecne hasło!"
    }
    if (!data.newPassword) {
      errors.newPassword = "Wprowadź hasło!"
    }else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}/.test(data.newPassword)) {
      errors.newPassword = "Nieprawidłowy format - hasło powinno się składać z minimum 6 znaków, minimum jednego znaku specjalnego oraz jednej wielkiej litery.";
    } 
    if (!data.confirmPassword) {
        errors.confirmPassword = "Powtórz hasło!"
    }
    if(data.newPassword !== data.confirmPassword){
        errors.submit = "Hasła nie mogą się od siebie różnić!"
    }
    return errors
  }