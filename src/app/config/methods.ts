import { PRIORITIES } from './constants';
import {CATEGORIES} from './constants'
export const getPriority = (code: string): string => {
  const label = PRIORITIES.find((item) => (item.value === code))?.label;
  return label ?? '';
};

export const getCategory =(code: string): string=> {
    const label = CATEGORIES.find((item)=>(item.value === code))?.label
    return label ?? '';
};