/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import EditPage from '../EditPage';
import InfoPage from '../InfoPage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route path={`/plugins/${pluginId}/:id/edit-content`} component={EditPage} />
        <Route path={`/plugins/${pluginId}/:id/edit`} component={InfoPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
