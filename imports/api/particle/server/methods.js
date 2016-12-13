import { HTTP } from 'meteor/http';
Meteor.methods({
  irReceive: (deviceId, accessToken) => {
    HTTP.post(
      'https://api.particle.io/v1/devices/' + deviceId + '/irReceive',
      {
        params: { access_token: accessToken },
      },
      (error, result) => {
        if (error) {
          throw new Meteor.Error(error);
        } else {
          return result;
        }
      }
     );
  },
});
