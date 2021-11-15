import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header2";
import Investor from "./User/Inverstor.user";
import { Cooperative } from "./User/Cooperative.user";
import { Applicant } from "./User/Applicant.user";
import { Redirect } from "react-router-dom";

const User = () => {
  //личный кабинет пользователя, перенаправление
  let access = localStorage.getItem("access-token");
  console.log(access);
  return (
    <>
      {access ? null : <Redirect to="/" />}
      <Header />
      <Switch>
        {/* инвесторам */}
        <Route path="/user/investor" component={Investor} />
        {/* соискателям */}
        <Route path="/user/applicant" component={Applicant} />
        {/* партнерам */}
        <Route path="/user/cooperative" component={Cooperative} />
      </Switch>
    </>
  );
};
export default User;
