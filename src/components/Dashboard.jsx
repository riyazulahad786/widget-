import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { LuRefreshCw } from "react-icons/lu";
import { GoGraph } from "react-icons/go";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dashboardData, setDashboardData] = useState({
    categories: [
      {
        name: "CWPP Executive Dashboard",
        widgets: [
          {
            id: uuidv4(),
            name: "Cloud Accounts",
            text: "Connected vs Not Connected",
            type: "chart",
            data: {
              datasets: [
                {
                  data: [50, 50],
                  backgroundColor: ["lightblue", "blue"],
                  borderColor: ["#fff", "#fff"],
                  borderWidth: 1
                }
              ]
            }
          },
          {
            id: uuidv4(),
            name: "Cloud Accounts Task Assessments",
            text: "Task Status",
            type: "chart",
            data: {
              datasets: [
                {
                  data: [70, 5, 15, 10],
                  backgroundColor: ["green", "lightblue", "yellow", "brown"],
                  borderColor: ["#fff", "#fff"],
                  borderWidth: 1
                }
              ]
            }
          }
        ]
      },
      {
        name: "CSPM Dashboard",
        widgets: []
      },
      {
        name: "Registry Scan",
        widgets: []
      }
    ]
  });

  const handleClose = () => {
    setShowModal(false);
    setSelectedWidget(null);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleCategoryChange = (e) => setSelectedCategory(parseInt(e.target.value, 10));

  const handleAddWidget = () => {
    if (selectedCategory === null || !widgetName || !widgetText) return;

    // Check for duplicate widget names
    const category = dashboardData.categories[selectedCategory];
    const isDuplicate = category.widgets.some(widget => widget.name === widgetName);

    if (isDuplicate) {
      alert("Widget with this name already exists in the selected category.");
      return;
    }

    const newWidget = {
      id: uuidv4(),
      name: widgetName,
      text: widgetText,
      type: "chart",
      data: {
        datasets: [
          {
            data: [50, 50],
            backgroundColor: ["lightblue", "blue"],
            borderColor: ["#fff", "#fff"],
            borderWidth: 1
          }
        ]
      }
    };

    setDashboardData(prevState => {
      const updatedCategories = [...prevState.categories];
      updatedCategories[selectedCategory].widgets = [...updatedCategories[selectedCategory].widgets, newWidget];
      return { ...prevState, categories: updatedCategories };
    });

    setWidgetName("");
    setWidgetText("");
    handleClose();
  };

  const handleDeleteWidget = () => {
    if (selectedCategory === null || selectedWidget === null) return;

    setDashboardData(prevState => {
      const updatedCategories = [...prevState.categories];
      updatedCategories[selectedCategory].widgets = updatedCategories[selectedCategory].widgets.filter(widget => widget.id !== selectedWidget);
      return { ...prevState, categories: updatedCategories };
    });

    setSelectedWidget(null);
    handleClose();
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredCategories = dashboardData.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm) || widget.text.toLowerCase().includes(searchTerm)
    )
  }));

  return (
    <div className="container py-3">
      <div className="row d-flex justify-content-between">
        <div className="col-lg-6">
          <h5>CNNAP Dashboard</h5>
        </div>
        <div className="col-lg-6 d-flex justify-content-evenly">
          <button
            className="header_widget d-flex justify-content-between align-items-center shadow"
            type="button"
            onClick={handleShow}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-title="Tooltip on top"
          >
            <span>Add Widget</span>
            <span className="mx-1">
              <IoIosAdd />
            </span>
          </button>
          <div className="d-flex border_icon justify-content-center align-items-center">
            <LuRefreshCw />
          </div>
          <div className="d-flex border_icon justify-content-center align-items-center">
            <CiMenuKebab />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <span>
              <FaClock />
            </span>
            <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
              <select className="form-select" aria-label="Default select example">
                <option defaultValue>Last 2 days</option>
                <option value="1">Last 3 days</option>
                <option value="2">Last 4 days</option>
                <option value="3">Last 8 days</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Widgets"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {filteredCategories.map((category, categoryIndex) => (
        <div className="row mt-3" key={categoryIndex}>
          <h6>{category.name}</h6>
          {category.widgets.length === 0 ? (
            <div className="col-lg-4 shadow d-flex justify-content-center align-items-center widget">
              <button className="d-flex justify-content-center align-items-center border-0 px-2 py-1 shadow" onClick={handleShow}>
                <span>
                  <IoIosAdd />
                </span>
                <span className="mx-1">Add Widget</span>
              </button>
            </div>
          ) : (
            category.widgets.map((widget) => (
              <div className="col-lg-4 shadow widget" key={widget.id}>
                <p className="p-2">{widget.name}</p>
                <div className="row">
                  <div className="col-lg-6">
                    <Doughnut data={widget.data} />
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex flex-column align-items-start">
                      {/* Render widget details based on type */}
                      <div className="d-flex align-items-center mb-2">
                        <div style={{ width: 20, height: 20, backgroundColor: "blue" }}></div>
                        <span className="ms-2">Details for {widget.text}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="danger" onClick={() => { setSelectedCategory(categoryIndex); setSelectedWidget(widget.id); handleShow(); }} className="mt-2">
                  Delete Widget
                </Button>
              </div>
            ))
          )}
          <div className="col-lg-4 shadow d-flex justify-content-center align-items-center widget">
            <button className="d-flex justify-content-center align-items-center border-0 px-2 py-1 shadow" onClick={handleShow}>
              <span>
                <IoIosAdd />
              </span>
              <span className="mx-1">Add Widget</span>
            </button>
          </div>
        </div>
      ))}

      {/* Modal for adding or deleting widget */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedWidget ? "Delete Widget" : "Add Widget"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedWidget ? (
            <Form>
              <p>Are you sure you want to delete this widget?</p>
              <Button variant="danger" onClick={handleDeleteWidget}>Delete Widget</Button>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3" controlId="categorySelect">
                <Form.Label>Select Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCategory === null ? "" : selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {dashboardData.categories.map((category, index) => (
                    <option key={index} value={index}>{category.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="widgetName">
                <Form.Label>Widget Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter widget name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="widgetText">
                <Form.Label>Widget Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter widget text"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddWidget}>
                Add Widget
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;
