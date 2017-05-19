import React, { Component } from 'react';
import { rotate } from '../utils/globeAnimation';

class Globe extends Component {
    componentDidMount() {
        if(!this.props.earth) {
            this.props.setEarth(new WE.map('earth_div'));
        } else {
            rotate(this.props.earth);
        }
    }

    // method is called any time props passed to it changes
    componentWillUpdate(nextProps, nextState) {
        // condition is true once earth gets stored in redux
        if(!this.props.earth && nextProps.earth) {
            rotate(nextProps.earth);
        }
    }

    render() {
        return (
            <div>
                <div id="earth_div"></div>
            </div>
        )
    };
}

export default Globe;
