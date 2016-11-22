
export const UserSchema = new SimpleSchema({
  password: {
    type: String,
    label: "password",
    max: 16,
    min: 8,
  },
  country: {
    type: String,
    label: "country",
    max: 2,
  },
  zipCode: {
    type: String,
    label: "zipCode",
    max: 10,
  },
});
