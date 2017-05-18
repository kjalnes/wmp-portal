import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';
import FindMatch from '../FindMatch';

import { setEarthSuccess, getLocation, fetchAllCountries } from '../../redux/reducers/earthReducer';
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
        fetchAllCountries,
        countries,
        currentCountry,
        findMatchFn,
        matchClass
    } = props;

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
                            matchClass={matchClass} />
                    }
                </div>
                <Globe
                    setEarth={setEarth}
                    earth={earth}
                    location={location}
                    countries={countries}
                    currentCountry={currentCountry}
                    fetchAllCountries={fetchAllCountries}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log("state.schoolClass.classDetails", state.schoolClass.classDetails)
    console.log("state.schoolClass.matchClass", state.schoolClass.matchClass)
    return {
        earth: state.earth.earth,
        location: state.earth.location,
        user: state.user.user,
        classDetails: state.schoolClass.classDetails,
        matchClass: state.schoolClass.matchClass,
        countries: state.earth.countries,
        currentCountry: state.earth.currentCountry
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEarth: (earth) => dispatch(setEarthSuccess(earth)),
        getLocation: () => dispatch(getLocation()),
        createUser: (user) => dispatch(createUser(user)),
        createClass: (schoolClass) => dispatch(createClass(schoolClass)),
        findMatchFn: (classDetails) => {
            dispatch(findMatchFn(classDetails))
            .then( response => {
                // console.log('response from PortalContainer', response)
            })
        },
        fetchAllCountries: () => dispatch(fetchAllCountries())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);
