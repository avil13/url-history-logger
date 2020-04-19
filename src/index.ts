import { click, write } from './link-clicker';
import { HistoryLogger } from './history-logger';
import { makeWrapError } from './error-loader';

// Обработка ошибок
makeWrapError((queueErrors) => {
  const text = [
    'Мы получили очередь ошибок',
    'Это уже можно отпрвить на сервер',
    queueErrors,
  ]
    .map((v) => JSON.stringify(v, null, 2))
    .join('\n\n');

  write('#txt', text);
});

write('#txt', `Это демонстрация работы логгера.
Можно изменять URL страницы. Или создать ошибку.
Логгер сохранит это в рамках сессии, а после обработает цепочку ошибок.
`);

export const historyLogger = new HistoryLogger();

historyLogger.subscribe((event) => {
  console.log('=>', event);
});

click('#next-btn', (event) => {
  const anchor = event.target as HTMLAnchorElement;
  const href = anchor.href;
  const url = new URL(location.href);
  url.hash = Date.now().toString(32);
  anchor.href = url.toString();
  //
  console.table(historyLogger.getHistory());
});

click('#error-btn', (event) => {
  throw new Error('Bad time, Bro!');
});
