import React, { useState } from 'react';
import { Select, Checkbox, Row, Col, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const { Option } = Select;

const FilterOptions = () => {
  const dispatch = useDispatch();
  
  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDietary, setSelectedDietary] = useState([]);

  // Track applied filters
  const [appliedCategory, setAppliedCategory] = useState('');
  const [appliedDietary, setAppliedDietary] = useState([]);

  const recipeData = useSelector((state) => state.recipes.recipes); // Get filtered recipes from Redux
  const totalFilteredItems = recipeData ? recipeData.length : 0;

  const handleApplyFilters = () => {
    // Apply selected filters
    setAppliedCategory(selectedCategory);
    setAppliedDietary(selectedDietary);
    dispatch(fetchRecipes('', selectedCategory, selectedDietary));
  };

  const handleResetFilters = () => {
    // Reset filters
    setSelectedCategory('');
    setSelectedDietary([]);
    setAppliedCategory('');
    setAppliedDietary([]);
    dispatch(fetchRecipes()); // Fetch recipes with no filters
  };

  return (
    <div className="mb-4">
      <h4>Filters</h4>
      <Row gutter={16}>
        <Col md={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select a category"
            onChange={setSelectedCategory}
            value={selectedCategory}
          >
            <Option value="breakfast">Breakfast</Option>
            <Option value="lunch">Lunch</Option>
            <Option value="dinner">Dinner</Option>
          </Select>
        </Col>
        <Col md={12}>
          <Checkbox.Group
            style={{ width: '100%' }}
            onChange={setSelectedDietary}
            value={selectedDietary}
          >
            <Row>
              <Col span={12}><Checkbox value="vegetarian">Vegetarian</Checkbox></Col>
              <Col span={12}><Checkbox value="vegan">Vegan</Checkbox></Col>
            </Row>
          </Checkbox.Group>
        </Col>
      </Row>

      <Row style={{ marginTop: '10px' }} gutter={16}>
        <Col>
          <Button type="primary" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Col>
        <Col>
          <Button onClick={handleResetFilters}>
            Reset
          </Button>
        </Col>
      </Row>

      <div style={{ marginTop: '20px' }}>
        <p>Total Filtered Items: {totalFilteredItems}</p>
        <p>
          <strong>Applied Filters:</strong>
          {appliedCategory && ` Category: ${appliedCategory}`}
          {appliedDietary.length > 0 && ` Dietary: ${appliedDietary.join(', ')}`}
        </p>
      </div>
    </div>
  );
};

export default FilterOptions;
