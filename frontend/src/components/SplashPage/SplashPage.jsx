import { useSelector } from "react-redux";
import SplashPageNoUser from "./SplashPageNoUser";
import SplashPageUser from "./SplashPageUser";

function SplashPage() {
    const user = useSelector(state => state.session.user);
    
    if (!user) {
        return <SplashPageNoUser/>
    } else {
        return <SplashPageUser/>
    };
};

export default SplashPage;