import React from 'react'
import Container  from 'react-bootstrap/Container';

const footer = () => {
  return (
    <footer className="footer px-0 px-lg-3">
    <Container fluid>
      <nav>
       
        <p className="copyright text-center">
          © {new Date().getFullYear()}{" "}
          <a >Bootstrap</a>
        </p>
      </nav>
    </Container>
  </footer>
  )
}

export default footer