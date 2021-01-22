import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { main as mainConfig } from './routes/index';
import { RouteRender} from './routes/_utils';
import ErrorBoundary from './views/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './reducer/store';
import { Spin } from 'antd';
import './locales'
import './styles/App.css';

class App extends Component<any,any> {
  render() {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <Suspense fallback={<div className="app-spin"><Spin size="large"/></div>}>
            <Router>
              <div className="App">
                <Switch>
                  {mainConfig.map((route) => (
                    <RouteRender key={route.path} {...route} />
                  ))}
                </Switch>
              </div>
            </Router>
          </Suspense>
        </ErrorBoundary>
      </Provider>
    );
  }
}

export default App;
