import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';

class Globe extends Component {

    componentDidMount() {
        // get all countries in the world to store in redux
        this.props.fetchAllCountries();

        // when the component mounts, we create a new earth, otherwise rotate the existing earth
        if(!this.props.earth) {
            this.props.setEarth(new WE.map('earth_div'));
        } else {
            rotate(this.props.earth)
        }
    }

    // this method is called any time this component's state or props passed to it change
    componentWillUpdate(nextProps, nextState) {
        const currentCountry = this.props.currentCountry;
        const nextCountry = nextProps.currentCountry;

        // this condition is true once the earth gets stored in redux
        if(!this.props.earth && nextProps.earth) {
            rotate(nextProps.earth);

            /*
             * when the earth is clicked, get the latitude and longitude
             * and use the ws.geonames.org API to fetch the country code
             * for the country clicked
             */
            nextProps.earth.on("click", ({ latitude, longitude }) => {
                // find any existing popups that are open
                let previousPopups = document.querySelectorAll(".we-pp-close");

                // close any existing popups that are open
                if (previousPopups.length) {
                    previousPopups.forEach(popup => popup.click());
                }

                // get the country code based on the latitude / longitude
                this.props.fetchCountry(latitude, longitude);
            });
        }

        /*
         * when clicking the earth, if the country clicked is not equal to the country
         * that was previously clicked, pan to that country and show the popup with the
         * country info
         */
        if (currentCountry !== nextCountry && nextCountry) {
            // stops the rotation
            stopRotation();
            // pans to the country
            panTo(nextProps.earth, nextProps.currentCountry.latlng);
            // creates the popup marker
            let marker = WE.marker(nextProps.currentCountry.latlng).addTo(nextProps.earth);
            // mounts the popup html to the marker
            marker.bindPopup(this.getPopupMarkup(nextProps.currentCountry)).openPopup();
        }
    }

    /*
     * this generates the HTML for the country popup
     * (returns a string, not JSX, since that is what the popup needs)
     */
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
