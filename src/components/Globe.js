import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';

class Globe extends Component {

    componentDidMount() {
        this.props.fetchAllCountries();

        if(!this.props.earth) {
            this.props.setEarth(new WE.map('earth_div'));
        } else {
            rotate(this.props.earth)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const currentCountry = this.props.currentCountry;
        const nextCountry = nextProps.currentCountry;

        if(!this.props.earth && nextProps.earth) {
            rotate(nextProps.earth);
            nextProps.earth.on("click", ({ latitude, longitude }) => {
                let previousPopups = document.querySelectorAll(".we-pp-close");

                // this closes any existing popups that might be open
                if (previousPopups.length) {
                    previousPopups.forEach(popup => popup.click());
                }

                this.props.fetchCountry(latitude, longitude);
            });
        }

        if (currentCountry !== nextCountry && nextCountry) {
            stopRotation();
            panTo(nextProps.earth, nextProps.currentCountry.latlng);
            let marker = WE.marker(nextProps.currentCountry.latlng).addTo(nextProps.earth);
            marker.bindPopup(this.getPopupMarkup(nextProps.currentCountry)).openPopup();
        }
    }

    getPopupMarkup(country) {
        return (
            `<div>
                <img src="${country.flag}" style="width:100px;"/>
                <h3>Name: ${country.name}</h3>
                <h3>Population: ${country.population}</h3>
            </div>`
        );
    }

    render() {
        return (
            <div>
                <div id="earth_div"></div>
            </div>
        )
    }
}


export default Globe;
