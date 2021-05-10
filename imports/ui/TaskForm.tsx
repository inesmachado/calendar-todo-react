import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'antd';
import { Moment } from 'moment';
import moment from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import 'antd/dist/antd.css';

export const TaskForm = () => {
  const { RangePicker } = DatePicker;
  const [text, setText] = useState('');
  const dateFormat = 'DD.MM.YYYY';
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState([today, today]);

  // Errors
  const [displayErrors, setDisplayErrors] = useState(false);
  const [displayErrorsRangePicker, setDisplayErrorsRangePicker] = useState(false);
  const [invalidDefaultMsg] = useState('Please fill');

  moment.updateLocale("en", { week: { dow: 1 } });

  const handleDateChange = (dates: RangeValue<Moment>, dateStrings: [string, string]): void => {
    if (dateStrings[0] != "" && dateStrings[1] != "") {
      let startDate = formatDate(dateStrings[0]);
      let endDate = formatDate(dateStrings[1]);
      setSelectedDates([new Date(startDate), new Date(endDate)]);
      setDisplayErrorsRangePicker(false);
    } else {
      setDisplayErrorsRangePicker(true);
    }
  };

  const formatDate = (date: String): string => {
    let arr = date.split(".");
    let n = arr[2] + "/" + arr[1] + "/" + arr[0];

    return n;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    //checking if the text is empty or contains only whitespace
    if (!text || /^ *$/.test(text)) {
      setDisplayErrors(true);
      return;
    }

    if (displayErrorsRangePicker) {
      return;
    }

    let groupId = Random.id();
    let startDate = new Date(selectedDates[0]);
    const endDate = new Date(selectedDates[1]);

    do {
      Meteor.call('tasks.insert', text.trim(), groupId, startDate, endDate);
      startDate.setDate(startDate.getDate() + 1);
    } while (startDate <= endDate);


    setText('');
    // setSelectedDates([today, today]);
  };

  const ErrorsRangePicker = displayErrorsRangePicker ? (
    <>
      <span>{`${displayErrorsRangePicker ? invalidDefaultMsg : ''}`}</span>
    </>
  ) : (
      <>
      </>
    );


  return (
    <form className="task-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="task field"
        label="Type to add new tasks"
        value={text}
        onChange={e => { setText(e.target.value); setDisplayErrors(false) }}
        error={displayErrors}
        helperText={`${displayErrors ? invalidDefaultMsg : ''}`}
      />

      <RangePicker
        bordered={false}
        defaultValue={[moment(selectedDates[0], dateFormat), moment(selectedDates[1], dateFormat)]}
        format={dateFormat}
        onChange={handleDateChange}
      />

      {ErrorsRangePicker}

      <Button variant="outlined"
        color="primary"
        type="submit">
        Add Task
       </Button>
    </form>
  );
};
