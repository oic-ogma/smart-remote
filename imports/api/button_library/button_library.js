import { Mongo } from 'meteor/mongo';
export const ButtonLibrary = new Mongo.Collection('buttonLibrary');

export const ButtonLibrarySchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'ユーザーID',
    min: 17,
    max: 17,
  },
  buttonTitle: {
    type: String,
    label: 'ボタン表示するときのタイトル',
    min: 1,
    max: 20,
  },
  irData: {
    type: String,
    label: '赤外線情報',
    max: 1000,
  },
});
