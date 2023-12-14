import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import MainPage from './Component/MainDataComponent/MainPage';
import ComparisonReportingComponent from "./Component/BasicCardComponent/DiscoverComponent/ComparisonReportingComponent";
import CompetitorReportingComponent from './Component/BasicCardComponent/DiscoverComponent/CompetitorReportingComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/llmreportdata"
            element={<ComparisonReportingComponent />}
          />
          <Route
            path="/reportdata"
            element={<CompetitorReportingComponent />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
