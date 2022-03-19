import { connect } from 'react-redux';
import { fetchUsers } from '../react-redux-store/usersSlice';

import Main from './Main';

const mapStateToProps = state => {
    return {
        users: state.usersInfo.users,
        currentSection: state.currentSection,
        usersFetchStatus: state.usersInfo.fetchStatus,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        fetchUsers: () => dispatch(fetchUsers())
    };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps) (Main);

export default MainContainer;