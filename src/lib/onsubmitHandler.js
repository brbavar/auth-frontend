import axios from 'axios';

const jsonifyForm = (form) => {
  const formKeyNodes = form.getElementsByTagName('label');
  const formValNodes = [];
  for (let keyNode of formKeyNodes)
    formValNodes.push(form.querySelector(`#${keyNode.htmlFor}`));

  const jsonifiedForm = {};
  for (var i = 0; i < formKeyNodes.length; i++)
    jsonifiedForm[formKeyNodes[i].textContent] = form.classList.contains(
      'checkboxes'
    )
      ? formValNodes[i].checked
      : formValNodes[i].value;

  return jsonifiedForm;
};

const onsubmitHandler = (
  e,
  userInfo,
  method = '',
  path,
  onfulfilled,
  onrejected
) => {
  e.preventDefault();

  const form = e.target;
  const formData = jsonifyForm(form);
  if (userInfo) {
    const userInfoKeys = Object.keys(userInfo);
    const userInfoVals = Object.values(userInfo);
    for (let i = 0; i < userInfoKeys.length; i++)
      formData[userInfoKeys[i]] = userInfoVals[i];
  }

  const fullUrl = `${import.meta.env.VITE_BASE_URL}${path}`;
  let response;

  switch (method) {
    case 'GET':
      response = axios.get(fullUrl).then(onfulfilled, onrejected);
      break;
    case 'POST':
      response = axios.post(fullUrl, formData).then(onfulfilled, onrejected);
      break;
    case 'PUT':
      response = axios.put(fullUrl, formData).then(onfulfilled, onrejected);
      break;
  }

  return response;
};

export default onsubmitHandler;
