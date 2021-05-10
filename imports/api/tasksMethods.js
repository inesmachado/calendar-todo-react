import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Random } from 'meteor/random'

Meteor.methods({
    'tasks.insert'(text, goupId, startDate, endDate) {
        check(text, String);
        check(goupId, String);
        check(startDate, Date);
        check(endDate, Date);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.insert({
            text,
            createdAt: new Date(),
            userId: this.userId,
            goupId,
            startDate,
            endDate
        });
    },

    'tasks.remove'(taskId) {
        check(taskId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.remove(taskId);
    },

    'tasks.removeAll'(Id) {
        check(Id, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.find({ goupId: Id, userId: this.userId }).map(function (task) {
            TasksCollection.remove(task._id);
        });
    },

    'tasks.setIsChecked'(taskId, isChecked) {
        check(taskId, String);
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.update(taskId, {
            $set: {
                isChecked,
            },
        });
    },
});