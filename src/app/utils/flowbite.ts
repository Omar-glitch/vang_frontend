import { initFlowbite } from 'flowbite';

export const DEFAULT_FLOWBITE_TIME = 250;

export const refreshFlowbite = (time?: number) => {
  if (!time) {
    initFlowbite();
  } else {
    setTimeout(initFlowbite, time);
  }
};
