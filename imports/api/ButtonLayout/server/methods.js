import {ButtonLayout} from '../ButtonLayout';
import {SmartRemoteRegistry} from '../../smart_remote_registry/smart_remote_registry';

const getEmptyIndex = () => {
  return SmartRemoteRegistry.findOne({ used: false });
};

Meteor.methods({
  addButton: ( params ) => {
    const registry = getEmptyIndex();
    if ( !!registry ) {
      ButtonLayout.update(
        { groupId: params.groupId },
        {$set: {
          [ 'buttons.' + params.panelId ]: {
            buttonId: params.buttonId,
            registryId: registry._id,
          },
        }}
      );

      SmartRemoteRegistry.update({ _id: registry._id }, {$set: { used: true }});
    } else {
      throw new Meteor.Error('Out of memory.');
    }
  },
});
