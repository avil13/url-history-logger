import { HistoryLogger } from './history-logger';

export const historyLogger = new HistoryLogger();
// Create a namespace and attach function that will store captured exception
// Because functions are also objects, we can attach the queue itself straight to it and save some bytes
export const queue = function (exception) {
  //@ts-ignore
  queue.data.push(exception);
};
//@ts-ignore
queue.data = [];

export const wrapError = (_window, _onerror, callback) => {
  // Store reference to the old `onerror` handler and override it with our own function
  // that will just push exceptions to the queue and call through old handler if we found one
  const _oldOnerror = _window[_onerror];
  //                   [message, source, lineno, colno, exception];
  _window[_onerror] = (...args) => {
    queue({
      e: args,
      urlHist: historyLogger.getHistory(),
    });

    if (_oldOnerror) _oldOnerror.apply(_window, args);
  };
};

export const makeWrapError = (callback?: () => void) => {
  wrapError(window, 'onerror', callback);
};
