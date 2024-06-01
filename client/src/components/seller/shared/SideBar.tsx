import React from "react";

const SideBar = () => {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Tables</a>
            </li>
            <li>
              <a>customers</a>
            </li>
            <li>
              <a>customers</a>
            </li>
            <li>
              <a>customers</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
