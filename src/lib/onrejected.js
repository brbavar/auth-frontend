export const onrejected = async (response, formID) => {
  const form = document.getElementById(formID);

  let errorField;
  if ((errorField = document.getElementById('error-field'))) {
    errorField.innerHTML = '';
  } else {
    errorField = document.createElement('div');
    errorField.classList.add('field');
    errorField.id = 'error-field';

    form.appendChild(errorField);

    errorField.style.color = 'red';
    errorField.style.fontSize = '10pt';
  }

  const errors = (await response).response.data.errors;
  for (let error of errors) errorField.innerHTML += `${error.msg}<br>`;

  form.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};
