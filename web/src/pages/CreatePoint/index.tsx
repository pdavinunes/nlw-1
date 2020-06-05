import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'
import {Map, TileLayer, Marker} from 'react-leaflet'
import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

const CreatePoint = () => {

    useEffect(() => {
        api.get('items').then(response => {
            console.log(response);
            
        })
    }, [])

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br/> pontos de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                </fieldset>

                <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                    />
                </div>

                <div className="field-group">
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="field">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <input 
                        type="text"
                        name="whatsapp"
                        id="whatsapp"
                    />
                </div>
                </div>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-5.9006595, -38.6215175]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-5.9006595, -38.6215175]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0"> Selecione uma UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0"> Selecione uma Cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste"/>
                            <span>Lâmpada </span>
                        </li>
                        <li></li>
                        <li></li>
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
}

export default CreatePoint;