
export const UserSchema = new SimpleSchema({
  country: {
    type: String,
    label: "country",
    max: 2,
  },
  city: {
    type: String,
    label: "city",
    min: 1,
    max: 58,
  },
});
