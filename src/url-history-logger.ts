import uuid from '@lukeed/uuid';

export interface IUrlEventDTO {
  url: string;
  type: string;
  historyLength: number;
  date: string;
  userAgent: string;
  sessionUuid: string;
}

const KEYS = {
  SESSION_UUID: '_SESSION_UUID_',
  HISTORY_SESSION: '_HISTORY_SESSION_',
};

export class UrlHistoryLogger {
  private listeners: any[] = [];

  private historySession: IUrlEventDTO[] = [];

  private cachedUuid: string = '';

  constructor() {
    this.loadEventHistory();
    this.runWatcher();
  }

  subscribe(func: (e: IUrlEventDTO) => void) {
    if (this.listeners.includes(func)) {
      return;
    }
    this.listeners.push(func);
  }

  runWatcher() {
    const eventNames = [
      'onpushstate',
      'replacestate',
      'popstate',
      'locationchange',
    ];

    eventNames.forEach(eventName => {
      window.addEventListener(eventName, event => {
        const eventDto = this.getEventDto(event);

        this.addEventHistory(eventDto);

        this.listeners.forEach(func => {
          func(eventDto);
        });
      });
    });
  }

  getHistory() {
    return this.historySession.map(item => ({ ...item }));
  }

  loadEventHistory() {
    const data = sessionStorage.getItem(KEYS.HISTORY_SESSION);
    if (data) {
      try {
        this.historySession = JSON.parse(data);
      } catch (e) {}
    }
  }

  addEventHistory(ev: IUrlEventDTO) {
    this.historySession.push(ev);
    sessionStorage.setItem(
      KEYS.HISTORY_SESSION,
      JSON.stringify(this.historySession)
    );
  }

  getEventDto(event): IUrlEventDTO {
    return {
      url: location.href,
      type: event.type,
      historyLength: history.length,
      date: Date().toString(),
      userAgent: navigator.userAgent,
      sessionUuid: this.uuid,
    };
  }

  get uuid(): string {
    if (!this.cachedUuid) {
      const tmpUuid = sessionStorage.getItem(KEYS.SESSION_UUID);

      if (tmpUuid) {
        this.cachedUuid = tmpUuid;
      } else {
        this.cachedUuid = uuid();
        sessionStorage.setItem(KEYS.SESSION_UUID, this.cachedUuid);
      }
    }

    return this.cachedUuid;
  }
}
