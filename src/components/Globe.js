import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';


class Globe extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // gets called on load page
        if(!this.props.earth) {
            this.props.setEarth(new WE.map('earth_div'));
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('this.props', this.props)
        console.log('nextProps', nextProps)
        if(!this.props.earth && nextProps.earth) {
            // initialize(nextState.earth);
            rotate(nextProps.earth);
        }
    }

    render() {
        return (
            <div>
                <div id="earth_div">
                </div>
            </div>
        )
    }
}


export default Globe;
