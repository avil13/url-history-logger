import { click } from './link-clicker';
import { HistoryLogger } from './history-logger';
import { makeWrapError } from './error-loader';

makeWrapError();

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
