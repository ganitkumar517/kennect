import React, { Suspense, useEffect } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
    useNavigate,
} from "react-router-dom";
import { DefaultRoute, pageRoutes } from "./config";
import { isLoggedIn } from "../utils/index";
import NotFound from "../pages/NotFound";
import Home from '../pages/user-login/NameEntry'
function FinalRoute({ route }) {
      const navigate = useNavigate();

      useEffect(() => {
        if (!route.public && !isLoggedIn()) {
          navigate("/");
        }

        if (isLoggedIn() && route.path == "/") {
          navigate("/");
        }
      }, []);
    return route.layout === "blank" ? (
        <Suspense fallback={<></>}>
            <route.component />
        </Suspense>
    ) : (
        <Suspense fallback={<></>}>
            <route.component />
        </Suspense>
    );
}

function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Suspense fallback={<></>}>
                    <Home/>
                </Suspense>} />
                {pageRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<FinalRoute route={route} />}
                    />
                ))}
                <Route path="*" element={<NotFound>Page not found!!</NotFound>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
