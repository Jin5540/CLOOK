export function moveToMain(url) {
  const currentURL = url ? url : getURL();

  if (currentURL) window.location.replace(currentURL);
}

export function getURL() {
  const currentURL = window.location.href;

  return currentURL;
}
