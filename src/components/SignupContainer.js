import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';
import SignupForm from './SignupForm';
import ClassForm from './ClassForm';

class SignupContainer extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            schoolName: '',
            size: '',
            semester: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(type, ev) {
        this.setState({ [ type ] : ev.target.value });
    }

    onClick(action, ev) {
        ev.preventDefault();
        if(action === 'signup') {
            this.props.createUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            });
            this.props.getLocation();
        } else if (action === 'register-class') {
            this.props.createClass({
                schoolName: this.state.schoolName,
                size: this.state.size,
                semester: this.state.semester,
                coordinates: this.props.location,
                userId: this.props.user.id
            });
        }
    }

    // nextProps gives the updated props / nextState give updated state
    componentWillUpdate(nextProps, nextState) {
        const addMarker = true;
        if(this.props.location !== nextProps.location ) {
            stopRotation();
            panTo(nextProps.earth, nextProps.location, addMarker);
        }
    }

    render() {
        return (
            <div className=''>
            { this.props.user && this.props.location  ?
                <ClassForm
                    onClick={this.onClick}
                    onChange={this.onChange}
                    firstName={this.state.firstName}
                    schoolName={this.state.schoolName}
                    size={this.state.size}
                    semester={this.state.semester} />
                :
                <SignupForm
                    onClick={this.onClick}
                    onChange={this.onChange}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    password={this.state.password} />
            }
            </div>
        )
    }
}


export default SignupContainer;
