import { ButtonLayout } from '../button_layout';

Meteor.publish('buttonLayout', function() {
  if (this.userId) {
    return ButtonLayout.find({
      userId: this.userId,
    }
      );
  } else {
    return this.ready();
  }
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'other': 1, 'things': 1}});
});
