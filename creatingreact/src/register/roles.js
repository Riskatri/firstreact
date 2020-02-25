import React from "react";

import { hasRole, isAllowed } from "./auth";

function App() {
  const user = {
    roles: ["user"],
    rights: ["can_view_articles"]
  };

  const admin = {
    roles: ["user", "admin"],
    rights: ["can_view_articles", "can_view_users"]
  };

  return (
    <div>
      {hasRole(user, ["user"]) && <p>Is User</p>}
      {hasRole(user, ["admin"]) && <p>Is Admin</p>}
      {isAllowed(user, ["can_view_articles"]) && <p>Can view Articles</p>}
      {isAllowed(user, ["can_view_users"]) && <p>Can view Users</p>}
    </div>
  );
}

export default App;
