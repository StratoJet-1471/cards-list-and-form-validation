import { connect } from 'react-redux';
import { setCurrentSection } from '../react-redux-store/currentSectionSlice';

import UserCardsList from '../UserCardsList/UserCardsList';

const mapDispatchToProps = (dispatch) => {
    return {        
        setCurrentSection: (sectionId) => dispatch(setCurrentSection(sectionId))
    };
};

const UserCardsListContainer = connect(null, mapDispatchToProps) (UserCardsList);

export default UserCardsListContainer;