import Maincontainer from "./Maincontainer";
import Container from 'react-bootstrap/Container';

function Body({ routers,setNxt }) {
    return (
        <Container className="body">
            <Maincontainer routers={routers} setNxt={setNxt}/>
        </Container>
    )
}

export default Body;