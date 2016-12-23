import { ButtonLibrary } from '../ButtonLibrary';

Meteor.publish("ButtonLibrary", function() {
  if (this.userId) {
    return ButtonLibrary.find({
      userId: this.userId
    }

        // fields: {
        //   '_id': 1
        // }
      );
  } else {
    this.ready();
  }
});
