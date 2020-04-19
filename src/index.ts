import { click, write } from './link-clicker';
import { HistoryLogger } from './history-logger';
import { makeWrapError } from './error-loader';

/**
 * Обработка ошибок
 *
 */
makeWrapError((queueErrors: any[]) => {
  const text = [
    '',
    '// Мы получили очередь ошибок',
    '// Это уже можно отпрвить на сервер',
    'var result =',
    JSON.stringify(queueErrors.reverse(), null, 2),
  ].join('\n');

  write('#txt', text, true);
});

write(
  '#txt',
  `Это демонстрация работы логгера.
Можно изменять URL страницы. Или создать ошибку.
Логгер сохранит это в рамках сессии, а после обработает цепочку ошибок.
`
);

/**
 * Здесь демонстрация подписки на логгер
 */
export const historyLogger = new HistoryLogger();

historyLogger.subscribe((event) => {
  console.log('=>', event);
});

/**
 * Изменение URL
 *
 */
click('#next-btn', (event) => {
  const anchor = event.target as HTMLAnchorElement;
  const href = anchor.href;
  const url = new URL(location.href);
  url.hash = Date.now().toString(32);
  anchor.href = url.toString();
  //
  console.table(historyLogger.getHistory());
});


/**
 * Создание ошибки
 *
 */
click('#error-btn', (event) => {
  throw new Error('Bad time, Bro!');
});
