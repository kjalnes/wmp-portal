import React, { Component } from 'react';
import { startRotation, stopRotation, panTo } from '../utils/globeAnimation';

class FindMatch extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(action, ev) {
        ev.preventDefault();
        console.log('clicked match button')
        // start spinning globe
        // axios call to look for match
        // if match, pan to match location
        // show match confirmation with matched class information
    }


    componentWillUpdate(newProps, newState) {
        // if(this.props.location !== newProps.location ) {
        //     stopRotation();
        //     panTo(newProps.earth, newProps.location);
        // }
    }


    render() {
        return (
            <div>
                <h3>{ this.props.classDetails.schoolName } is now ready to be connected with another school.</h3>
                <button onClick={ this.onClick} className='btn btn-default'>Find a letter exchange match</button>
            </div>
        )

    }
}

export default FindMatch;
