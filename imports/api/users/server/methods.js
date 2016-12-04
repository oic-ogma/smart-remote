import { UserSchema } from '../users.js';
Meteor.methods({
  addEnrollmentInfo: (params) => {
    UserSchema.validate(params);
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
});
