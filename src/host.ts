const ua = window.navigator.userAgent;

export function isEdge() {
  return ua.indexOf('Edge') > 0;
}

export function isIE11() {
  return ua.indexOf('Trident') >= 0 && ua.indexOf('rv:11.0') >= 0;
}

export function isIE10() {
  return ua.indexOf('MSIE 10.0') > 0;
}

export function isIE9() {
  return ua.indexOf('MSIE 9.0') > 0;
}

export function isIE() {
  return isIE11() || isIE10() || isIE9();
}

export function isChrome() {
  return ua.indexOf('Chrome') > 0 && ua.indexOf('Edge') < 0;
}

export function isFirefox() {
  return ua.indexOf('Firefox') > 0;
}

export function isSafari() {
  return ua.indexOf('Safari') > 0 && ua.indexOf('Chrome') < 0;
}
