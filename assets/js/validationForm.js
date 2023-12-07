function ValidateForm(options) {
  let validatedSeclectors = [];

  const getParent = (currentElement, parentSelector) => {
    while (currentElement.parentElement) {
      if (currentElement.parentElement.matches(parentSelector))
        return currentElement.parentElement;
      currentElement = currentElement.parentElement;
    }
  };

  const showErrorMessage = (element, message) => {
    const formGroup = getParent(element, options.formGroupSelector);
    if (formGroup) {
      if (formGroup.classList.contains("valid")) {
        formGroup.classList.remove("valid");
      }
      formGroup.classList.add("invalid");
      formGroup.querySelector(options.errorMessageSelector).innerHTML = message;
    }
  };

  const showSuccesMessage = (element) => {
    const formGroup = getParent(element, options.formGroupSelector);
    if (formGroup) {
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
      }
      formGroup.classList.add("valid");
      formGroup.querySelector(options.errorMessageSelector).innerHTML = "";
    }
  };

  const validate = (inputElement, rule) => {
    let errorMessage = rule.test(inputElement.value);
    if (errorMessage) showErrorMessage(inputElement, errorMessage);
    else showSuccesMessage(inputElement);
    return !errorMessage;
  };

  const formElement = document.querySelector(options.formSelector);
  if (formElement) {
    // Validate and listen to SUBMIT event
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      let isFormValid = true;
      options.rules.forEach((rule) => {
        const inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule);
        if (!isValid) isFormValid = false;
      });

      if (isFormValid) {
        if (typeof options.submitForm === "function") {
          let formValue = validatedSeclectors.reduce(
            (values, currentSelector) => {
              let inputElement = formElement.querySelector(currentSelector);
              values[inputElement.name] = inputElement.value;
              return values;
            },
            {}
          );
          options.submitForm(formValue);
        }
      }
    });

    // Validate and listen to events: blur, input, ...
    options.rules.forEach((rule) => {
      const inputElement = formElement.querySelector(rule.selector);
      validatedSeclectors.push(rule.selector);

      if (inputElement) {
        inputElement.addEventListener("blur", () => {
          validate(inputElement, rule);
        });

        inputElement.oninput = () => {
          getParent(inputElement, options.formGroupSelector).classList.remove(
            "invalid"
          );
          getParent(inputElement, options.formGroupSelector).querySelector(
            options.errorMessageSelector
          ).innerHTML = "";
        };

        // if (inputElement.required)
        inputElement.oninvalid = (evt) => {
          evt.preventDefault();
          validate(inputElement, rule);
        };
      }
    });

    // Show password field
    const checkBoxElement = formElement.querySelector(
      options.showPassword.selector
    );
    if (checkBoxElement) {
      const passwordField = formElement.querySelectorAll(
        "input[type=password]"
      );
      checkBoxElement.onchange = function () {
        options.showPassword.show(checkBoxElement, passwordField);
      };
    }
  }
}

const isName = (selector, message) => {
  return {
    selector,
    test: (value) => {
      return value.trim() ? undefined : message.required;
    },
  };
};

const isEmail = (selector, message) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return {
    selector,
    test: (value) => {
      return !value.trim()
        ? message.required
        : !emailRegex.test(value.trim())
        ? message.invalid
        : undefined;
    },
  };
};

const isPassword = (selector, min, message) => {
  return {
    selector,
    test: (value) => {
      return !value
        ? message.required
        : value.length < min
        ? message.invalid
        : undefined;
    },
  };
};

const confirmPassword = (selector, getPassword, message) => {
  return {
    selector,
    test: (value) => {
      return !value
        ? message.required
        : value !== getPassword()
        ? message.invalid
        : undefined;
    },
  };
};

const showPassword = (selector) => {
  return {
    selector,
    show: (checkBoxElement, passwordInputElements) => {
      passwordInputElements.forEach(
        (input) => (input.type = checkBoxElement.checked ? "text" : "password")
      );
    },
  };
};
