
import {
    createBrowserRouter,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
            {
                path: "team",
                element: <Team />,
                loader: teamLoader,
            },
        ],
    },
]);