export function persistUserDataToLocalStorage(promiseResult) {
  localStorage.setItem('userMeetupsApp', JSON.stringify(promiseResult));
}

export function restoreUserData() {
  return localStorage.getItem('userMeetupsApp');
}

export function removeUserData() {
  return localStorage.removeItem('userMeetupsApp');
}
