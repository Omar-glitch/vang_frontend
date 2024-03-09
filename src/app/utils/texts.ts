export const objectIdToInputDate = (objectId: string) => {
  const timestamp = parseInt(objectId.substring(0, 8), 16);
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString().substring(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const timezoneToInputDate = (timezone: string) => {
  if (!timezone) return '';
  const date = new Date(timezone);
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const timestampToDateFormat = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString().substring(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};

export const replaceSpaceWithDash = (pathname: string) => {
  return String(pathname).replace(/\W+/g, '-').toLowerCase();
};

export const replaceDashWithSpace = (pathname: string) => {
  return String(pathname).replace(/-+/g, ' ').toLowerCase();
};

export const sanitizeStringWithDash = (inputString: string) => {
  let sanitizedString = inputString.replace(
    /[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚÜü]+/g,
    '-'
  );
  sanitizedString = sanitizedString.replace(/^-+|-+$/g, '');
  sanitizedString = sanitizedString.replace(/-+/g, '-');
  return sanitizedString;
};

export const sanitizeStringWithSpace = (inputString: string) => {
  let sanitizedString = inputString.replace(
    /[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚÜü]+/g,
    ' '
  );
  sanitizedString = sanitizedString.trim();
  sanitizedString = sanitizedString.replace(/ {2,}/g, ' ');
  sanitizedString = sanitizedString.toLowerCase();
  return sanitizedString;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const getQueries = (filter?: Record<string, string>) => {
  let q = '';
  if (filter) {
    Object.keys(filter).map((k) => {
      q += q.length === 0 ? `?${k}=${filter[k]}` : `&${k}=${filter[k]}`;
    });
  }
  return q;
};
