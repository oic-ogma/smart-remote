import { HTTP } from 'meteor/http';
import { ButtonLibrary } from '../../../api/button_library/button_library.js';

const getPhotonCredentials = () => {
  const userObject = Meteor.users.find({
    _id: Meteor.userId(),
  },
    {
      fields: {
        _id: 0,
        'photonCredentials': 1,
      },
    }).fetch();
  return userObject[0].photonCredentials;
};

Meteor.methods({
  irReceive: () => {
    const photonCredentials = getPhotonCredentials();
    HTTP.post(
      'https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irReceive',
      {
        params: { access_token: photonCredentials.accessToken },
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
  irTestSend: () => {
    const photonCredentials = getPhotonCredentials();
    HTTP.post(
      'https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irTestSend',
      {
        params: { access_token: photonCredentials.accessToken },
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
  getIrData: (buttonTitle) => {
    const photonCredentials = getPhotonCredentials();
    try {
      const irReceive1 = HTTP.get('https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irData1?access_token=' + photonCredentials.accessToken);
      const irReceive2 = HTTP.get('https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irData2?access_token=' + photonCredentials.accessToken);
      ButtonLibrary.insert({
        userId: Meteor.userId(),
        buttonTitle: buttonTitle,
        buttonType: 'button-panel',
        data: [
          irReceive1.data.result, irReceive2.data.result,
        ],
      });
    } catch (error) {
      throw new Meteor.Error(error);
    }
  },
});
