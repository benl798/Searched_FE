import React from 'react';

import { HashRouter as Router, Route } from 'react-router-dom';

import ImageList from './components/ImageList';
import ImageCard from './components/ImageCard';
import SearchBar from './components/SearchBar';
import ShowImage from './components/ShowImage';

const Routes = (
  <Router>
    <div>
      <Route path ="/" component={ SearchBar } />
    </div>
  </Router>
);

export default Routes;
