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
        } else {
            rotate(this.props.earth)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(!this.props.earth && nextProps.earth) {
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
