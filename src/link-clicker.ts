export const click = (selector: string, callback?: Function) => {
  const el = document.querySelector(selector) as Element;

  if (el && callback) {
    el.addEventListener('click', (event) => {
      callback(event);
    });
  }
};
export const write = (selector: string, text: string) => {
  const el = document.querySelector(selector) as Element;

  if (el) {
    const list = ['', '.', '..', '...', text];
    for (let i = 0; i < list.length; i++) {
      setTimeout(
        (t) => {
          el.innerHTML = t;
        },
        100 * i,
        list[i]
      );
    }
  }
};
