import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        alert('Logged out successfully!'); 

       
        setTimeout(() => {
            navigate('/'); 
            window.location.reload(); 
        }, 500); 
    }, [navigate]);

    return null; 
}

export default Logout;
