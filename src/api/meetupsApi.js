import { httpClient } from '@/api/httpClient';

export const meetupsApi = {
  fetchMeetups() {
    return httpClient.get('/meetups');
  },

  addMeetup() {
    return httpClient.post('/meetups');
  },

  fetchMeetup(meetupId) {
    return httpClient.get(`/meetups/${meetupId}`);
  },

  updateMeetup(meetupId) {
    return httpClient.put(`/meetups/${meetupId}`);
  },

  deleteMeetup(meetupId) {
    return httpClient.delete(`/meetups/${meetupId}`);
  },

  addUserToMembers(meetupId) {
    return httpClient.put(`/meetups/${meetupId}/participation`);
  },

  deleteUserFromMembers(meetupId) {
    return httpClient.delete(`/meetups/${meetupId}/participation`);
  },
};
