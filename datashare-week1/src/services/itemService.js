import { initialItems } from "../data/items.js";

let itemsStore = [...initialItems];

export const getAllItems = () => [...itemsStore];

export const getItemById = (id) => {
  return itemsStore.find((item) => item.id === id) ?? null;
};

export const findByCategory = (category) => {
  return itemsStore.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchItems = (query, ...additionalFields) => {
  const cleanQuery = query.toLowerCase().trim();
  const fieldsToSearch = ["title", "description", ...additionalFields];

  return itemsStore.filter((item) =>
    fieldsToSearch.some((field) =>
      item[field]?.toLowerCase()?.includes(cleanQuery)
    )
  );
};

export const calculateTotalPrice = () => {
  return itemsStore.reduce((sum, item) => sum + (item.price ?? 0), 0);
};

export const getItemTitles = () => {
  return itemsStore.map(({ title, price }) => `${title} (${price} ₸)`);
};

export const createItem = (data) => {
  const maxId = itemsStore.reduce((max, item) => (item.id > max ? item.id : max), 0);
  
  const newItem = {
    id: maxId + 1,
    ...data,
    createdAt: new Date().toISOString()
  };

  itemsStore = [...itemsStore, newItem];
  return newItem;
};

export const deleteItem = (id) => {
  const itemToDelete = getItemById(id);
  if (!itemToDelete) return false;

  itemsStore = itemsStore.filter((item) => item.id !== id);
  return true;
};

export const loadItemsAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([...itemsStore]);
    }, 1200);
  });
};