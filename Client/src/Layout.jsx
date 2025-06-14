import Header from "./Component/Header";
import TopNav from "./Component/TopNav";
import {Outlet} from "react-router-dom";

const Layout = ()=>{
    return(
        <>
        <TopNav/>
        <main style={{margin:"30px"}}>
            <Outlet/>
        </main>

        <Header/>
        </>
    )
}


export default Layout;