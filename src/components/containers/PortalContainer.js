import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';

import { setEarthSuccess, getLocation } from '../../redux/reducers/earthReducer';
import { createUser } from '../../redux/reducers/userReducer';

const PortalContainer = (props) => {
    const { earth, setEarth, getLocation, location, createUser, user } = props;

    return (
        <div>
            <div className='portal-container'>
                <SignupContainer
                    earth={earth}
                    getLocation={getLocation}
                    location={location}
                    createUser={createUser}
                    user={user} />
                <Globe setEarth={setEarth} earth={earth} location={location}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        earth: state.earth.earth,
        location: state.earth.location,
        user: state.user
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        setEarth: (earth) => dispatch(setEarthSuccess(earth)),
        getLocation: () => dispatch(getLocation()),
        createUser: (user) => dispatch(createUser(user))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);
