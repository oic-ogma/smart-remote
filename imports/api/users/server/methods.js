import { Profile, PhotonCredentials } from '../users';

Meteor.methods({
  checkPhotonCredentials: () =>{
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
  },
});
