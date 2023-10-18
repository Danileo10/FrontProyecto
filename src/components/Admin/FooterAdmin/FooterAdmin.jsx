import { Container } from "react-bootstrap";
import navIcon3 from "../../../../public/whatsapp.png";
import navIcon2 from "../../../../public/nav-icon2.svg";
import navIcon1 from "../../../../public/nav-icon3.svg";
import './FooterAdmin.scss'

export const FooterAdmin = () => {
  return (
    <footer className="footer">
      <Container>
            <div className="social-iconf">
              <a href=""><img src={navIcon1} alt="Icon" /></a>
              <a href=""><img src={navIcon2} alt="Icon" /></a>
              <a href=""><img src={navIcon3} alt="Icon" /></a>
            </div>
            <div className="copy">
              <p>Copyright 2023. All Rights Reserved</p>
            </div>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&family=Quicksand:wght@500&display=swap" rel="stylesheet"></link>
      </Container>
    </footer>
  )
}
