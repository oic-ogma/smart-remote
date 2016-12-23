Meteor.publish("photonCredentials", function() {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId,
    },
      {
        fields: {
          'photonCredentials': 1,
        },
      });
  } else {
    this.ready();
  }
});
