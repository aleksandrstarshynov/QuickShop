###1. Добавить товар в корзину
POST /api/cart
- Body (JSON):
```
{
  "userId": 1,
  "productId": "665f73123c0ddfdad4c3cd91",
  "quantity": 2
}
```
- userId — из PostgreSQL
- productId — строка _id из MongoDB
- quantity — положительное целое число


###2. Получить содержимое корзины
- Метод: GET
- URL: http://localhost:3000/api/cart/1
- Где 1 — это ID пользователя из PostgreSQL.
- Результат должен быть массивом объектов с:
- ожидается массив товаров с данными из MongoDB и количеством из PostgreSQL.
- информацией о товаре (из MongoDB),
- количеством (из PostgreSQL).


###3. Обновить количество товара
- Метод: PUT
- URL: http://localhost:3000/api/cart
- Body → JSON:
```
{
  "userId": 1,
  "productId": "665f73123c0ddfdad4c3cd91",
  "quantity": 5
}
```
- Обновляет количество товара, если запись уже есть.
- Если такого товара нет — вернёт 404.


###4. Удалить товар из корзины
- Метод: DELETE
- URL: ```http://localhost:3000/api/cart/1/665f73123c0ddfdad4c3cd91```
- 1 — ID пользователя,
- ```665f73123c0ddfdad4c3cd91 ```— ID товара (MongoDB _id как строка).

###Советы по Postman
- Включи вверху вкладку Headers и проверь, что там есть:
- Content-Type: application/json
- Если используешь PUT/DELETE, не забудь Body (JSON) или параметры в URL.