import { httpClient } from '@/api/httpClient';

export const meetupsApi = {
  fetchMeetups() {
    return httpClient.get('/meetups');
  },

  addMeetup(data) {
    return httpClient.post('/meetups', data);
  },

  fetchMeetup(meetupId) {
    return httpClient.get(`/meetups/${meetupId}`);
  },

  updateMeetup(meetupId, meetup) {
    return httpClient.put(`/meetups/${meetupId}`, meetup);
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
