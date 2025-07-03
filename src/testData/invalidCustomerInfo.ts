// Reuse the Customer type from validCustomerInfo
import { Customer } from './validCustomerInfo';

// Negative test data variations
export const emptyFirstName: Customer = {
  firstName: '',
  lastName: 'Singh',
  zip: '123WP',
};

export const emptyLastName: Customer = {
  firstName: 'Deepti',
  lastName: '',
  zip: '123WP',
};

export const emptyZipCode: Customer = {
  firstName: 'Deepti',
  lastName: 'Singh',
  zip: '',
};
