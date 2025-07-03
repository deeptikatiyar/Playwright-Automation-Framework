
// Define the user structure
export interface Customer {
  firstName: string;
  lastName: string;
  zip: string;
}

// Successful form completion info objects for DDT
export const validCustomer1: Customer = {
  firstName: 'Deepti',
  lastName: 'Singh',
  zip: '123WXP',
};

export const validCustomer2: Customer = {
  firstName: 'John',
  lastName: 'Doe',
  zip: '99999',
};

export const validCustomer3: Customer = {
  firstName: 'Anna-Marie',
  lastName: 'O’Neil',
  zip: 'SW1A 1AA', // UK postcode
};

