import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

import UserCard from '../UserCard/UserCard';

import './UserCardsList.css';

function UserCardsList({setCurrentSection, usersFetchStatus, users, sortingDescription}) {   

    const title = (
        <span className="user-cards-list__title">
            Список пользователей (отсортировано по {sortingDescription}):
        </span>
    );

    let content = (
        <>
            {title}
            <div className='fetch-indicator'>
                <CircularProgress />
            </div>            
        </>
    );

    useEffect(() => { setCurrentSection("userCardsList"); }, []);

    if(usersFetchStatus === "rejected") {
        content = (
            <>
                {title}
                <span className="user-cards-list__text" style={{color: "rgb(139, 0, 0)"}}>Fetch error!</span>
            </>
        );
    }
    else if(usersFetchStatus === "fulfilled") {
        const userCards = users.map((userObject) => {
            const props = {
                id: userObject.id,
                fio: userObject.name,
                city: userObject.address.city,
                companyName: userObject.company.name,
            };
            return <UserCard key={userObject.id} {...props} />;
        });
    
        content = (
            <>
                {title}
                <div className="user-cards-list">
                    {userCards}
                    <div style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                        <span className="user-cards-list__text">Найдено {userCards.length} пользователей</span>
                    </div>
                </div>

            </>
        );
    }
    return content;
}

UserCardsList.propTypes = {
    setCurrentSection: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    sortingDescription: PropTypes.string.isRequired,
}

export default UserCardsList;