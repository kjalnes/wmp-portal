import React from 'react';
import { connect } from 'react-redux';
import SignupContainer from '../SignupContainer';
import Globe from '../Globe';


const PortalContainer = () => {
    return (
        <div> This will be the portal container
            <div className='row'>
                <SignupContainer />
                <Globe />
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return (

//     )
// }

// const mapDispatchToProps = (dispatch) => {
//     return (

//     )
// }

export default connect(null)(PortalContainer);
