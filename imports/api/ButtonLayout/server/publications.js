import { ButtonLayout } from '../ButtonLayout';

Meteor.publish("ButtonLayout", function() {
  if (this.userId) {
    return ButtonLayout.find({
      userId: this.userId,
    }
      );
  } else {
    this.ready();
  }
});
