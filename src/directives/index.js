import Vue from 'vue';

export const FocusOnToday = {
  inserted(el, binding) {
    if ((!binding.hasOwnProperty('value')) || binding.value) {
      el.scrollIntoView();
    }
  },
};

Vue.directive('focusOnToday', FocusOnToday);

export default FocusOnToday;
