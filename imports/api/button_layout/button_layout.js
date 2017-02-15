import { Mongo } from 'meteor/mongo';
export const ButtonLayout = new Mongo.Collection('buttonLayout');

export const ButtonLayoutSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "ユーザーID",
    min: 17,
    max: 17,
  },
  _id: {
    type: String,
    label: "フィールドのID",
    min: 17,
    max: 17,
  },
  groupId: {
    type: Number,
    label: "Buttonが入っているgroup",
    min: 1,
    max: 1,
  },
  buttons: {
    type: [Object],
    label: "レイアウトに登録されているボタンを保存する配列",
  },
  "buttons.$.buttonId": {
    type: String,
    label: "ボタン単品のID",
    min: 17,
    max: 17,
  },
  "buttons.$.registryId": {
    type: String,
    label: "smartRemoteRegistryのID",
    min: 17,
    max: 17,
  },
});
