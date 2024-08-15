import React, { useState } from 'react';

const initialData = {
  categories: [
    {
      id: 'category1',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'widget1', name: 'Widget 1', text: 'Random text for widget 1' },
        { id: 'widget2', name: 'Widget 2', text: 'Random text for widget 2' }
      ]
    },
    {
      id: 'category2',
      name: 'Another Dashboard',
      widgets: []
    }
  ]
};

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [newWidget, setNewWidget] = useState({ name: '', text: '' });
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddWidget = () => {
    const newWidgetData = { id: Date.now().toString(), ...newWidget };
    const updatedCategories = data.categories.map(category => {
      if (category.id === selectedCategory) {
        return { ...category, widgets: [...category.widgets, newWidgetData] };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
    setNewWidget({ name: '', text: '' });
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    const updatedCategories = data.categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const handleSearch = (e) => {
    // Implement search logic based on widget name/text
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <input type="text" placeholder="Search Widgets" onChange={handleSearch} />
      </div>

      <div className="dashboard-content">
        {data.categories.map(category => (
          <div key={category.id} className="category">
            <h2>{category.name}</h2>
            <div className="widgets-grid">
              {category.widgets.map(widget => (
                <div key={widget.id} className="widget-card">
                  <h3>{widget.name}</h3>
                  <p>{widget.text}</p>
                  <button onClick={() => handleRemoveWidget(category.id, widget.id)} className="remove-button">×</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="add-widget-section">
        <h2>Add Widget</h2>
        <input
          type="text"
          placeholder="Widget Name"
          value={newWidget.name}
          onChange={e => setNewWidget({ ...newWidget, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={newWidget.text}
          onChange={e => setNewWidget({ ...newWidget, text: e.target.value })}
        />
        <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">Select Category</option>
          {data.categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button onClick={handleAddWidget} className="add-button">Add Widget</button>
      </div>
    </div>
  );
};

export default Dashboard;
