import { API_URL } from './MeetupService';

export function uploadImage(file) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: 1 });
    }, 500);
  });
}

export function getImageURL(id) {
  return id !== null ? `${API_URL}/images/${id}` : null;
}
