import { connect } from 'react-redux';
import { setCurrentSection } from '../react-redux-store/currentSectionSlice';

import UserProfile from '../UserProfile/UserProfile';

const mapStateToProps = state => {
    return {
        users: state.usersInfo.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        setCurrentSection: (sectionId) => dispatch(setCurrentSection(sectionId))
    };
};

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps) (UserProfile);

export default UserProfileContainer;