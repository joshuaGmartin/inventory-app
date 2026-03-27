import "./tableSort.js";
import "./eventListeners.js";

const inputElm = document.querySelector('input:not([type="hidden"])');

if (inputElm) {
  inputElm.focus();
  inputElm.setSelectionRange(0, inputElm.value.length);
}
