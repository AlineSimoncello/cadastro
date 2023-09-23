let form = document.querySelector("#register-form");
let submit = document.querySelector("#submit-btn");
let showPassword = document.querySelector('#passwordRegister');
let showConfirmPassword = document.querySelector('#passwordConfirm');

showPassword.addEventListener('click', () => {
    let inputPassRegister = document.querySelector('#pass-register');

    if (inputPassRegister.getAttribute('type') == 'password') {
        inputPassRegister.setAttribute('type', 'text');
    } else {
        inputPassRegister.setAttribute('type', 'password');
    }
});
showConfirmPassword.addEventListener('click', () => {
    let inputConfirmPass = document.querySelector('#pass-register-confirm');

    if (inputConfirmPass.getAttribute('type') == 'password') {
        inputConfirmPass.setAttribute('type', 'text');
    } else {
        inputConfirmPass.setAttribute('type', 'password');
    }
});
class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-only-letters',
            'data-max-length',
            'data-email-validate',
            'data-equal',
            'data-password-validate',
        ]
    }
    validate(form) {
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        let inputs = form.getElementsByTagName('input');
        let inputsArray = [...inputs];
        
        inputsArray.forEach(function(input) {
            for(let i = 0; this.validations.length > i; i++) {

                if(input.getAttribute(this.validations[i]) != null) {

                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[i]);

                     this[method](input, value);                
                }
            }
        }, this);
        };
    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = `Precisa ter menos de ${maxValue} caracteres`;

        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }
    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = "Insira um e-mail padrão exemplo@dominio.com";

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorMessage = "Insira somente letras"

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }
    required(input) {
        let inputValue = input.value;

        if(inputValue === '') {
            let errorMessage = "Campo obrigatório";

            this.printMessage(input, errorMessage);
        }
    }
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = "Precisa ser igual a senha";

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }
    passwordvalidate(input) {
        let charArray = input.value.split("");
        let uppercase = 0;
        let num = 0;

        for(let i = 0; charArray.length > i; i++) {
            if(charArray[i] === charArray[i].toUpperCase() && isNaN(parseInt(charArray[i]))) {
                uppercase++;
            } else if(!isNaN(parseInt(charArray[i]))) {
                num++;
            }
        }
        if(uppercase === 0 || num === 0) {
            let errorMessage = "Precisa conter ao menos um caractere maiúsculo e um número";
            this.printMessage(input, errorMessage);
        }
    }
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
    printMessage(input, msg) {
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null) {

            let template  = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;
            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }
}
let validator = new Validator();

submit.addEventListener('click', (e) => {
   
    e.preventDefault();
    validator.validate(form);
});
