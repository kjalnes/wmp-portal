import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';


const SignupForm = (props) => {
    const { firstName, lastName, email, password, onChange, onClick } = props;
    return (
        <form className='form-group'>
            <input onChange={ onChange.bind(null, 'firstName') } value={ firstName }  name='firstName' className='form-control' placeholder='First name'/>
            <input onChange={ onChange.bind(null, 'lastName') } value={ lastName }  name='lastName' className='form-control' placeholder='Last name'/>
            <input onChange={ onChange.bind(null, 'email') } value={ email }  name='email' className='form-control'placeholder='Email'/>
            <input onChange={ onChange.bind(null, 'password') } value={ password }  name='password' className='form-control' type='password' placeholder='Password'/>
            <button onClick={ onClick } className='btn btn-primary'>Sign up</button>
        </form>
    )
}

class SignupContainer extends Component {
    constructor() {
        super()
        this.state = { firstName: '', lastName: '', email: '', password: ''};
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(type, ev) {
        this.setState({[type] : ev.target.value})
    }


    onClick(ev) {
        ev.preventDefault();
        // this.setState({ earth: new WE.map('earth_div')})
        // rotate(this.state.earth, true);
        // some kind of axios
        this.props.createUser(this.state);
        this.props.getLocation();

        // panTo(this.props.earth, this.props.location);
    }

    // gets called whenever state or props change
    // newProps gives the updated props / newState give updated state
    componentWillUpdate(newProps, newState) {
        if(this.props.location !== newProps.location ) {
            stopRotation();
            panTo(newProps.earth, newProps.location);
        }
    }

    render() {
        return (
            <div className='signup-container'>
                <SignupForm
                    onClick={this.onClick}
                    onChange={this.onChange}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    password={this.state.password} />
            </div>
        )
    }
}


export default SignupContainer;
