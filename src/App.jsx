import { useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

          <RouterProvider router={router} />
     
      </PersistGate>
    </Provider>
  );
}

export default App;