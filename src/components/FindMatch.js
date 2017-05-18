import React, { Component } from 'react';
import { rotate, startRotation, stopRotation, panTo, createMarkerAndPopup } from '../utils/globeAnimation';

class FindMatch extends Component {
    constructor() {
        super();
        this.state = {rotating: false}
        this.onClick = this.onClick.bind(this);
    }

    onClick(action, ev) {
        ev.preventDefault();
        // start rotation
        this.setState({ rotating: true })
        this.props.findMatchFn(this.props.classDetails)
        rotate(this.props.earth);

        // rotate(this.props.earth)
        // start spinning globe
        // axios call to look for match
        // if match, pan to match location
        // show match confirmation with matched class information
    }


    componentWillUpdate(newProps, newState) {
        const classHasChanged = this.props.matchClass !== newProps.matchClass;
        const countryInfoAvailable = newProps.matchClass && newProps.matchClass.alpha2Code;
        const addMarker = false;

        if (classHasChanged && countryInfoAvailable) {
            setTimeout(function(){
                stopRotation();
                panTo(newProps.earth, newProps.matchClass.coordinates, addMarker);
                this.setState({ rotating: false });
                createMarkerAndPopup(newProps.matchClass, newProps.earth);
            }.bind(this), 3000);
        }
    }

    render() {
        return (
            <div className='box'>
                {
                    this.props.matchClass && this.state.rotating === false ?
                    <div style={{width: '500px'}}>
                        <h3><span className='pink'>{this.props.classDetails.schoolName}</span> has been matched with <span className='pink'>{this.props.matchClass.schoolName}</span></h3>
                        <div>
                            <p>Please check your email for a confirmation email. Once the exchange has been confirmed by both school classes, you will receive the instructions for how to proceeed.</p>
                        <p>Thank you for joining the WMP Letter exchange program!</p>
                        </div>
                    </div>
                    :
                    <div>
                        <h3><span className='pink'>{ this.props.classDetails.schoolName }</span> is now ready to be connected with another school.</h3>
                        <button onClick={ this.onClick} className='btn btn-primary'>Find a letter exchange match</button>
                    </div>
                }
            </div>
        )

    }
}

export default FindMatch;
