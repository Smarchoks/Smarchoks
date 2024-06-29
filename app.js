document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm(this)) alert("Форма отправлена успешно!");
  });

function validateForm(form) {
  const patterns = {
    name: /^[а-яА-ЯёЁa-zA-Z]+$/,
    phone: /^\+7\d{10}$/,
   
    
  };

  let isValid = true;

  form.querySelectorAll("input").forEach((input) => {
    clearError(input);

    if (input.type !== "checkbox" && !input.value.trim()) {
      showError(input, "Поле не может быть пустым");
      isValid = false;
    } else if (input.type === "checkbox" && !input.checked) {
      showError(input, "Необходимо принять пользовательское соглашение");
      isValid = false;
    } else if (
      input.dataset.maxLength &&
      input.value.length > input.dataset.maxLength
    ) {
      showError(
        input,
        `Максимальное количество символов ${input.dataset.maxLength} знаков`
      );
      isValid = false;
    } else if (
      input.name === "phoneNumber" &&
      !patterns.phone.test(input.value)
    ) {
      showError(
        input,
        "Введите корректный номер телефона в формате +7XXXXXXXXXX"
      );
      isValid = false;
    } else if (input.type === "email" && !patterns.email.test(input.value)) {
      showError(input, "Введите корректный email");
      isValid = false;
    } else if (
      input.type === "password" &&
      !patterns.password.test(input.value)
    ) {
      showError(
        input,
        "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы"
      );
      isValid = false;
    } else if (input.type === "date" && new Date(input.value) > new Date()) {
      showError(input, "Дата не может быть в будущем");
      isValid = false;
    } else if (
      ["firstName", "lastName", "middleName"].includes(input.name) &&
      !patterns.name.test(input.value)
    ) {
      showError(input, "Поле должно содержать только буквы");
      isValid = false;
    }
  });

  return isValid;
}

function clearError(input) {
  const error = input.parentNode.querySelector(".error");
  if (error) error.remove();
}

function showError(input, message) {
  const error = document.createElement("div");
  error.classList.add("error");
  error.innerHTML = message;
  input.parentNode.insertBefore(error, input.nextSibling);
}
