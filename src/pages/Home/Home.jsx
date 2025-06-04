import { useNavigate } from 'react-router-dom';
import './Home.css';
import Gallery from '../../components/Gallery/Gallery';

function Home(){
    const navigate = useNavigate();
    return(
        <div>
            <div className="hero">
                <h1>Track Your Reading Journey!</h1>
                <button onClick={() => navigate('/SignUp')} >Start Here</button>
            </div>
            <div className='galleryContainer'><Gallery /></div>
            
        </div>
    );
}

export default Home;