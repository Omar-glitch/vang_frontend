import { initFlowbite } from 'flowbite';

export const refreshFlowbite = (time?: number) => {
  if (!time) {
    initFlowbite();
  } else {
    setTimeout(initFlowbite, time);
  }
};
