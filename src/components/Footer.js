import React from 'react'
import Container  from 'react-bootstrap/Container';

const footer = () => {
  return (
    <footer className="footer px-0 px-lg-2">
    <Container fluid>
      <nav>
        <p className="copyright text-center">
          © {new Date().getFullYear()}{" "}
          <a >Concir Sistemas</a>
        </p>
      </nav>
    </Container>
  </footer>
  )
}

export default footer