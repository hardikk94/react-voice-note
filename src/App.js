import { Route, Switch } from 'react-router-dom';
import Header from './component/header/header';
import React, { Suspense } from 'react'
import appRoutes from './app-routes';
import './App.css';
function App() {
  return (
    <div className="voice_main_wrapper">
      <Suspense fallback={<div />}>
        <Header />
          <Switch>
            {appRoutes.map(r => (
                <Route
                  key={r.path}
                  exact={r.exact}
                  path={r.path}
                  component={props => {
                    return (
                      <r.component  {...props} 
                      />
                    )
                  }}
                />
              ))}     
        </Switch>  
      </Suspense>
      
         
    </div>
  );
}

export default App;
