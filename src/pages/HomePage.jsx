import css from "./HomePage.module.css";
import block from "../assets/block.png";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <section className={css.hero}>
      <div className={css.left}>
        <h1>
          Unlock your potential with the best <span>language</span> tutors
        </h1>

        <p>Embark on an exciting language journey with expert tutors.</p>
        <button className={css.btn} onClick={() => navigate("/teachers")}>
          Get started
        </button>
      </div>

      <div className={css.right}>
        <img src={block} alt="tutor" className={css.image} />
      </div>
    </section>
  );
}
