import { ButtonLayout } from '../button_layout';
import { SmartRemoteRegistry } from '../../smart_remote_registry/smart_remote_registry';
import { ButtonLibrary } from '../../button_library/button_library';
import { setIrStart, setIr, setIrEnd } from '../../particle/server/methods';

const getEmptyIndex = () => {
  return SmartRemoteRegistry.findOne({ userId: Meteor.userId(), used: false });
};

const saveIr = (irData, registryId) =>{

  let bondIr = irData[0] + irData[1];

  let n = 60;
  let  r = new RegExp('.{1,' + n + '}', 'g');
  let splitData = bondIr.match(r);

  setIrStart(splitData[0]);

  for (let i = 1; i < splitData.length; i++) {
    setIr(splitData[i]);
  }

  setIrEnd(registryId);
};

Meteor.methods({
  addButton: (params) => {
    const registry = getEmptyIndex();
    if (!!registry) {
      ButtonLayout.update(
        { userId: Meteor.userId(), groupId: params.groupId },
        { $set: {
          [ 'buttons.' + params.panelId ]: {
            buttonId: params.buttonId,
            registryId: registry._id,
          },
        } }
      );
      SmartRemoteRegistry.update({ _id: registry._id }, { $set: { used: true } });

      const buttonObject = ButtonLibrary.findOne({ _id: params.buttonId });
      saveIr(buttonObject.irData, registry.photonIndex);
    } else {
      throw new Meteor.Error('Out of memory.');
    }
  },

  serchButtonObject: (params) => {
    return ButtonLibrary.findOne({ groupId: params.groupId });
  },
});
