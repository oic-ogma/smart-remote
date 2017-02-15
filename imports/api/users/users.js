export const Profile = new SimpleSchema({
  country: {
    type: String,
    label: '国コード',
    max: 2,
  },
  city: {
    type: String,
    label: '都市名',
    min: 1,
    max: 58,
  },
  language: {
    type: String,
    label: '言語コード',
    max: 2,
  },
});

export const PhotonCredentials = new SimpleSchema({
  deviceId: {
    type: String,
    label: 'photonのデバイスID',
    min: 24,
    max: 24,
  },
  accessToken: {
    type: String,
    label: 'photonのアクセストークン',
    min: 40,
    max: 40,
  },
});
