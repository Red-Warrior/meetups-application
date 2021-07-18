export function getImageURL(id) {
  return id !== null ? `${process.env.VUE_APP_API_URL}/images/${id}` : null;
}
