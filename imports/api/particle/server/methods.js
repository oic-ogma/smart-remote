import { HTTP } from 'meteor/http';
import { ButtonLibrary, ButtonLibrarySchema } from '../../../api/button_library/button_library';

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

const isUniqueButtonTitle = (buttonTitle) => {
  return !ButtonLibrary.find({
    userId: Meteor.userId(),
    buttonTitle: buttonTitle,
  }).count();
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

  insertIrData: (buttonTitle) => {
    if (isUniqueButtonTitle(buttonTitle)) {
      const photonCredentials = getPhotonCredentials();
      try {
        const irReceive1 = HTTP.get('https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irData1?access_token=' + photonCredentials.accessToken);
        const irReceive2 = HTTP.get('https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irData2?access_token=' + photonCredentials.accessToken);
        const buttonObject = {
          userId: Meteor.userId(),
          buttonTitle: buttonTitle,
          irData: [ irReceive1.data.result, irReceive2.data.result ],
        };

        ButtonLibrarySchema.validate(buttonObject);

        ButtonLibrary.insert(buttonObject);
      } catch (error) {
        throw new Meteor.Error('Could not connect to photon cloud.');
      }
    } else {
      throw new Meteor.Error('Not unique id.');
    }
  },
});
