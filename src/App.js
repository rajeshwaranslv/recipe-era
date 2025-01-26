import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import FilterOptions from './components/FilterOptions';
import FavoritesButton from './components/FavoritesButton';
import { Layout, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ backgroundColor: '#001529', color: 'white', textAlign: 'center' }}>
          <h1 style={{ color: 'white', margin: 0 }}>Recipe App</h1>
        </Header>
        <Content style={{ padding: '20px 50px' }}>
          <Row gutter={[16, 16]}>
            {/* Filters and Search Bar */}
            <Col span={24}>
              <SearchBar />
              <FilterOptions />
                  {/* Favorites Button */}
          < FavoritesButton />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {/* Recipe List */}
            <Col span={24}>
              <RecipeList />
            </Col>
          </Row>

      
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2025 Recipe App</Footer>
      </Layout>
    </Provider>
  );
}

export default App;
