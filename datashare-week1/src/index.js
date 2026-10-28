import {
  getAllItems,
  getItemById,
  findByCategory,
  searchItems,
  calculateTotalPrice,
  getItemTitles,
  createItem,
  deleteItem,
  loadItemsAsync
} from "./services/itemService.js";

import { formatPrice, formatItemCard, printHeader } from "./utils/helpers.js";

const runCLI = async () => {
  printHeader("DataShare CLI — Запуск системы");

  try {
    console.log("Загрузка данных с сервера...");
    const loadedData = await loadItemsAsync();
    console.log(`Данные успешно загружены! Всего записей: ${loadedData.length}`);
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    return;
  }

  printHeader("1. Все товары");
  const allItems = getAllItems();
  allItems.forEach((item) => console.log(formatItemCard(item)));

  printHeader("2. Поиск по ID (ID: 2)");
  const item2 = getItemById(2);
  if (item2) console.log("Найден товар:", formatItemCard(item2));

  printHeader("3. Фильтрация по категории ('Электроника')");
  const electronics = findByCategory("Электроника");
  electronics.forEach((item) => console.log(` - ${item.title} (${formatPrice(item.price)})`));

  printHeader("4. Поиск по слову ('наушники')");
  const searchResults = searchItems("наушники");
  searchResults.forEach((item) => console.log(` - ${formatItemCard(item)}`));

  printHeader("5. Список названий (map)");
  getItemTitles().slice(0, 4).forEach((title) => console.log(` • ${title}`));

  printHeader("6. Статистика");
  const total = calculateTotalPrice();
  console.log(`Общая стоимость: ${formatPrice(total)}`);

  printHeader("7. Создание нового товара");
  const createdItem = createItem({
    title: "Графический планшет Wacom",
    description: "Планшет для цифрового рисования",
    category: "Периферия",
    price: 48000,
    author: { name: "CreativeTools", rating: 5.0 }
  });
  console.log("Создан:", formatItemCard(createdItem));

  printHeader("8. Удаление товара (ID: 3)");
  deleteItem(3);
  console.log(`Итоговое количество товаров: ${getAllItems().length}`);

  printHeader("Работа CLI завершена");
};

runCLI();