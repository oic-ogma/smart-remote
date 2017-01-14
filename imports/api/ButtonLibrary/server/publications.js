import { ButtonLibrary } from '../ButtonLibrary';

Meteor.publish("ButtonLibrary", function() {
  if (this.userId) {
    return ButtonLibrary.find({
      userId: this.userId,
    }
      );
  } else {
    this.ready();
  }
});
