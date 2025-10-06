import { Outlet } from "react-router";

const LoggedUserLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default LoggedUserLayout;