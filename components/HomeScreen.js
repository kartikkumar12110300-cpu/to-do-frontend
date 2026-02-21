import React from "react";

function HomeScreen({
  categories,
  tasks,
  setSelectedCategory,
  setShowCategory,
  handleLogout,
}) {
  return (
    <div className="home-screen screen">
      <div className="head-wrapper">
        <div className="top-header">
          <div className="menu-btn" onClick={() => setShowCategory(true)}>
            ☰
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="welcome">
          <div className="content">
            <h1>Hello {localStorage.getItem("email")}</h1>
            <p>
              Today you have <span>{tasks.length}</span> tasks
            </p>
          </div>
        </div>
      </div>

      <div className="categories-wrapper">
        <div className="categories">
          {categories.map((category) => {
            const count = tasks.filter(
              (task) => task.category === category.title
            ).length;

            return (
              <div
                key={category.title}
                className="category"
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategory(true);
                }}
              >
                <div className="left">
                  <img src={category.img} alt="" />
                  <div className="content">
                    <h1>{category.title}</h1>
                    <p>{count} Tasks</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
