import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';
import FindMatch from '../FindMatch';
import { setEarthSuccess, getLocation } from '../../redux/reducers/earthReducer';
import { createUser } from '../../redux/reducers/userReducer';
import { createClass, findMatchFn } from '../../redux/reducers/classReducer';


const PortalContainer = (props) => {
    const {
        earth,
        setEarth,
        getLocation,
        location,
        createUser,
        user,
        schoolClass,
        createClass,
        classDetails,
        findMatchFn,
        matchClass } = props;

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
                        <FindMatch
                            classDetails={classDetails}
                            earth={earth}
                            findMatchFn={findMatchFn}
                            matchClass={matchClass} />
                    }
                </div>
                <Globe setEarth={setEarth} earth={earth} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        earth: state.earth.earth,
        location: state.earth.location,
        user: state.user.user,
        classDetails: state.schoolClass.classDetails,
        matchClass: state.schoolClass.matchClass
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEarth: (earth) => dispatch(setEarthSuccess(earth)),
        getLocation: () => dispatch(getLocation()),
        createUser: (user) => dispatch(createUser(user)),
        createClass: (schoolClass) => dispatch(createClass(schoolClass)),
        findMatchFn: (classDetails) => dispatch(findMatchFn(classDetails))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);
