import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';
import FindMatch from '../FindMatch';
import { setEarthSuccess, getLocation } from '../../redux/reducers/earthReducer';
import { createUser } from '../../redux/reducers/userReducer';
import { createClass, findMatchFn } from '../../redux/reducers/classReducer';


const PortalContainer = (props) => {
    const { earth, setEarth, getLocation, location, createUser, user, createClass, classDetails, findMatchFn, classMatch } = props;
    return (
        <div>
            <div className='portal-container'>

                <div className='front-content'>
                    { user === undefined || classDetails === undefined ?
                        <div>
                            <SignupContainer
                                earth={earth}
                                getLocation={getLocation}
                                location={location}
                                createUser={createUser}
                                createClass={createClass}
                                user={user} />
                        </div>
                    :
                        <FindMatch
                            classDetails={classDetails}
                            earth={earth}
                            findMatchFn={findMatchFn}
                            classMatch={classMatch} />
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
        classDetails: state.schoolClass.classDetails,
        classMatch: state.schoolClass.matchClass
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        setEarth: (earth) => dispatch(setEarthSuccess(earth)),
        getLocation: () => dispatch(getLocation()),
        createUser: (user) => dispatch(createUser(user)),
        createClass: (schoolClass) => dispatch(createClass(schoolClass)),
        findMatchFn: (classDetails) => {
            dispatch(findMatchFn(classDetails))
            .then( response => {
                // console.log('response from PortalContainer', response)
            })
        }

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);
