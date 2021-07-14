import { API_URL } from './MeetupService';

export function getImageURL(id) {
  return id !== null ? `${API_URL}/images/${id}` : null;
}
