export const DEFAULT_LIMIT = 24;
export const QUERY_LIMIT = ["16", "24", "32"] as const;

export function isValidObjectId(str: string) {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(str);
}

export const notNullish = <T>(value: null | undefined | T): value is T => {
  return value !== null && value !== undefined;
};
