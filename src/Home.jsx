import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";

function Home() {
  const [loggedIn, setLoggedIn] = React.useState(null);

  const navigate = useNavigate();
  const navigateToPage = (url) => {
    navigate(url);
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(user);
    } else {
      setLoggedIn(null);
    }
  });

  return (
    <>
      <section className="first-look"></section>

      <div className="first-logo">
        <a onClick={() => navigateToPage("/")}>
          <img src="./images/logo.png" alt="logo" />
        </a>
        <h2 className="first-subtext">where hobbies converge</h2>
      </div>

      <section className="topics">
        {loggedIn ? (
          <div>
            <h1>Welcome {loggedIn.email}</h1>
            <button onClick={() => auth.signOut()}>Sign Out</button>
          </div>
        ) : (
          <div className="login-signup">
            <a
              onClick={() => navigateToPage("/log-in")}
              className="login-button"
            >
              <b>LOG IN</b>
            </a>
            <a
              onClick={() => navigateToPage("/sign-up")}
              className="signup-button"
            >
              <b>SIGN UP</b>
            </a>
          </div>
        )}

        <h1>Topics</h1>
        <p>
          Which one <u>interests</u> you today?
        </p>

        <div className="topic-row">
          <div className="topic-column">
            <a onClick={() => navigateToPage("/archery")}>
              <img src="./images/archery.jpg" alt="archery" />
            </a>
            <div className="caption">
              <h1>Archery</h1>
            </div>
          </div>
          <div className="topic-column">
            <a onClick={() => navigateToPage("/basketball")}>
              <img src="./images/basketball.jpg" alt="d" />
            </a>
            <div className="caption">
              <h1>Basketball</h1>
            </div>
          </div>
          <div className="topic-column">
            <a onClick={() => navigateToPage("/culinary")}>
              <img src="./images/culinary.jpg" alt="d" />
            </a>
            <div className="caption">
              <h1>Culinary</h1>
            </div>
          </div>
        </div>
        <div className="topic-row">
          <div className="topic-column">
            <img src="./images/dance.jpg" alt="d" />
            <div className="caption">
              <h1>Dance</h1>
            </div>
          </div>
          <div className="topic-column">
            <img src="./images/embroi.jpg" alt="d" />
            <div className="caption">
              <h1>Embroidery</h1>
            </div>
          </div>
          <div className="topic-column">
            <img src="./images/fishing.jpg" alt="d" />
            <div className="caption">
              <h1>Fishing</h1>
            </div>
          </div>
        </div>
        <div className="topic-row">
          <div className="topic-column">
            <img src="./images/gaming.jpg" alt="d" />
            <div className="caption">
              <h1>Gaming</h1>
            </div>
          </div>
          <div className="topic-column">
            <img src="./images/hiking.jpg" alt="d" />
            <div className="caption">
              <h1>Hiking</h1>
            </div>
          </div>
          <div className="topic-column">
            <img src="./images/iceskating.jpg" alt="d" />
            <div className="caption">
              <h1>Ice Skating</h1>
            </div>
          </div>
        </div>

        <div className="add">
          <a onClick={() => navigateToPage("/new-post")} className="add-button">
            <b>ADD YOUR OWN</b>
          </a>
        </div>
      </section>

      <section className="description">
        <h1>About Us</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, vero
          voluptatibus reiciendis corrupti magni nisi sunt doloribus, nulla
          consectetur totam distinctio laudantium corporis dolorum quo
          repellendus quae reprehenderit sit laborum.
        </p>
        <div className="contact">
          <a href="#" className="contact-button">
            <b>CONTACT US</b>
          </a>
        </div>
      </section>
    </>
  );
}

export default Home;
