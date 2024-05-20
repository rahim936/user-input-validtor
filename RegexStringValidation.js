//* Username Validator.
const ValidateUsername = (username) => {
  const errors = [];

  const username_validator = new RegExp(/^(?=.{4,12}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/);

  if (!username) {
    errors.push({ field_name: 'username', error_name: 'required', error_message: 'Username is Required.' });
  } else if (username.length < 4) {
    errors.push({ field_name: 'username', error_name: 'minLength', error_message: 'Username is must be 4 characters long.' });
  } else if (username.length > 12) {
    errors.push({ field_name: 'username', error_name: 'maxLength', error_message: 'Username is too long.' });
  } else if (!username_validator.test(username)) {
    errors.push({ field_name: 'username', error_name: 'match', error_message: 'Username can not start or end with . or _ and must be 4 characters long.' });
  } else {
    errors.push({ success: true, message: 'Username is valid' });
  }

  return errors;
};

//* Email Validator.
const validateEmail = (email) => {
  const errors = [];

  const knownDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const email_validator = new RegExp(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);

  if (!email) {
    errors.push({ field_name: 'email', error_name: 'required', error_message: 'Email is required.' });
  } else if (!email_validator.test(email)) {
    errors.push({ field_name: 'email', error_name: 'match', error_message: 'Please provide a valid email address.' });
  } else {
    const domain = email.split('@')[1];
    if (!knownDomains.includes(domain)) {
      errors.push({
        field_name: 'email',
        error_name: 'domain',
        error_message: `Email domain is not recognized. Did you mean one of these: ${knownDomains.join(', ')}?`,
      });
    } else {
      errors.push({ success: true, message: 'Email is valid' });
    }
  }

  return errors;
};

//* Password Validator.
const validatePassword = (password, confirm_password) => {
  const errors = [];

  const password_validator = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[~`'"\[{\]}!@#$%^&*(=+-_)\\<,.?>\/])[a-zA-Z\d~`'"\[{\]}!@#$%^&*(=+-_)\\<,.?>\/]{8,}$/);

  if (!password) {
    errors.push({ field_name: 'password', error_name: 'required', error_message: 'Password is required.' });
  } else if (password.length < 8) {
    errors.push({ field_name: 'password', error_name: 'minLength', error_message: 'Passoword must be 8 characters long.' });
  } else if (!password_validator.test(password)) {
    errors.push({
      field_name: 'password',
      error_name: 'match',
      error_message: 'Password must contain one uppercase letter, one lowercase letter, one digit, one special characters and must be 8 chartactes long.',
    });
  }

  if (!confirm_password) {
    errors.push({ field: 'confirm_password', error_name: 'required', error_message: 'Confirm Password is required.' });
  } else if (confirm_password !== password) {
    errors.push({ field_name: 'confirm_password', error_name: 'misMatch', error_message: "Password does't match." });
  }

  if (errors.length === 0) errors.push({ success: true, message: 'Password is valid' });

  return errors;
};

//* Tests
console.log('\nUsername Validation:\n', ValidateUsername('hello_world'));
console.log('\nUsername Validation:\n', ValidateUsername('_hello_world'));
console.log('\nUsername Validation:\n', ValidateUsername('hello_world_'));

console.log('\nEmail Validation:\n', validateEmail('dummy@gmail.com'));
console.log('\nEmail Validation:\n', validateEmail('dummy@gmail.co'));
console.log('\nEmail Validation:\n', validateEmail('dummy@gamil.co'));
console.log('\nEmail Validation:\n', validateEmail('@gmail.com'));

console.log('\nPassowrd Validation:\n', validatePassword('p@ssW0rd', ''));
console.log('\nPassowrd Validation:\n', validatePassword('', 'p@ssW0rd'));
console.log('\nPassowrd Validation:\n', validatePassword('p@ssW0rd', 'p@ssW0d'));
console.log('\nPassowrd Validation:\n', validatePassword('pssW0rd', 'p@ssW0rd'));
