import { Link } from "react-router-dom";
import { CATALOGE } from "../utils/const";

function Home(){
    return(
        <main>
            <section class="hero">
                <div class="hero-content">
                    <h1>FIERO</h1>
                    <p class="texhero">Minimal. Bold. You.</p>
                    <Link to={CATALOGE} class="btn-primary">Shop Now</Link>
                </div>
                </section>

                <section class="intro">
                <h2>Minimalism</h2>
                <div class="line"></div>
                <p class="opener">
                    At FIERO, every piece is designed for bold souls with a love
                    for minimal, striking style. Dare to stand out with less. Always
                    with a dash of red.
                </p>
            </section>
        </main>
    );
}

export default Home;