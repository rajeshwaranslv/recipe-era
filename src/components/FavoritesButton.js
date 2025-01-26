import React, { useState } from 'react';
import { Button, Modal, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';

const FavoritesButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null); // Track selected favorite
  const favorites = useSelector((state) => state.favorites);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedFavorite(null); // Clear selected favorite when closing modal
  };

  const handleRecipeClick = (recipe) => {
    setSelectedFavorite(recipe); // Set selected favorite when clicked
  };

  const handleCloseDetailModal = () => {
    setSelectedFavorite(null); // Clear selected favorite when closing details modal
  };

  return (
    <div style={{ textAlign: 'right', margin: '20px' }}>
      {/* Favorites Button */}
      <Button type="primary" onClick={showModal}>
        Favorites ({favorites.length})
      </Button>

      {/* Modal to Show Favorites */}
      <Modal
        title="Your Favorites"
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
        width={800}
      >
        <Row gutter={[16, 16]}>
          {favorites.length > 0 ? (
            favorites.map((recipe, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%', // Ensure the card takes full height
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  cover={<img alt={recipe.label} src={recipe.image} style={{ height: '200px', objectFit: 'cover' }} />}
                  title={recipe.label}
                  onClick={() => handleRecipeClick(recipe)} // Click to show details
                >
                  <p>{recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
                </Card>
              </Col>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>No favorite recipes added yet.</p>
          )}
        </Row>
      </Modal>

      {/* Modal to Show Selected Recipe Details */}
      <Modal
        title={selectedFavorite?.label}
        visible={selectedFavorite !== null}
        onCancel={handleCloseDetailModal}
        footer={null}
        width={800}
      >
        {selectedFavorite && (
          <div>
            <img
              alt={selectedFavorite.label}
              src={selectedFavorite.image}
              style={{
                width: 'auto',
                height: 'auto',
                objectFit: 'cover',
                margin: '0 0 10px 200px',
                borderRadius: '1rem',
              }}
            />
            <h3>Ingredients</h3>
            <ul>
              {selectedFavorite.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedFavorite.instructions}</p>
            <p><strong>Preparation time:</strong> {selectedFavorite.totalTime} minutes</p>
            <p><strong>Serving size:</strong> {selectedFavorite.yield} servings</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FavoritesButton;
