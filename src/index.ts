import { changeLink } from './link-clicker';
import { UrlHistoryLogger } from './url-history-logger';


export const historyLogger = new UrlHistoryLogger();

historyLogger.subscribe((event) => {
  console.log('=>', event);
})

const showHist = () => {
  console.table(historyLogger.getHistory());
};

changeLink('#next-btn', showHist);
