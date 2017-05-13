import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';

import { setEarthSuccess, getLocation } from '../../redux/reducers/earthReducer';
import { createUser } from '../../redux/reducers/userReducer';

const PortalContainer = (props) => {
    const { earth, setEarth, getLocation, location } = props;

    return (
        <div> This will be the portal container
            <div className='portal-container'>
                <SignupContainer earth={earth} getLocation={getLocation} location={location}/>
                <Globe setEarth={setEarth} earth={earth} location={location}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        earth: state.earth.earth,
        location: state.earth.location
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('ownProps', ownProps)
    return ({
        setEarth: (earth) => dispatch(setEarthSuccess(earth)),
        getLocation: () => dispatch(getLocation())
        // createUser: (user) => dispatch(createUser(user))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);
