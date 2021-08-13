import { format } from 'date-fns';

import { displayTimeFormat } from './constants';

export const logger = {
  info(DateinISOformat, message, data) {
    console.log(
      `Log ${format(
        Date.now(),
        // eslint-disable-next-line prettier/prettier
        displayTimeFormat,
        // eslint-disable-next-line prettier/prettier
      )}: ${message}`,
    );
    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }
  },
};
