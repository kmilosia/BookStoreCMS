export const dictionaryValidate = (nameValue) => {
    let errors = {}
    if (!nameValue) {
        errors.nameValue = "Wprowadź nazwę!"
    } 
    return errors
}
export const personValidate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = "Wprowadź imię!"
    } 
    if (!values.surname) {
        errors.surname = "Wprowadź nazwisko!"
    } 
    return errors
}
export const publisherValidate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = "Wprowadź nazwę!"
    } 
    return errors
}
export const navbarValidate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = "Wprowadź imię!"
    } 
    if (!values.path) {
        errors.path = "Wprowadź ścieżkę!"
    } 
    if (!values.position) {
        errors.position = "Wprowadź pozycję linku!"
    } 
    return errors
}
export const categoryElementValidate = (values) => {
    let errors = {}
    if (!values.path) {
        errors.path = "Wprowadź ścieżkę!"
    } 
    if (!values.imageTitle) {
        errors.imageTitle = "Wprowadź tytuł!"
    } 
    if (!values.imageURL) {
        errors.imageURL = "Wprowadź URL zdjęcia!"
    } 
    if (!values.position) {
        errors.position = "Wprowadź pozycję!"
    }
    if (!values.content) {
        errors.content = "Wprowadź treść!"
    }
    if (!values.logo) {
        errors.logo = "Wprowadź logo kategorii!"
    }
    if (values.selectedCategory === null) {
        errors.selectedCategory = "Wybierz kategorię!"
    }
    return errors
}
export const bannerValidate = (values) => {
    let errors = {}
    if (!values.path) {
        errors.path = "Wprowadź ścieżkę!"
    } 
    if (!values.title) {
        errors.title = "Wprowadź tytuł!"
    } 
    if (!values.imageTitle) {
        errors.imageTitle = "Wprowadź tytuł zdjęcia!"
    } 
    if (!values.imageURL) {
        errors.imageURL = "Wprowadź adres zdjęcia!"
    }
    return errors
}
export const imageValidate = (values) => {
    let errors = {}
    if (!values.position) {
        errors.position = "Wprowadź pozycję!"
    } 
    if (!values.title) {
        errors.title = "Wprowadź tytuł!"
    } 
    if (!values.imageURL) {
        errors.imageURL = "Wprowadź adres zdjęcia!"
    }
    return errors
}
export const discountsBannerValidate = (values) => {
    let errors = {}
    if (!values.header) {
        errors.header = "Wprowadź tytuł!"
    } 
    if (!values.buttonTitle) {
        errors.buttonTitle = "Wprowadź tytuł buttona!"
    } 
    if (!values.imageTitle) {
        errors.imageTitle = "Wprowadź tytuł zdjęcia!"
    } 
    if (!values.imageURL) {
        errors.imageURL = "Wprowadź adres zdjęcia!"
    }
    return errors
}
export const namePriceValidate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = "Wprowadź nazwę!"
    } 
    if (!values.price) {
        errors.price = "Wprowadź cenę!"
    }else if (isNaN(values.price)) {
        errors.price = "Cena musi być liczbą!"
    }
    return errors
}
export const rentalTypeValidate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = "Wprowadź nazwę!"
    } 
    if (!values.days) {
        errors.days = "Wprowadź dni wypożyczenia!"
    } 
    if (!values.price) {
        errors.price = "Wprowadź cenę!"
    }
    return errors
}
export const bookValidate = (values) => {
    let errors = {}
    if (!values.title) {
        errors.title = "Wprowadź tytuł!"
    } 
    if (!values.description) {
        errors.description = "Wprowadź opis!"
    } 
    if (values.selectedLanguage === null) {
        errors.selectedLanguage = "Wybierz język!"
    } 
    if (values.selectedPublisher === null) {
        errors.selectedPublisher = "Wybierz wydawnictwo!"
    } 
    if (values.selectedCategories.length === 0) {
        errors.selectedCategories = "Wybierz przynajmniej jedną kategorię!"
    } 
    if (values.selectedAuthors.length === 0) {
        errors.selectedAuthors = "Wybierz przynajmniej jednego autora!"
    } 
    return errors
}
export const bookItemValidate = (values) => {
    let errors = {}
    if (!values.vat) {
        errors.vat = "Wprowadź VAT!"
    } 
    if (!values.netto) {
        errors.netto = "Wprowadź NETTO!"
    } 
    if (!values.ISBN) {
        errors.ISBN = "Wprowadź ISBN!"
    } 
    if (!values.pages) {
        errors.pages = "Wprowadź ilość stron!"
    } 
    if (values.language === null) {
        errors.language = "Wybierz język!"
    } 
    if (values.edition === null && values.fileFormat === null) {
        errors.edition = "Wybierz edycję okładki lub format pliku!"
        errors.fileFormat = "Wybierz edycję okładki lub format pliku!"
    } 
    if (values.form === null) {
        errors.form = "Wybierz formę!"
    } 
    if (values.availability === null) {
        errors.availability = "Wybierz dostępność!"
    } 
    if (values.book === null) {
        errors.book = "Wybierz książkę bazową!"
    } 
    return errors
}
export const supplierValidate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = "Wprowadź nazwę!"
    } 
    if (!values.email) {
        errors.email = "Wprowadź email!"
    } 
    if (!values.phoneNumber) {
        errors.phoneNumber = "Wprowadź numer telefonu!"
    } 
    if (!values.street) {
        errors.street = "Wprowadź ulicę!"
    } 
    if (!values.streetNumber) {
        errors.streetNumber = "Wprowadź numer ulicy!"
    } 
    if (!values.houseNumber) {
        errors.houseNumber = "Wprowadź numer domu!"
    } 
    if (!values.postcode) {
        errors.postcode = "Wprowadź kod pocztowy!"
    } 
    if (!values.cityID) {
        errors.cityID = "Wybierz miasto!"
    } 
    if (!values.countryID) {
        errors.countryID = "Wybierz kraj!"
    } 
    if (!values.addressTypeID) {
        errors.addressTypeID = "Wybierz typ adresu!"
    } 
    return errors
}
export const supplyValidate = (values) => {
    let errors = {}
    if (!values.paymentMethodID) {
        errors.paymentMethodID = "Wybierz metodę płatności!"
    } 
    if (!values.deliveryStatusID) {
        errors.deliveryStatusID = "Wybierz status dostawy!"
    } 
    if (!values.deliveryDate) {
        errors.deliveryDate = "Wybierz datę dostawy!"
    } 
    if (!values.supplierID) {
        errors.supplierID = "Wybierz dostawcę!"
    } 
    if (values.bookItems.length === 0) {
        errors.bookItems = "Wybierz produkt!"
    } 
    return errors
}
export const supplyEditValidate = (values) => {
    let errors = {}
    if (!values.deliveryStatusID) {
        errors.deliveryStatusID = "Wybierz status dostawy!"
    } 
    if (!values.deliveryDate) {
        errors.deliveryDate = "Wybierz datę dostawy!"
    } 
    if (!values.supplierID) {
        errors.supplierID = "Wybierz dostawcę!"
    } 
    if (values.bookItems.length === 0) {
        errors.bookItems = "Wybierz produkt!"
    } 
    return errors
}
export const discountValidate = (values) => {
    let errors = {}
    if (!values.title) {
        errors.title = "Wprowadź tytuł promocji!"
    } 
    if (!values.description) {
        errors.description = "Wprowadź opis!"
    } 
    if (!values.percent) {
        errors.percent = "Wprowadź wartość promocji!"
    }else if (isNaN(values.percent)) {
        errors.percent = "Wartość musi być liczbą!"
    } 
    if (values.selectedBooks.length === 0) {
        errors.selectedBooks = "Wybierz książki objęte promocją!"
    } 
    return errors
}
export const discountCodeValidate = (values) => {
    let errors = {}
    if (!values.code) {
        errors.code = "Wprowadź kod rabatu!"
    } 
    if (!values.description) {
        errors.description = "Wprowadź opis!"
    } 
    if (!values.percent) {
        errors.percent = "Wprowadź wartość promocji!"
    }
    if (!values.expiryDate) {
        errors.expiryDate = "Wprowadź datę zakończenia!"
    }
    if (!values.startingDate) {
        errors.startingDate = "Wprowadź datę rozpoczęcia!"
    }
    return errors
}
export const footerLinkValidate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = "Wprowadź nazwę!"
    } 
    if (!values.position) {
        errors.position = "Wprowadź pozycję wyświetlania!"
    } 
    if (!values.column) {
        errors.column = "Wybierz kolumnę!"
    } 
    return errors
}
export const newsletterValidate = (values) => {
    let errors = {}
    if (!values.title) {
        errors.title = "Wprowadź tytuł!"
    } 
    if (!values.publicationDate) {
        errors.publicationDate = "Wprowadź datę publikacji!"
    } 
    if (!values.content) {
        errors.content = "Wpisz treść newslettera!"
    } 
    return errors
}
export const footerColumnValidate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = "Wprowadź nazwę!"
    } 
    if (!values.position) {
        errors.position = "Wprowadź pozycję wyświetlania!"
    } 
    if (!values.htmlObject) {
        errors.htmlObject = "Wprowadź HTML tag obiektu kolumny!"
    } 
    if (!values.direction) {
        errors.direction = "Podaj kierunek wyświetlania obiektów!"
    } 
    return errors
}
export const newsValidate = (values) => {
    let errors = {}
    if (!values.topic) {
        errors.topic = "Wpisz temat wiadomości!"
    } 
    if (!values.content) {
        errors.content = "Wprowadź treść wiadomości!"
    } 
    if (!values.imageTitle) {
        errors.imageTitle = "Wprowadź tytuł zdjęcia!"
    } 
    if (!values.imageURL) {
        errors.imageURL = "Wprowadź adres zdjęcia!"
    }
    if (!values.authorName) {
        errors.authorName = "Wprowadź autora wiadomości!"
    }
    return errors
}