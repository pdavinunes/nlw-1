import React from 'react';
import { FiCheckCircle } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';
import './styles.css';

const SuccessScreen = () => {

    const history = useHistory();
    setTimeout( () => { history.push('/') }, 3000)

    return (
        <div id="page-success">
            <div className="main">
                <div className="row">
                    <FiCheckCircle size={100}/>
                </div>
                <div className="row">
                    <h3>Ponto de coleta cadastrado com sucesso!</h3>
                </div>
            </div>
        </div>
    )
}

export default SuccessScreen;