import React from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {ListUsers, EditUser, NewUser} from './pages';

const AppRouter: React.FC = () => {
  return (
    <Switch>
      <Route
        path="/list-users"
        render={() => (
          <ListUsers editRoutePrefix="/edit-user" newUserRoute="/new-user" />
        )}
      />
      <Route
        path="/edit-user/:id"
        render={({match}) => (
          <EditUser match={match} afterSubmitRoute="/list-users" />
        )}
      />
      <Route
        path="/new-user"
        render={() => <NewUser afterSubmitRoute="/list-users" />}
      />
      <Route render={() => <Redirect to="/list-users" />} />
    </Switch>
  );
};

export default AppRouter;
