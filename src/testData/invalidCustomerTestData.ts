// invalidCustomerTestCases.ts
import { emptyFirstName, emptyLastName, emptyZipCode } from './invalidCustomerInfo';
import { Customer } from './validCustomerInfo';

export type InvalidCustomerTest = {
  scenario: string;
  data: Customer;
  expectedError: string;
};

export const invalidCustomersData: InvalidCustomerTest[] = [
  {
    scenario: 'Missing First Name',
    data: emptyFirstName,
    expectedError: 'Error: First Name is required',
  },
  {
    scenario: 'Missing Last Name',
    data: emptyLastName,
    expectedError: 'Error: Last Name is required',
  },
  {
    scenario: 'Missing ZIP code',
    data: emptyZipCode,
    expectedError: 'Error: Postal Code is required',
  },
];
