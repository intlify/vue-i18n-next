import { hasOwn, isArray, isObject } from './utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function deepCopy(src: any, des: any) {
  if (Array.isArray(src) && Array.isArray(des)) {
    for (let i = 0; i < src.length; i++) {
      if (isObject(src[i])) {
        des[i] = deepCopy(src[i], des[i] || (Array.isArray(src[i]) ? [] : {}));
      } else {
        des[i] = src[i];
      }
    }
  } else if (isObject(src) && isObject(des)) {
    for (const key in src) {
      if (hasOwn(src, key)) {
        if (isObject(src[key])) {
          des[key] = deepCopy(src[key], des[key] || {});
        } else {
          des[key] = src[key];
        }
      }
    }
  } else {
    throw new Error("Invalid value");
  }
  return des;
}
