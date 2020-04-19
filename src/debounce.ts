export function debounce(callback, wait, immediate = false) {
  let timeout: number = 0;

  return function (...args) {
    const callNow = immediate && !timeout;
    const next = () => callback(...args);

    clearTimeout(timeout);
    timeout = setTimeout(next, wait);

    if (callNow) {
      next();
    }
  };
}

//   /**
//    * Normal event
//    * event      | |      |
//    * time     ----------------
//    * callback   | |      |
//    *
//    * Call log only when it's been 100ms since the last sroll
//    * scroll     | |      |
//    * time     ----------------
//    * callback         |      |
//    *              |100|  |100|
//    */

//   const handleScroll = debounce((arg, event) => {
//     console.log(`${arg} ${event.type}`)
//   }, 100, true)

//   window.addEventListener('scroll', (event) => {
//     handleScroll('Event is:', event)
//   })
