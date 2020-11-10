import React from "react";
import { LocationProvider } from "woozie";
import PageRouter from "./views/PageRouter";

function App() {
  return (
    <LocationProvider>
      <PageRouter />
    </LocationProvider>
  );
}

export default App;
