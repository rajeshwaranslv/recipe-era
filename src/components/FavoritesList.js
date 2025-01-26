import React from 'react';
import { Card, Col, Row } from 'antd';
import { useSelector } from 'react-redux';

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div>
      <h3>Your Favorites</h3>
      <Row gutter={[16, 16]}>
        {favorites.map((recipe, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              cover={<img alt={recipe.label} src={recipe.image} />}
              title={recipe.label}
            >
              <p>{recipe.cuisineType?.join(', ') || 'No cuisine info'}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FavoritesList;
