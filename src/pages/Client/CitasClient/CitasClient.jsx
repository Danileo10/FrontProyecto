
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import baños from "../../../../public/baños.png";
import medicina from "../../../../public/medicina.png";
import cirugia from "../../../../public/cirugia.png";
import tienda from "../../../../public/tienda.png";
import './CitasClient.scss';

export const CitasClient = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Nuestros Servicios</h2>
              <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={2000} className="owl-carousel owl-theme skill-slider">
                <div className="item">
                  <img src={medicina} alt="Image" />
                  <h5>Medicina General</h5>
                </div>
                <div className="item">
                  <img src={baños} alt="Image" />
                  <h5>Baños</h5>
                </div>
                <div className="item">
                  <img src={cirugia} alt="Image" />
                  <h5>Cirugía</h5>
                </div>
                <div className="item">
                  <img src={tienda} alt="Image" />
                  <h5>Tienda</h5>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&family=Quicksand:wght@500&display=swap" rel="stylesheet"></link>
      </div>
    </section>
  )
};
