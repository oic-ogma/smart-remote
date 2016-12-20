import { IRData } from '../IRData';

Meteor.publish("IRData", function() {
  if (this.userId) {
    return IRData.find({
      userId: this.userId
    },
      {
        fields: {
          'data': 1
        }
      });
  } else {
    this.ready();
  }
});
