import { Redirect, Route, Switch } from "react-router-dom";
import adminSlug from "../resources/AdminSlug";
import AddCategory from "../screens/Admin/Category Manager/Screens/AddCategory";
import CategoryManager from "../screens/Admin/Category Manager/Screens/CategoryManager";
import EditCategory from "../screens/Admin/Category Manager/Screens/EditCategory";
import AddService from "../screens/Admin/Service Manager/screens/AddService";
import ServiceManager from "../screens/Admin/Service Manager/screens/ServiceManager";
import UserManager from "../screens/Admin/User/screens/UserManager";

const AdminRoutes = (props) => {
  const handleLoading = props.handleLoading;
  return (
    <>
      <Switch>
        <Route
          exact
          path={adminSlug.serviceManager}
          render={() => <ServiceManager {...props} />}
        ></Route>
        <Route
          exact
          path={adminSlug.addService}
          render={() => <AddService {...props} />}
        ></Route>
        <Route
          exact
          path={adminSlug.userManager}
          render={() => <UserManager {...props} />}
        ></Route>

        <Route
          exact
          path={adminSlug.categoryManager}
          render={(props) => (
            <CategoryManager {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.addCategory}
          render={(props) => (
            <AddCategory {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.editCategory}
          render={(props) => (
            <EditCategory {...props} handleLoading={handleLoading} />
          )}
        ></Route>
      </Switch>
    </>
  );
};

export default AdminRoutes;
