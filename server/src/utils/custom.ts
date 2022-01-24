export const checkEmptyObject = (obj: Object): boolean => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};

export const checkEmptyObjectValue = (obj: Object): boolean => {
  return Object.values(obj).some((val) => val === null || val === '');
};

export const insertIntoObject = (obj: object, key: string, val: number) => {
  obj[key] = val;
  return obj;
};

export const insertAndDeleteInObject = (
  obj: Object,
  insertKey: string,
  insertVal: number,
  deleteKey: string
) => {
  obj[insertKey] = insertVal;
  delete obj[deleteKey];
  return obj;
};

export const convertRawObject = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj));
};

export const timestampToLocaleTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
