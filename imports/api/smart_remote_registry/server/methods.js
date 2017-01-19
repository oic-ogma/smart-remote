import {SmartRemoteRegistry} from '../../smart_remote_registry/smart_remote_registry';
import {ButtonLayout} from '../../button_layout/button_layout';

Meteor.methods({
  addDataFirstLogin: () => {
    const registryCount = SmartRemoteRegistry.find({ userId: Meteor.userId()}).count();
    if ( registryCount === 0 ) {
      let groupId = 0;
      for ( let i = 0; i < 50; i++ ) {
        if ( i % 4  === 0 ) {
          groupId++;
          ButtonLayout.insert({ "buttons": [
            null,
            null,
            null,
            null,
          ],
            "groupId": groupId,
            "type": "button-panel",
            "userId": Meteor.userId(),
          });
        }

        SmartRemoteRegistry.insert({
          "photonIndex": i,
          "userId": Meteor.userId(),
          "used": false,
        });
      }
    }
  },
});
