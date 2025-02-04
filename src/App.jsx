import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Dictate, { dictateLoader } from "./pages/Dictate";
import User, { userLoader } from "./pages/User";
import Progress from "./pages/Progress";
import Soap from "./pages/Soap";
import RootLayout from "./layouts/RootLayout";
import Login, { loaderFuntion } from "./pages/Login";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} loader={loaderFuntion} />
        <Route path="/" element={<RootLayout />}>
          <Route path="/user" element={<User />} loader={userLoader} />
          <Route index element={<Dictate />} loader={dictateLoader} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/soap" element={<Soap />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
