import React from 'react';
import SignupContainer from '../SignupForm';
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


export default PortalContainer;
