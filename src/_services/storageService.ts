export const storageService = {
  storeData,
  getData,
  removeData,
};

function storeData(key: string, data: any) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

function getData(key: string) {
  return JSON.parse(sessionStorage.getItem(key) || 'null');
}

function removeData(key: string) {
  sessionStorage.removeItem(key);
}
