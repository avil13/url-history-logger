import Prism from 'prismjs';

export const click = (selector: string, callback?: Function) => {
  const el = document.querySelector(selector) as Element;

  if (el && callback) {
    el.addEventListener('click', (event) => {
      callback(event);
    });
  }
};
export const write = (
  selector: string,
  text: string,
  isCode: boolean = false
) => {
  const el = document.querySelector(selector) as Element;

  if (isCode) {
    text = Prism.highlight(text, Prism.languages.javascript, 'javascript');
  }

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
