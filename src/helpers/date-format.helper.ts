import { formatDate, formatDistance } from 'date-fns';
import { id } from 'date-fns/locale';

export const dateFormat = (date: Date, format: string) => {
  return formatDate(date, format, { locale: id });
};

export const dateFormatDistance = (date: Date) => {
  return formatDistance(date, new Date(), { locale: id, addSuffix: true });
};
