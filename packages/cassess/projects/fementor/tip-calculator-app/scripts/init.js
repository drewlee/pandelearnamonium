import BillInput from './bill-input.js';
import PeopleInput from './people-input.js';
import CustomTipInput from './custom-tip-input.js';
import TipButtons from './tip-buttons.js';
import TotalsModule from './totals-module.js';

document.addEventListener('DOMContentLoaded', () => {
  new BillInput();
  new PeopleInput();
  new CustomTipInput();
  new TipButtons();
  new TotalsModule();
});
