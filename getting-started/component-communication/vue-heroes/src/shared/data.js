import { format } from 'date-fns';

import { inputDateFormat } from './constants';

export const ourHeroes = [
  {
    id: 10,
    firstName: 'Sabrina',
    lastName: 'Morts',
    capeCounter: 1,
    originDate: format(new Date(2000, 9, 17), inputDateFormat),
    description: 'Strom Bringer',
  },
  {
    id: 20,
    firstName: 'Rae',
    lastName: 'Erif',
    capeCounter: 3,
    originDate: format(new Date(1998, 7, 23), inputDateFormat),
    description: 'Did someone say fire',
  },
  {
    id: 30,
    firstName: 'Ella',
    lastName: 'Odanrot',
    capeCounter: 2,
    originDate: format(new Date(1997, 3, 5), inputDateFormat),
    description: 'Wielder of tornados ',
  },
  {
    id: 40,
    firstName: 'Jack',
    lastName: 'Deeps',
    capeCounter: 0,
    originDate: format(new Date(1999, 11, 31), inputDateFormat),
    description: 'Speediest of them all',
  },
];
