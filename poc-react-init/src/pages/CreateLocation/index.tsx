import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import './styles.css';
import logo from '../../assets/logo.svg';
import { MapContainer,Marker,TileLayer } from 'react-leaflet';

const CreateLocation : React.FC = () => {
    return (
        <div id="page-create-location">
            <div className="content">
                <header>
                    <img src={ logo } alt="Coleta Seletiva" />

                    <Link to="/"> 
                        <FiArrowLeft />
                    </Link>
                </header>

                <form>
                    <h1>Cadastro do <br /> local de coleta</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input type="text" name="name" id="name"/>
                        </div>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email"/>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text" name="wharsapp" id="wharsapp" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Marque o endereço no mapa</span>
                        </legend>
                        <MapContainer center={[-21.7946,-48.1766]} zoom={12}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[-21.7946, -48.1766]} />
                        </MapContainer>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <input type="text" name="city" id="city" />
                        </div>
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <input type="text" name="uf" id="uf" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Itens coletados</h2>
                            <span>Você pode marcar um ou mais itens</span>
                        </legend>

                    </fieldset>
                        <ul className="items-grid">
                            <li>
                                <img src="" alt="Papel"/>
                            </li>
                            <li>
                                <img src="" alt="Papel"/>
                            </li>
                            <li>
                                <img src="" alt="Papel"/>
                            </li>
                            <li>
                                <img src="" alt="Papel"/>
                            </li>
                        </ul>
                    <button type="submit">
                        Cadastrar local coleta
                    </button>

                </form>
            </div>
        </div>
    );   
}

export default CreateLocation;