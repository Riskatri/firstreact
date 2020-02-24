// import React from "react";
// import "./App.css";
// import Index from "./index";
// // import ClearStorage from "./storage/clearstorage";
// // import SessionStorage from "./storage/sessionstorage";

// const App = props => {
//   return (
//     <div>
//       {/* <ClearStorage />
//       <SessionStorage /> */}
//       <Index />
//     </div>
//   );
// };
// export default App;

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./layout/main";
import ID from "./api/getid";
import GET from "./api/book";
// import Books from "./api/GetUsingHook";
// import Update from "./api/Updatebooks";
// import Delete from "./api/Deletebooks";
import Update from "./api/Updatebooks";
import Post from "./api/Postbooks";
import Register from "./register/register";

const App = props => {
  return (
    <Router>
      <Switch>
        <Main>
          <Switch>
            <Route path="/get/books/" component={GET} />
            <Route path="/get/books/:id" component={ID} />
            <Route path="/post/books" component={Post} />
            <Route path="/update/books/:id" component={Update} />
            {/* <Route path="/delete/books/:id" component={Delete} /> */}
            <Route path="/register" component={Register} />
          </Switch>
        </Main>
      </Switch>
    </Router>
  );
};
export default App;
