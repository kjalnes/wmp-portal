import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';

import { setEarthSuccess, getLocation } from '../../redux/reducers/earthReducer';
import { createUser, createClass } from '../../redux/reducers/userReducer';

const PortalContainer = (props) => {
    const { earth, setEarth, getLocation, location, createUser, user, schoolClass, createClass} = props;
    console.log('schoolClass', schoolClass)
    return (
        <div>
            <div className='portal-container'>

                <div className='front-content'>
                    { user === undefined || schoolClass === undefined ?
                        <SignupContainer
                            earth={earth}
                            getLocation={getLocation}
                            location={location}
                            createUser={createUser}
                            createClass={createClass}
                            user={user} />
                    :
                        <div> Ready for next step </div>
                    }
                </div>
                <Globe setEarth={setEarth} earth={earth} location={location}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        earth: state.earth.earth,
        location: state.earth.location,
        user: state.user.user,
        schoolClass: state.user.class
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        setEarth: (earth) => dispatch(setEarthSuccess(earth)),
        getLocation: () => dispatch(getLocation()),
        createUser: (user) => dispatch(createUser(user)),
        createClass: (schoolClass) => dispatch(createClass(schoolClass))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);
