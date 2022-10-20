export const isString = (value: unknown) => (Object.prototype.toString.call(value) === '[object String]' ? true : false);
