import React, { Component } from 'react';
import { rotate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';

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
        if(this.props.classMatch !== newProps.classMatch ) {
            setTimeout(function(){
                stopRotation();
                panTo(newProps.earth, newProps.classMatch.coordinates);
                // not triggering the render?? why??
                this.setState({ rotating: false })

            }, 3000);
        }

    }


    render() {
        return (
            <div>
                {
                    this.props.classMatch && this.state.rotating === false ?
                    <div>
                        <h5>Your class has been matched with {this.props.classMatch.schoolName}!!!</h5>
                    </div>
                    :
                    <div>
                        <h3>{ this.props.classDetails.schoolName } is now ready to be connected with another school.</h3>
                        <button onClick={ this.onClick} className='btn btn-default'>Find a letter exchange match</button>
                    </div>
                }
            </div>
        )

    }
}

export default FindMatch;
