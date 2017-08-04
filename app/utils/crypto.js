// dec2hex :: Integer -> String
function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2);
}

/* generateString :: Integer -> String
*  simple "secure" string generator
*/
export default function generateString(len) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  // TODO: add fallback for unsuported browsers
  return Array.from(arr, dec2hex).join('');
}

// console.log(generateId(20))
// "c1a050a4cd1556948d41"
