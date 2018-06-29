const validation = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = { };

  // this isEmpty is what me create, so check data.name is empty with what we create or not, if not return the data.name, if empty return the string to use for isEmpty from validation
  data.name = !isEmpty(data.name) ? data.name : "";     
  data.email = !isEmpty(data.email) ? data.email : "";     
  data.password = !isEmpty(data.password) ? data.password : "";     
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";     

  if (!validation.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if(validation.isEmpty(data.name)) {       //this is isEmpty from validation not from what me create
    errors.name = "Name field is required";
  }

  if(validation.isEmpty(data.email)) {       //this is isEmpty from validation not from what me create
    errors.email = "Email field is required";
  }

  if(!validation.isEmail(data.email)) {      
    errors.email = "Email is invalid";
  }

  if(validation.isEmpty(data.password)) {       //this is isEmpty from validation not from what me create
    errors.password = "Password field is required";
  }

  if(validation.isLength(data.password, { min: 6, max: 30 })) {      
    errors.password = "Password must be between 6 and 30 characters";
  }

  if(validation.isEmpty(data.password2)) {       //this is isEmpty from validation not from what me create
    errors.password2 = "Confirm password field is required";
  }

  if(!validation.equals(data.password, data.password2)) {       //this is isEmpty from validation not from what me create
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
