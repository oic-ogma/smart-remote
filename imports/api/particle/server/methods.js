import { HTTP } from 'meteor/http';
import { ButtonLibrary, ButtonLibrarySchema } from '../../../api/button_library/button_library';
import { SmartRemoteRegistry } from '../../smart_remote_registry/smart_remote_registry';

const getSmartRemoteIndex = (buttonObject) => {
  return SmartRemoteRegistry.findOne({ _id: buttonObject.registryId });
};

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

const irTransmissionInit = (irPartition) => {
  const photonCredentials = getPhotonCredentials();
  HTTP.post(
    'https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irInsertS',
    {
      params: {
        access_token: photonCredentials.accessToken,
        args: irPartition,
      },
    },
  );
};

const transmitIr = (irPartition) => {
  const photonCredentials = getPhotonCredentials();
  HTTP.post(
    'https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irInsert',
    {
      params: {
        access_token: photonCredentials.accessToken,
        args: irPartition,
      },
    }
  );
};

const irTransmissionFinalize = (registryIndex) => {
  const photonCredentials = getPhotonCredentials();
  HTTP.post(
    'https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irInsertE',
    {
      params: {
        access_token: photonCredentials.accessToken,
        args: registryIndex,
      },
    }
  );
};

export const saveIr = (irData, registryId) =>{
  const maxIrLength = 60;
  const maxIrLengthRegex = new RegExp('.{1,' + maxIrLength + '}', 'g');
  const irPartitions = irData.match(maxIrLengthRegex);

  irTransmissionInit(irPartitions[0]);

  for (let i = 1; i < irPartitions.length; i++) {
    transmitIr(irPartitions[i]);
  }

  irTransmissionFinalize(registryId);
};

const isUniqueButtonTitle = (buttonTitle) => {
  return !ButtonLibrary.find({
    userId: Meteor.userId(),
    buttonTitle: buttonTitle,
  }).count();
};

Meteor.methods({
  sendIr: (buttonObject) => {
    const photonCredentials = getPhotonCredentials();
    const index = getSmartRemoteIndex(buttonObject).photonIndex;
    HTTP.post(
      'https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irSend',
      {
        params: {
          access_token: photonCredentials.accessToken,
          args: index,
        },
      }
    );
  },

  irReceive: () => {
    const photonCredentials = getPhotonCredentials();
    HTTP.post(
      'https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/irReceive',
      {
        params: { access_token: photonCredentials.accessToken },
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

  getTemperature: () => {
    const photonCredentials = getPhotonCredentials();
    const response = HTTP.get(
      'https://api.particle.io/v1/devices/' + photonCredentials.deviceId + '/temperature?access_token=' + photonCredentials.accessToken
    );
    return (response.data.result);
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
          irData: irReceive1.data.result + irReceive2.data.result,
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
