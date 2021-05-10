import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const SEED_USERNAME = 'max';
const SEED_PASSWORD = 'pass';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
