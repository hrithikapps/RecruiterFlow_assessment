import React from "react";
import Products from "./components/Products";
import store from "./utils/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Products />
      </Provider>
    </div>
  );
};

export default App;
