import React from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import '../auxiliary-css/cross-modules-selectors.css';
import './UserCard.css';

function UserCard({id, fio, city, companyName}) {
    return (
        <div className="user-card">
            <div className="user-card__data-line">
                <span className="user-card__data-description">ФИО:</span>
                <span className="user-card__data">{fio}</span>                
            </div>
            <div className="user-card__data-line">
                <span className="user-card__data-description">Город:</span>
                <span className="user-card__data">{city}</span>                
            </div>
            <div className="user-card__bottom-line">
                <div className="user-card__data-line">
                    <span className="user-card__data-description">Компания:</span>
                    <span className="user-card__data">{companyName}</span>                
                </div>
                <Link className="uni-link" to={"/user-profile/" + id}>Подробнее</Link>
            </div>
        </div>
    );
}

UserCard.propTypes = {
    id: PropTypes.number.isRequired,
    fio: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
}

export default UserCard;