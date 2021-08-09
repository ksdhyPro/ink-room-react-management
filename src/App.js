import { Switch , Redirect , Route} from "react-router-dom";
import { adminRoutes } from "./routers";
import Frame from './components/Frame/Index'
import './App.css'
import Login from "./pages/Login";

function App() {
  return (
    <>
    {sessionStorage.getItem("isLogin")?(
      <Frame>
        <Switch>
          {adminRoutes.map(route=>(
            <Route path={route.path} key={route.path} exact component={route.component} />
          ))} 
          <Redirect to="/admin/console"/>
        </Switch>
    </Frame>
    ):<Redirect to="/login"/>}
      
    </>
  );
}

export default App;
