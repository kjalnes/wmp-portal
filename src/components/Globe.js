import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';

class Globe extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.state = { earth: null };
    }

    componentDidMount() {
        // gets called on load page
        this.setState({ earth: new WE.map('earth_div') })

    }

    componentWillUpdate(nextProps, nextState) {

        if(!this.state.earth && nextState.earth) {
            // initialize(nextState.earth);
            rotate(nextState.earth);
        }
    }


    onClick(ev) {
        ev.preventDefault();
        // this.setState({ earth: new WE.map('earth_div')})
        // rotate(this.state.earth, true);
        stopRotation();
        panTo(this.state.earth);

    }


    render() {
        return (
            <div>
                <button onClick={ this.onClick }>Click</button>
                <div id="earth_div">
                </div>
            </div>
        )
    }
}






export default Globe;
