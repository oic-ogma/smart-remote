import { UserSchema } from '../users.js';
Meteor.methods({
  addEnrollmentInfo: (params) => {
    Meteor.users.update(
      Meteor.userId(),
      {
        $set: {
          profile: {
            'country': params.country,
            'zipCode': params.zipCode,
          },
        },
      }
    );
  },
});
