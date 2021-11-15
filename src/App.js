import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./component/Home";
import User from "./component/User";
import Admin from "./component/Admin";
import { Company } from "./component/Company";
import Contact from "./component/Contact";
import Investor from "./component/Investor";
import Applicant from "./component/Applicant";
import Cooperative from "./component/Сooperative";
import Projects from "./component/Projects";
import ProjectId from "./component/ProjectId";
import { Faq } from "./component/Faq";
import { HowToStart } from "./component/Start";
import { Out } from "./component/OutAdvantages";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/user" component={User} />
        <Route path="/api/auth/active/:id" component={() => <h1>"Ваш аккаунт активирован"</h1>} />
        <Route path="/investor" component={Investor} />
        <Route path="/applicant" component={Applicant} />
        <Route path="/contact" component={Contact} />
        <Route path="/cooperative" component={Cooperative} />
        <Route path="/projects" component={Projects} />
        <Route path="/project/:id" component={ProjectId} />
        <Route path="/company" component={Company} />
        <Route path="/faq" component={Faq} />
        <Route path="/start" component={HowToStart} />
        <Route path="/advantages" component={Out} />
        <Route path="/" component={Home} exact />
      </Switch>
    </Router>
  );
};

export default App;
