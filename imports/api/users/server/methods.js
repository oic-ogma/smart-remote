import { Profile, PhotonCredentials } from '../users';
import { validatePhotonCredentials } from '../../particle/server/methods';

Meteor.methods({
  hasPhotonCredentials: () =>{
    if (!Meteor.user().photonCredentials) {
      throw new Meteor.Error('error');
    }
  },
  addEnrollmentInfo: (params) => {
    Profile.validate(params);
    Meteor.users.update(
      Meteor.userId(),
      {
        $set: {
          profile: {
            'country': params.country,
            'city': params.city,
            'language': params.language,
          },
        },
      }
    );
  },
  addPhotonInfo: (params) => {
    PhotonCredentials.validate(params);
    if (validatePhotonCredentials(params.accessToken)) {
      Meteor.users.update(
        Meteor.userId(),
        {
          $set: {
            photonCredentials: {
              'deviceId': params.deviceId,
              'accessToken': params.accessToken,
            },
          },
        }
      );
    } else {
      throw new Meteor.Error('Invalid access token.');
    }
  },
});
