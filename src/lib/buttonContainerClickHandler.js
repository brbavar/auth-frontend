export const buttonContainerClickHandler = (errorMessage, formID) => {
  let submitButton, errorField;
  if ((submitButton = document.getElementsByClassName('submit')[0])) {
    if ((errorField = document.getElementById('error-field'))) {
      errorField.innerHTML = submitButton.disabled
        ? errorMessage
        : errorField.innerHTML;

      const form = document.getElementById(formID);
      form.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }
};
