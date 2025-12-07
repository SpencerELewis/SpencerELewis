import Header from './Header'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {

  return (
    <>
      <Header />
      <Container className="py-5">
        <h1>Welcome</h1>
        <p>This is the home page.</p>
      </Container>
    </>
  )
}

export default Home;
