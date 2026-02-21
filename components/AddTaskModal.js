import React from "react";

function AddTaskModal({
  showModal,
  setShowModal,
  taskInput,
  setTaskInput,
  taskPriority,
  setTaskPriority,
  taskDate,
  setTaskDate,
  addTask,
}) {
  if (!showModal) return null;

  return (
    <>
      <div
        className="black-backdrop active"
        onClick={() => setShowModal(false)}
      ></div>

      <div className="add-task active">
        <h1 className="heading">Add Task</h1>

        <div className="input-group">
          <label>Task</label>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Priority</label>
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="input-group">
          <label>Due Date</label>
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
        </div>

        <div className="btns">
          <button onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTaskModal;
