import {ButtonLayout} from '../ButtonLayout';

Meteor.methods({
  addButton: ( panelId, groupId, buttonId ) => {
    ButtonLayout.update({ groupId: groupId }, {$set: { [ 'buttons.' + panelId]: buttonId }});
  },
});
