export function toNumber(obj) {
  const rt = {};

  Object.keys(obj)
    .forEach(key => rt[key] = +obj[key]);

  return rt;
}
