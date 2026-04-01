import { Link } from "react-router-dom";
import logo from "../assets/images/fiero.svg"
import ins from "../assets/images/instagram.svg"
import { CATALOGE, CATEGORY, HOME } from "../utils/const";

function Footer(){
    return(
        <footer>
        <div class="leftf">
        <img src={logo} alt="" />
        <p class="ft">© 2025 FIERO. All rights reserved.</p>  
        </div>
        <div class="rightf">
        <Link to={HOME} class="ftr" href="#">home</Link>
        <Link to={CATALOGE} class="ftr" href="#">catalog</Link>
        <Link to={CATEGORY} class="ftr" href="#"><img src={ins} alt="inst" /></Link>
        </div>
    </footer>
    );
}

export default Footer;