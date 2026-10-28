export const formatPrice = (amount, currency = "₸") => {
  const formatted = amount.toLocaleString("ru-RU");
  return `${formatted} ${currency}`;
};

export const getAuthorName = (item) => {
  return item?.author?.name ?? "Анонимный продавец";
};

export const formatItemCard = (item) => {
  const { id, title, price, category } = item;
  const authorName = getAuthorName(item);
  return `[#${id}] ${title} | Категория: ${category} | Продавец: ${authorName} | Цена: ${formatPrice(price)}`;
};

export const printHeader = (title) => {
  console.log(`\n=== ${title.toUpperCase()} ===`);
};