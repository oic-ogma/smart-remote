import { ButtonLibrary } from '../button_library';

Meteor.publish("buttonLibrary", function() {
  if (this.userId) {
    return ButtonLibrary.find({
      userId: this.userId,
    }
      );
  } else {
    this.ready();
  }
});
