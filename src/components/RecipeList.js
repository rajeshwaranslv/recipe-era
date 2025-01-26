import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, toggleFavorite } from '../redux/actions/recipeActions';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const favorites = useSelector((state) => state.favorites);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    dispatch(fetchRecipes('pizza')); // Fetch recipes with the default query
  }, [dispatch]);

  const isFavorite = (recipe) => favorites.some((fav) => fav.label === recipe.label);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const toggleFavoriteStatus = (recipe) => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {recipes.map((recipe, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              cover={<img alt={recipe.label} src={recipe.image} style={{ height: '200px', objectFit: 'cover' }} />}
              title={recipe.label}
              onClick={() => handleRecipeClick(recipe)} // Clicking on the card opens the modal
            >
              <p>{recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
              <Button
                type={isFavorite(recipe) ? 'danger' : 'primary'}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event from firing
                  toggleFavoriteStatus(recipe);
                }}
              >
                {isFavorite(recipe) ? 'Remove Favorite' : 'Add to Favorites'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal to show recipe details */}
      <Modal
        title={selectedRecipe?.label}
        visible={selectedRecipe !== null}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        {selectedRecipe && (
          <div>
            <img
              alt={selectedRecipe.label}
              src={selectedRecipe.image}
              style={{ width: 'auto', height: 'auto', objectFit: 'cover', margin:"0 0 10px 200px",borderRadius:"1rem" }}
            />
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedRecipe.instructions}</p>
            <p><strong>Preparation time:</strong> {selectedRecipe.totalTime} minutes</p>
            <p><strong>Serving size:</strong> {selectedRecipe.yield} servings</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RecipeList;
