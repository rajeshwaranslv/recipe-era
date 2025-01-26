import React, { useState, useEffect } from 'react';
import { Input, Button, message, AutoComplete, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/actions/recipeActions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  // Fetch suggestions based on the query
  useEffect(() => {
    if (query.trim()) {
      fetch(
        `https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=5`
      )
        .then((response) => response.json())
        .then((data) => {
          // Safely check if data.hits exists and is an array
          if (Array.isArray(data?.hits)) {
            const recipeSuggestions = data.hits.map((hit) => ({
              value: hit.recipe.label, // Use label as suggestion
            }));
            setSuggestions(recipeSuggestions);
          } else {
            setSuggestions([]); // Reset suggestions if hits is undefined or not an array
          }
        })
        .catch((err) => {
          console.error('Error fetching suggestions:', err);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Handle the search action
  const handleSearch = () => {
    if (!query.trim()) {
      message.warning('Please enter a search query');
      return;
    }
    dispatch(fetchRecipes(query.trim())); // Dispatch action to fetch recipes
  };

  // Fetch recipe count from the Redux store
  const recipeCount = useSelector((state) => state.recipes.recipes?.length || 0);

  return (
    <div className="mb-4">
      <Row gutter={16} align="middle">
        <Col xs={24} sm={18} md={20}>
          <AutoComplete
            style={{ width: '100%' }}
            options={suggestions}
            onSelect={(value) => setQuery(value)}
          >
            <Input
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="large"
              onPressEnter={handleSearch}
            />
          </AutoComplete>
        </Col>
        <Col xs={24} sm={6} md={4}>
          <Button type="primary" size="large" onClick={handleSearch} block>
            Search
          </Button>
        </Col>
      </Row>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <p>
          <strong>Total Matches:</strong> {recipeCount}
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
