class Form {
  constructor() {
    this.name = document.getElementById("name");
    this.email = document.getElementById("email");
    this.subject = document.getElementById("subject");
    this.message = document.getElementById("message");
    this.feedbackBox = document.getElementById("feedback");
    this.inputs = document.querySelectorAll(".form-input");
    this.btn = document.getElementById("submit-btn");
    this.btnWrapper = document.getElementById("submit-wrapper");
    this.form = document.getElementById("form");

    this.nameValid = null;
    this.emailValid = null;
    this.subjcetValid = null;
    this.messageValid = null;
    this.formValid = null;
    this.emailPattern = /\S+@\S+\.\S+/;

    this.btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.sendMessage();
    });
    this.btnWrapper.addEventListener("mouseenter", (e) => {
      if (this.btnWrapper.childNodes[1].disabled) {
        this.giveFeedback("Fill the whole form first!", "red");
      }
    });
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        switch (input.name) {
          case "name":
            this.validateName();
            break;
          case "email":
            this.validateEmail();
            break;
          case "subject":
            this.validateSubject();
            break;
          case "message":
            this.validateMessage();
            break;
          default:
            break;
        }
        this.validateForm();
        this.manageClasses();
      });
    });
  }
  validateName = () => {
    if (this.name.value.trim().length > 3) return (this.nameValid = true);
    return (this.nameValid = false);
  };
  validateEmail = () => {
    if (this.emailPattern.test(this.email.value.trim())) {
      this.emailValid = true;
    } else {
      this.emailValid = false;
    }
  };
  validateSubject = () => {
    if (this.subject.value.trim().length > 3) {
      this.subjectValid = true;
    } else {
      this.subjectValid = false;
    }
  };
  validateMessage = () => {
    if (this.message.value.trim().length >= 5) {
      this.messageValid = true;
    } else {
      this.messageValid = false;
    }
  };
  validateForm = () => {
    if (
      this.nameValid &&
      this.emailValid &&
      this.subjectValid &&
      this.messageValid
    ) {
      this.formValid = true;
    } else {
      this.formValid = false;
    }
  };
  validateAll = () => {
    this.validateName();
    this.validateEmail();
    this.validateSubject();
    this.validateMessage();
    this.validateForm();
  };
  manageClasses = () => {
    this.nameValid
      ? this.name.parentNode.classList.add("valid")
      : this.name.parentNode.classList.remove("valid");

    this.emailValid
      ? this.email.parentNode.classList.add("valid")
      : this.email.parentNode.classList.remove("valid");

    this.subjectValid
      ? this.subject.parentNode.classList.add("valid")
      : this.subject.parentNode.classList.remove("valid");

    this.messageValid
      ? this.message.parentNode.classList.add("valid")
      : this.message.parentNode.classList.remove("valid");

    if (this.formValid) {
      this.btn.classList.add("valid");
      this.btn.disabled = false;
    } else {
      this.btn.classList.remove("valid");
      this.btn.disabled = true;
    }
  };
  giveFeedback = (message, color) => {
    // color can be red or green, it is a class name
    this.feedbackBox.textContent = message;
    this.feedbackBox.classList.add(color);
    setTimeout(() => this.feedbackBox.classList.remove(color), 6000); // timeout equal to animation length in contact section
  };
  clearInputs = () => {
    this.inputs.forEach((input) => {
      input.value = "";
    });
  };
  sendMessage = () => {
    if (this.formValid) {
      try {
        this.form.submit();
        this.giveFeedback("message sent", "green");
        this.clearInputs();
        this.validateAll();
        this.manageClasses();
      } catch (err) {
        console.error(err);
        this.giveFeedback("error when sending form", "red");
      }
      // TODO: send this to the backend
    } else {
      this.giveFeedback("form is not validated", "red");
    }
  };
}

export default Form;
