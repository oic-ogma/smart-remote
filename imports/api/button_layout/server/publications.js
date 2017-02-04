import { ButtonLayout } from '../button_layout';

Meteor.publish("buttonLayout", function() {
  if (this.userId) {
    return ButtonLayout.find({
      userId: this.userId,
    }
      );
  } else {
    return this.ready();
  }
});
