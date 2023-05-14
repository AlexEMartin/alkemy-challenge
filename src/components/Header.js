import { Navbar, Container, Nav } from 'react-bootstrap';
import Buscador from './Buscador'

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">AleFlix</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/favoritos">Favoritos</Nav.Link>
        </Nav>
        <Buscador />
      </Container>
    </Navbar>
  );
}

export default Header;
