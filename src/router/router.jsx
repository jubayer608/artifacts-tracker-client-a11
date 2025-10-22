import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import Register from "../pages/Register/Register";
import AllArtifacts from "../pages/Home/AllArtifacts";
import PrivateRoute from "../routes/PrivateRoute";
import ArtifactDetails from "../pages/ArtifactDetails/ArtifactDetails";
import AddArtifact from "../pages/ArtifactCrud/AddArtifact";
import LikedArtifacts from "../pages/ArtifactCrud/LikedArtifacts";
import MyArtifactsPage from "../pages/ArtifactCrud/MyArtifactsPage";
import UpdateArtifact from "../pages/ArtifactCrud/UpdateArtifact";
import About from "../pages/About/About";
import Search from "../pages/Search/Search";
import CompareArtifacts from "../pages/Compare/CompareArtifacts";
import NotFound from "../routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:"/artifacts",
          Component:AllArtifacts
        },
        {
             path:"/artifacts/:id",
             element:<PrivateRoute><ArtifactDetails></ArtifactDetails></PrivateRoute>
        },
        {
            path:"/signIn",
            Component:SignIn
        },
        {
          path:"/add-artifact",
          element:<PrivateRoute><AddArtifact></AddArtifact></PrivateRoute>
        },
        {
          path:"/liked-artifacts",
          element:<PrivateRoute><LikedArtifacts></LikedArtifacts></PrivateRoute>
        },
        {
          path:"/my-artifacts",
          element:<PrivateRoute><MyArtifactsPage></MyArtifactsPage></PrivateRoute>
        },
        {
           path:"/update-artifact/:id",
           element:<PrivateRoute><UpdateArtifact></UpdateArtifact></PrivateRoute>
        },
        
        {
            path:"/register",
           Component:Register
        },
        {
            path:"/about",
            Component:About
        },
        {
            path:"/search",
            element:<PrivateRoute><Search></Search></PrivateRoute>
        },
        {
            path:"/compare",
            element:<PrivateRoute><CompareArtifacts></CompareArtifacts></PrivateRoute>
        },
        
    ]
  },
  {
          path:"/*",
          Component:NotFound
        }
]);

export default router;