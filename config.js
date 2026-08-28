/* ============================================================
   Настройка мини-аппа «Замечания ДСК»

   Для работы без n8n достаточно заполнить GAS_URL и TG_BOT_USERNAME.
   Секретов здесь нет:
   токен бота хранится только в Apps Script.
   ============================================================ */

/* Ссылка на веб-приложение Apps Script. Заканчивается на /exec */
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzfUEj4cJUn5Ff4xvUm7mW34-69xjI9Tpt4wGteFDiv8bbM0ORTYdXt8HdOZjvSS9pEcg/exec';

/* Имя бота без «собаки» — им подписана кнопка «Войти через Telegram».
   Смотрится у @BotFather: /mybots → ваш бот → username */
const TG_BOT_USERNAME = '@DSKnotes_bot';

/* Необязательный промежуточный обработчик n8n.
   По умолчанию отключён: все запросы идут напрямую в Apps Script. */
const USE_N8N = false;
const N8N_URL = '';
const N8N_TIMEOUT = 5000;
