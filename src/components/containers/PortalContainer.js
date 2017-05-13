import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';
import FindMatch from '../FindMatch';

import { setEarthSuccess, getLocation } from '../../redux/reducers/earthReducer';
// import { createUser, createClass } from '../../redux/reducers/userReducer';
import { createUser } from '../../redux/reducers/userReducer';
import { createClass } from '../../redux/reducers/classReducer';


const PortalContainer = (props) => {
    const { earth, setEarth, getLocation, location, createUser, user, createClass, classDetails } = props;
    return (
        <div>
            <div className='portal-container'>

                <div className='front-content'>
                    { user === undefined || classDetails === undefined ?
                        <SignupContainer
                            earth={earth}
                            getLocation={getLocation}
                            location={location}
                            createUser={createUser}
                            createClass={createClass}
                            user={user} />
                    :
                        <FindMatch classDetails={classDetails}/>
                    }
                </div>
                <Globe setEarth={setEarth} earth={earth} location={location}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('state.schoolClass.classDetails', state.schoolClass.classDetails);
    return ({
        earth: state.earth.earth,
        location: state.earth.location,
        user: state.user.user,
        classDetails: state.schoolClass.classDetails
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
