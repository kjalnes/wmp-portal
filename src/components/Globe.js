import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';


class Globe extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        // this.state = { earth: null };
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

    onClick(ev) {
        ev.preventDefault();
        // this.setState({ earth: new WE.map('earth_div')})
        // rotate(this.state.earth, true);
        // some kind of axios
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
