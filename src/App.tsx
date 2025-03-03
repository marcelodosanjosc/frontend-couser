import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import {Provider} from "react-redux";
import {store} from "./store/store";
import ProductDetail from './pages/ProductDetail';
/*import OrderDetail from './pages/OrderDetail';
import CategoryDetail from './pages/CategoryDetail';*/

const App: React.FC = () => {
  return (
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/products/:id" element={<ProductDetail />} />
            {/*<Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />*/}
        </Routes>
      </Router>
      </Provider>
  );
};

export default App;