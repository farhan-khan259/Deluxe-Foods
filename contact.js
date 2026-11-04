const form = document.querySelector('#enquiry-form');
const statusMessage = document.querySelector('#form-status');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const messages = {
  fullName: 'Please enter your full name.',
  email: 'Please enter a valid email address.',
  service: 'Please select a service.',
  project: 'Please tell us a little about your project.'
};

function validateField(field) {
  const wrapper = field.closest('.field');
  const error = wrapper?.querySelector('.field-error');
  let valid = true;

  if (field.required && !field.value.trim()) valid = false;
  if (field.type === 'email' && field.value && !field.validity.valid) valid = false;

  wrapper?.classList.toggle('invalid', !valid);
  if (error) error.textContent = valid ? '' : (messages[field.name] || 'Please complete this field.');
  return valid;
}

form.querySelectorAll('input, select, textarea').forEach((field) => {
  if (field.type === 'checkbox') return;
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.closest('.field')?.classList.contains('invalid')) validateField(field);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  statusMessage.textContent = '';

  const requiredFields = [...form.querySelectorAll('[required]:not([type="checkbox"])')];
  const fieldsValid = requiredFields.map(validateField).every(Boolean);
  const consent = form.querySelector('#consent');
  const consentError = form.querySelector('#consent-error');
  consentError.textContent = consent.checked ? '' : 'Please confirm that we may contact you.';

  if (!fieldsValid || !consent.checked) {
    statusMessage.textContent = 'Please review the highlighted fields.';
    form.querySelector('.invalid input, .invalid select, .invalid textarea, input:invalid')?.focus();
    return;
  }

  const data = new FormData(form);
  const subject = `Website enquiry: ${data.get('service')}`;
  const body = [
    `Name: ${data.get('fullName')}`,
    `Company: ${data.get('company') || 'Not provided'}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Service: ${data.get('service')}`,
    `Product type: ${data.get('productType') || 'Not provided'}`,
    `Timeline: ${data.get('timeline') || 'Not provided'}`,
    '',
    'Project details:',
    data.get('project')
  ].join('\n');

  statusMessage.textContent = 'Your email application is opening with the enquiry details.';
  window.location.href = `mailto:info@deluxfoods.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
