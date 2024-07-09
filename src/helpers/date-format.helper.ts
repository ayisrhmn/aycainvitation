import { formatDate } from 'date-fns';
import { id } from 'date-fns/locale';

export const dateFormat = (date: Date, format: string) => {
  return formatDate(date, format, { locale: id });
};
