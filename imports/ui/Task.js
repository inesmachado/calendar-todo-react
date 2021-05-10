import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';

export const Task = ({ task, onCheckboxClick, onDeleteClickSingle, onDeleteClickAll }) => {
  let text = task.text + ", " + task.startDate.toDateString() + ", " + task.endDate.toDateString();
  return (
    <li>
      <span>
        <Checkbox
          checked={!!task.isChecked}
          onChange={() => onCheckboxClick(task)}>
          {text}
        </Checkbox>
      </span>

      <Tooltip title="This task" aria-label="Delete this task">
        <IconButton
          color="primary"
          onClick={() => onDeleteClickSingle(task)}
          aria-label="delete task">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="All tasks" aria-label="Delete all tasks">
        <IconButton
          color="primary"
          onClick={() => onDeleteClickAll(task)}
          aria-label="delete all task">
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Tooltip>
    </li>
  );
};
