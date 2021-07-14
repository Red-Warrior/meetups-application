export function persistUserDataToLocalStorage(promiseResult) {
  localStorage.setItem('user', JSON.stringify(promiseResult));
}

export function restoreUserData() {
  return localStorage.getItem('user');
}

export function removeUserData() {
  return localStorage.removeItem('user');
}
