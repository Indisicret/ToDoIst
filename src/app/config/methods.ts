import { PRIORITIES } from './constants';

export const getPriority = (code: string): string => {
  const label = PRIORITIES.find((item) => (item.value === code))?.label;
  return label ?? '';
};
