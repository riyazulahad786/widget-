import {} from "react";
import { FaClock } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";
import { GoGraph } from "react-icons/go";

function Dashboard() {
  return (
    <div className="container py-3">
      <div className="row d-flex justify-content-between">
        <div className="col-lg-6">
          <h5>CNNAP Dashboard</h5>
        </div>
        <div className="col-lg-6 d-flex justify-content-evenly">
          <button className="header_widget d-flex justify-content-between align-items-center shadow">
            <span>Add Widget </span>
            <span className="mx-1">
              <IoIosAdd />
            </span>
          </button>
          <div className="d-flex justify-content-center align-items-center">
            <LuRefreshCw />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <CiMenuKebab />
          </div>

          <div>
            <select className="form-select" aria-label="Default select example">
              <option selected>
                <FaClock />
                Last 2 days
              </option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Thursday</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row gap-2">
        <h6>CSPM Excutive Dashboard</h6>
        <div className="col-lg-4 shadow  widget ">
          <p className="p-2">Cloud accounts</p>
          <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Connected
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Not Connected
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 shadow  widget">
          <p className="p-2">Cloud accounts task assesments</p>
          <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Failed(2)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Warning(5)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Not available(20)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  passed(70)
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 shadow d-flex justify-content-center align-items-center widget">
          <button className="d-flex justify-content-center align-items-center border-0 px-2 py-1 shadow">
            <span>
              <IoIosAdd />
            </span>
            <span className="mx-1">Add Widget</span>
          </button>
        </div>
      </div>
      <div className="row gap-2 mt-3">
        <h6>CSPM Excutive Dashboard</h6>
        <div className="col-lg-4 shadow d-flex justify-content-center align-items-center widget ">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <GoGraph />
            <span>No graph data available</span>
          </div>
        </div>
        <div className="col-lg-4 shadow d-flex justify-content-center align-items-center widget">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <GoGraph />
            <span>No graph data available</span>
          </div>
        </div>
        <div className="col-lg-4 shadow d-flex justify-content-center align-items-center widget">
          <button className="d-flex justify-content-center align-items-center border-0 px-2 py-1 shadow">
            <span>
              <IoIosAdd />
            </span>
            <span className="mx-1">Add Widget</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
