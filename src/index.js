import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import {mainRoutes} from './routers/index'
import App from './App';
import {get,post} from './api/http.js'
React.$get = get
React.$post = post



ReactDOM.render(
  <HashRouter>
    <ConfigProvider locale={zhCN}>
      <Switch>
        <Route path="/admin" render={routerPops=><App {...routerPops}/>} />
        {mainRoutes.map(route=>{
          return <Route key={route.path} {...route}/>
        })}
        <Redirect path="/" exact to="/admin"/>
        <Redirect to="/404"/>
      </Switch>
    </ConfigProvider>
  </HashRouter>,
  document.getElementById('root')
);


reportWebVitals();
