import React from "react";

function CategoryScreen({
  selectedCategory,
  tasks,
  toggleTask,
  deleteTask,
  setShowCategory,
}) {
  const filteredTasks = tasks.filter(
    (task) => task.category === selectedCategory.title
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="category-screen screen">
      <div className="head-wrapper">
        <div className="back-btn" onClick={() => setShowCategory(false)}>
          ←
        </div>
      </div>

      <div className="category-details">
        <img src={selectedCategory.img} alt="" />
        <div className="details">
          <p>{filteredTasks.length} Tasks</p>
          <h1>{selectedCategory.title}</h1>
        </div>
      </div>

      <div className="tasks-wrapper">
        <div className="tasks">
          {filteredTasks.map((task) => {
            const isOverdue =
              task.dueDate &&
              task.dueDate < today &&
              !task.completed;

            return (
              <div
                key={task.id}
                className={`task-wrapper ${
                  isOverdue ? "overdue-task" : ""
                }`}
              >
                <label className="task">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span className="checkmark"></span>

                  <div className="task-content">
                    <p>{task.task}</p>

                    {task.dueDate && (
                      <small className="due-date">
                        📅 {task.dueDate}
                      </small>
                    )}

                    {isOverdue && (
                      <span className="overdue-label">
                        Overdue
                      </span>
                    )}

                    <span
                      className={`priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </label>

                <div
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  🗑
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryScreen;
