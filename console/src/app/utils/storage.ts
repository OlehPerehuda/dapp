export enum StorageKeys {
    TOKEN = 'TOKEN',
};

export const setSessionStorageItem = (item: string, value: string) =>
    window?.sessionStorage.setItem(item, value);

export const getSessionStorageItem = (item: string) =>
    window?.sessionStorage.getItem(item);

export const removeSessionStorageItem = (item: string) =>
    window?.sessionStorage.removeItem(item);
