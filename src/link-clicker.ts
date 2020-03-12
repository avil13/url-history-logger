
export const changeLink = (selector: string, callback?: Function) => {
  const link = document.querySelector(selector) as Element;

  link.addEventListener('click', (event) => {
    const anchor = (event.target as HTMLAnchorElement);
    const href = anchor.href;
    const url = new URL(href);
    url.hash = Date.now().toString(32);
    anchor.href = url.toString();

    if (callback) {
      callback();
    }
  });
};
