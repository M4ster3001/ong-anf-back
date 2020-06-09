import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";
 
import './styles.css';

const logged = true;

const Header: React.FunctionComponent = () => {

    return(
        <div className="headerArea">
            <div className="logo">
                <Link to="/" >
                    <span className="logo-1">O</span>
                    <span className="logo-2">A</span>
                    <span className="logo-3">F</span>
                </Link>
            </div>

            <nav className="sidebar">
                <ul>
                    { logged &&
                    <>
                        <li>
                            <Link to="/newmissing"> Novo caso</Link>
                        </li>
                        <li>
                            <Link to="/profile">Meus dados</Link>
                        </li>
                        <li>
                            <button className="noButton" onClick={()=>{}}>Sair</button>
                        </li>
                    </>
                    }
                    { !logged &&   
                    <>
                        <li>
                            <Link to="/login" className="button" >Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="button" >Cadastrar</Link>
                        </li>
                    </>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Header;