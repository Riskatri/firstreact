// import React from "react";
// import mainLogo from "../userProfile/fisika.jpg";
// import "../userProfile/profile.css";

// const Home = () => {
//   return (
//     <div className="blog">
//       <div className="container">
//         <div className="blog-content">
//           <img src={mainLogo} alt="post-1" />
//           <div className="blog-title">
//             <h5>
//               Physics, science that deals with the structure of matter and the
//               interactions between the fundamental constituents of the
//               observable universe
//             </h5>
//             <button className="btn"> Scientist</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Home;

import React from "react";
import { ButtonToggle } from "reactstrap";

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fact: (
        <div>
          <table className="container table table-striped table-dark home">
            <tr>
              <th className="text-danger about">01</th>
              <th className="about">
                Galileo discovered the law of free fall after dropping two
                spheres from the Leaning Tower of Pisa.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">02</th>
              <th className="about">
                An apple didn’t fall on Newton’s head when he discovered the law
                of universal gravitation. He simply wondered why apples fall
                downward rather than sideways.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">03</th>
              <th className="about">
                A “Eureka moment” references Archimedes’ enthusiasm when he
                discovered buoyancy (The fact that he ran out naked is a minor
                detail.).
              </th>
            </tr>
            <tr>
              <th className="text-danger about">04</th>
              <th className="about">
                The universe is constantly expanding, getting faster and colder
                as time passes.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">05</th>
              <th className="about">
                Time travel is possible – you’re doing it now, moving forward in
                time.
              </th>
            </tr>
          </table>
        </div>
      )
    };
  }

  changefact = () => {
    this.setState({
      fact: (
        <div>
          <table className="container table table-striped table-dark home">
            <tr>
              <th className="text-danger about">01</th>
              <th className="about">
                Physics is the science of matter and its behavior.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">02</th>
              <th className="about">
                Comes from the Greek word, physikḗ, which means “science of
                nature.”.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">03</th>
              <th className="about">
                It was recognized as a discipline in the 19th century.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">04</th>
              <th className="about">
                It aims to understand how the universe works.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">05</th>
              <th className="about">
                It originated from astronomy, mathematics, and natural
                philosophy in 3000 B.C.
              </th>
            </tr>
          </table>
        </div>
      )
    });
  };

  changefact2 = () => {
    this.setState({
      fact: (
        <div>
          <table className="container table table-striped table-dark home">
            <tr>
              <th className="text-danger about">01</th>
              <th className="about">
                Aristotle developed Aristotelian physics in 300 B.C., but most
                of it was speculative and proven wrong by other philosophers.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">02</th>
              <th className="about">
                Archimedes’ encounter with buoyancy in 250 BC is the first
                fundamental physics discovery.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">03</th>
              <th className="about">
                The Theory of Impetus explains projectile motion. It was
                formulated by John Philoponus in 500 B.C.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">04</th>
              <th className="about">
                Galileo Galilei discovered that objects fall at the same time
                despite differences in mass.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">05</th>
              <th className="about">
                Newton formed the Laws of Motion in 1687.
              </th>
            </tr>
          </table>
        </div>
      )
    });
  };

  changefact3 = () => {
    this.setState({
      fact: (
        <div>
          <table className="container table table-striped table-dark home">
            <tr>
              <th className="text-danger about">01</th>
              <th className="about">
                Galileo discovered the law of free fall after dropping two
                spheres from the Leaning Tower of Pisa.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">02</th>
              <th className="about">
                An apple didn’t fall on Newton’s head when he discovered the law
                of universal gravitation. He simply wondered why apples fall
                downward rather than sideways.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">03</th>
              <th className="about">
                A “Eureka moment” references Archimedes’ enthusiasm when he
                discovered buoyancy (The fact that he ran out naked is a minor
                detail.).
              </th>
            </tr>
            <tr>
              <th className="text-danger about">04</th>
              <th className="about">
                The universe is constantly expanding, getting faster and colder
                as time passes.
              </th>
            </tr>
            <tr>
              <th className="text-danger about">05</th>
              <th className="about">
                Time travel is possible – you’re doing it now, moving forward in
                time.
              </th>
            </tr>
          </table>
        </div>
      )
    });
  };

  render() {
    return (
      <div>
        {/* <h1> {this.state.color}</h1> */}
        <ButtonToggle color="info" className="btn2" onClick={this.changefact3}>
          Interesting Fact
        </ButtonToggle>
        <ButtonToggle
          color="success"
          className="btn3"
          onClick={this.changefact2}
        >
          Essential Fact
        </ButtonToggle>
        <ButtonToggle color="info" className="btn4" onClick={this.changefact}>
          Quick Fact
        </ButtonToggle>
        <h3> {this.state.fact}</h3>
      </div>
    );
  }
}
export default Car;
