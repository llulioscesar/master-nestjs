export const convertKeysToCamelCase = (data) => {
  return data.map((item) => {
    const newItem = {};
    for (const key in item) {
      const newKey = key.replace(/_([a-z])/g, (m, p1) => p1.toUpperCase());
      newItem[newKey] = item[key];
      if (Array.isArray(newItem[newKey])) {
        newItem[newKey] = convertKeysToCamelCase(newItem[newKey]);
      } else if (typeof newItem[newKey] === 'object') {
        newItem[newKey] = convertKeysToCamelCase([newItem[newKey]])[0];
      }
    }
    return newItem;
  });
};

export const convertKeysToSnakeCase = (data) => {
  return data.map((item) => {
    const newItem = {};
    for (const key in item) {
      const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      if (newKey === 'created_at' || newKey === 'updated_at') {
        newItem[newKey] = new Date(item[key]).toISOString();
      } else {
        newItem[newKey] = item[key];
      }
      if (Array.isArray(newItem[newKey])) {
        newItem[newKey] = convertKeysToSnakeCase(newItem[newKey]);
      } else if (typeof newItem[newKey] === 'object') {
        newItem[newKey] = convertKeysToSnakeCase([newItem[newKey]])[0];
      }
    }
    return newItem;
  });
};
