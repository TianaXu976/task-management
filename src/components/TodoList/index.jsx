import React, { useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./style.module.scss";

// components
import Clock from "../base/Clock";
import AddList from "../base/AddList";
import Panel from "@/base/Panel";
import SaveButton from "../base/SaveButton";

// lib
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// utils
import useTaskReducer, { TASK_ACTION, LIST_ACTION } from "./useTaskReducer";

const cx = classnames.bind(styles);

function TodoList() {
  const [taskInfo, taskDispatch] = useTaskReducer();

  const onDragEnd = (dragInfo) => {
    const { destination, source, type } = dragInfo;

    if (!destination) {
      return;
    }

    if (type === "panel") {
      const panelList = [...taskInfo.allList];

      [panelList[source.index], panelList[destination.index]] = [
        panelList[destination.index],
        panelList[source.index],
      ];

      taskDispatch({
        type: LIST_ACTION.MOVE_LIST,
        payload: panelList,
      });

      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceList = [...taskInfo.tasks[source.droppableId]];
    const targetList = [...taskInfo.tasks[destination.droppableId]];

    if (destination.droppableId === source.droppableId) {
      [sourceList[source.index], sourceList[destination.index]] = [
        sourceList[destination.index],
        sourceList[source.index],
      ];

      taskDispatch({
        type: TASK_ACTION.MOVE_TASK,
        payload: { ...taskInfo.tasks, [source.droppableId]: sourceList },
      });
      return;
    }

    targetList.splice(destination.index, 0, sourceList[source.index]);
    sourceList.splice(source.index, 1);

    taskDispatch({
      type: TASK_ACTION.MOVE_TASK,
      payload: {
        ...taskInfo.tasks,
        [source.droppableId]: sourceList,
        [destination.droppableId]: targetList,
      },
    });
  };

  const saveAll = () => {
    localStorage.setItem("board", JSON.stringify(taskInfo));
  };

  useEffect(() => {
    if (localStorage.length) {
      taskDispatch({
        type: LIST_ACTION.INITIAL_STATE,
        payload: JSON.parse(localStorage.getItem("board")),
      });
    }
  }, [taskDispatch]);

  return (
    <div className={cx("container")}>
      <AddList taskDispatch={taskDispatch} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" direction="horizontal" type="panel">
          {(provided) => (
            <div
              className={cx("lists")}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskInfo.allList.map((item, index) => (
                <Panel
                  key={item.listId}
                  listIndex={index}
                  listTitle={item.listTitle}
                  listId={item.listId}
                  colorType={item.colorType}
                  taskDispatch={taskDispatch}
                >
                  {taskInfo.tasks[item.listId].map((element, index) => (
                    <Panel.Item
                      key={element.taskId}
                      itemIndex={index}
                      taskTitle={element.taskTitle}
                      taskId={element.taskId}
                      listId={item.listId}
                      colorType={item.colorType}
                      taskDispatch={taskDispatch}
                    />
                  ))}
                </Panel>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <SaveButton saveAll={saveAll} />
      <Clock />
    </div>
  );
}

export default TodoList;
