import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';
import { setEarthSuccess } from '../../redux/reducers/earthReducer';

const PortalContainer = (props) => {
    const { earth, setEarth } = props;

    return (
        <div> This will be the portal container
            <div className='row'>
                <SignupContainer earth={earth} />
                <Globe setEarth={setEarth} earth={earth} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        earth: state.earth.earth
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        setEarth: (earth) => dispatch(setEarthSuccess(earth))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalContainer);
