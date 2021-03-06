
export const validate = (element, formdata = []) => {
  let message = '';
  let valid = true;
  let validData = [valid, message];

  if(element.validation.email){
    valid = /\S+@\S+\.\S+/.test(element.value);
    message = `${!valid ? 'Must be a valid email':''}`;
    validData = !valid ? [valid, message] : validData;
  }

  if(element.validation.confirm){
    valid = element.value.trim() === formdata[element.validation.confirm].value.trim();
    message = `${!valid ? 'Passwords do not match':''}`;
    validData = !valid ? [valid, message] : validData;
  }

  if(element.validation.required){
    valid = element.value.trim() !== '';
    message = `${!valid ? 'This field is required':''}`;
    validData = !valid ? [valid, message] : validData;
  }

  return validData;
}

export const update = (element, formdata, formName) => {
  const newFormdata = {
    ...formdata
  };

  const newElement = {
    ...newFormdata[element.id]
  };

  newElement.value = element.event.target.value;

  if(element.blur){
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;
  
  return newFormdata;
}

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for(let key in formdata){
    if(key === 'confirmPassword'){
      continue;
    }

    dataToSubmit[key] = formdata[key].value;
  }

  return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
  let formIsValid = true;

  for(let key in formdata){
    formIsValid = formdata[key].valid && formIsValid;
  }

  return formIsValid;
}

export const populateOptionFields = (formdata, arrayData = [], field) => {
  const newArray = [];
  const newFormdata = {...formdata};

  arrayData.forEach(item => {
    newArray.push({
      key: item._id,
      value: item.name
    });
  });

  newFormdata[field].config.options = newArray;

  return newFormdata;
}

export const populateFields = (formdata, fields) => { 
  for(let key in formdata){
    formdata[key].value = fields[key];
    formdata[key].valid = true;
    formdata[key].touched = true;
    formdata[key].validationMessage = '';
  }


  return formdata;
}

export const resetFields = (formdata, formName) => {
  const newFormdata = {...formdata};

  for(let key in newFormdata){
    if(key === 'images'){
      newFormdata[key].value = [];  
      newFormdata[key].valid = true;
    } else {
      newFormdata[key].value = '';
      newFormdata[key].valid = false;
    }

    newFormdata[key].touched = false;
    newFormdata[key].validationMessage = '';
  }

  return newFormdata;
}