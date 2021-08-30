import { useReducer } from "react";

const initialState = {
  allList: [{ listTitle: "已完成", listId: "001", colorType: "green" }],
  tasks: {
    "001": [{ taskTitle: "打疫苗", taskId: "0011" }],
  },
};

export const LIST_ACTION = {
  INITIAL_STATE: "initialState",
  ADD_LIST: "addList",
  EDIT_LIST: "editList",
  DELETE_LIST: "deleteList",
  MOVE_LIST: "moveList",
};

export const TASK_ACTION = {
  ADD_TASK: "addTask",
  EDIT_TASK: "editTask",
  DELETE_TASK: "deleteTask",
  MOVE_TASK: "moveTask",
};

const taskReducer = (taskInfo, action) => {
  switch (action.type) {
    case LIST_ACTION.INITIAL_STATE:
      return action.payload;

    case LIST_ACTION.ADD_LIST:
      return {
        allList: [...taskInfo.allList, action.payload],
        tasks: { ...taskInfo.tasks, [action.payload.listId]: [] },
      };

    case LIST_ACTION.EDIT_LIST:
      const list = taskInfo.allList.find(
        (item) => item.listId === action.payload.listId
      );
      list.listTitle = action.payload.listTitle;
      return { ...taskInfo };

    case LIST_ACTION.DELETE_LIST:
      delete taskInfo.tasks[action.payload];
      return {
        ...taskInfo,
        allList: taskInfo.allList.filter(
          (item) => item.listId !== action.payload
        ),
      };

    case LIST_ACTION.MOVE_LIST:
      return {
        ...taskInfo,
        allList: action.payload,
      };

    case TASK_ACTION.ADD_TASK:
      return {
        ...taskInfo,
        tasks: {
          ...taskInfo.tasks,
          [action.list]: [...taskInfo.tasks[action.list], action.payload],
        },
      };

    case TASK_ACTION.EDIT_TASK:
      const task = taskInfo.tasks[action.list].find(
        (item) => item.taskId === action.payload.taskId
      );
      task.taskTitle = action.payload.taskTitle;
      return { ...taskInfo };

    case TASK_ACTION.DELETE_TASK:
      return {
        ...taskInfo,
        tasks: {
          ...taskInfo.tasks,
          [action.list]: taskInfo.tasks[action.list].filter(
            (item) => item.taskId !== action.payload
          ),
        },
      };

    case TASK_ACTION.MOVE_TASK:
      return {
        ...taskInfo,
        tasks: action.payload,
      };

    default:
      return taskInfo;
  }
};

export default function useTaskReducer() {
  const [taskInfo, taskDispatch] = useReducer(taskReducer, initialState);
  console.log("hi")

  return  [taskInfo, taskDispatch];
}
