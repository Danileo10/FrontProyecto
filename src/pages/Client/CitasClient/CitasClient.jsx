import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import baños from "../../../../public/baños.png";
import medicina from "../../../../public/medicina.png";
import cirugia from "../../../../public/cirugia.png";
import tienda from "../../../../public/tienda.png";
import './CitasClient.scss';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


export const CitasClient = () => {

  const sliderOptions = {
    type: 'fade', // Puedes cambiar el tipo de transición (slide, fade, etc.)
    heightRatio: 0.5,   // Altura del slider respecto al ancho del contenedor
    pagination: false, // Muestra la paginación
    arrows: true,  // Muestra las flechas de navegación
    height: '400px', // Establece la altura del slider
    width: '800px',
  };



  return (
    <>
    <h1 className='tituloServicios'>Nuestros Servicios</h1>
      <div className='splide-container'>
        <Splide options={sliderOptions}>
          
          <SplideSlide>
            <img src={baños} alt="Slide 1" />
            <Link to={'/client/citas'} className='linkButton' style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>Baños</h2>
            </Link>
            
          </SplideSlide>
          <SplideSlide>
            <img src={medicina} alt="Slide 2" />
            <Link to={'/client/citas'} className='linkButton' style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>Medicina</h2>
            </Link>
          </SplideSlide>
          <SplideSlide>
            <img src={cirugia} alt="Slide 2" />
            <Link to={'/client/citas'} className='linkButton' style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>Cirugía</h2>
            </Link>
          </SplideSlide>
          <SplideSlide>
            <img src={tienda} alt="Slide 2" />
            <Link to={'/client/productos'} className='linkButton' style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>Tienda</h2>
            </Link>
          </SplideSlide>
          {/* Agrega más SplideSlides según sea necesario */}
        </Splide>
      </div>

    </>
  );
};
