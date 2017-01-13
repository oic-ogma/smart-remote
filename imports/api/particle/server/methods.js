import { HTTP } from 'meteor/http';

Meteor.methods({
  irTestSend: (deviceId, accessToken) => {
    HTTP.post(
      'https://api.particle.io/v1/devices/' + deviceId + '/irTestSend',
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

  getTemperature: (deviceId, accessToken) => {
    HTTP.get(
      'https://api.particle.io/v1/devices/' + deviceId + '/temperature?access_token=' + accessToken,
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
