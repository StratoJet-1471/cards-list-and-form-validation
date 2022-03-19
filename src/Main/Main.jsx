import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserCardsListContainer from '../UserCardsList/UserCardsListContainer';
import UserProfileContainer from '../UserProfile/UserProfileContainer';
import Btn from '../Btn/Btn';

import './Main.css';


export default function Main({users, currentSection, usersFetchStatus, fetchUsers}) {
    const SORTING_TYPE_CITY = 0, SORTING_TYPE_COMPANY = 1;
    const [sortingType, setSortingType] = useState(SORTING_TYPE_COMPANY);
    const [sortingAllowed, setSortingAllowed] = useState(false);
    const sortingDescription = (sortingType===SORTING_TYPE_CITY) ? "городу" : "компании";

    useEffect(() => { fetchUsers() }, []);

    useEffect(() => {         
        if(usersFetchStatus === "fulfilled" && currentSection === "userCardsList") setSortingAllowed(true);
        else setSortingAllowed(false);
    });

    //Клонируем массив users, чтобы можно было отсортировать данные в клоне (сортировать сам users нельзя).
    let sortedUsers = users.slice();

    if(usersFetchStatus === "fulfilled") {
        sortedUsers.sort((userObject1, userObject2) => {
            let value1 = userObject1.company.name, 
                value2 = userObject2.company.name;

            if(sortingType==SORTING_TYPE_CITY) {
                value1 = userObject1.address.city;
                value2 = userObject2.address.city;
            }

            if(value1 > value2) return 1;
            if(value1 < value2) return -1;
            return 0;
        });
    }

    return (
        <div className='main'>
            <div className="left-sidebar">
                <div className="left-sidebar__controls-block">
                    <span className='left-sidebar__controls-block-title'>Сортировка</span>
                    <Btn onClick={() => setSortingType(SORTING_TYPE_CITY)} disabled={!sortingAllowed}>по городу</Btn>
                    <Btn onClick={() => setSortingType(SORTING_TYPE_COMPANY)} disabled={!sortingAllowed}>по компании</Btn>
                </div>
            </div>
            <div className="content-block">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<UserCardsListContainer usersFetchStatus={usersFetchStatus} users={sortedUsers} sortingDescription={sortingDescription}/>} />
                        <Route path="/user-profile/:userId" element={<UserProfileContainer/>} />                        
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}