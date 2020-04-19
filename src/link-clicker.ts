export const click = (selector: string, callback?: Function) => {
  const el = document.querySelector(selector) as Element;

  if (el && callback) {
    el.addEventListener('click', (event) => {
      callback(event);
    });
  }
};
