import { httpClient } from '@/api/httpClient';

export function uploadImage(file) {
  return httpClient.post('/images/upload', file);
}
