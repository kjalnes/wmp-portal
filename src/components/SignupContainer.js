import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';


const SignupForm = (props) => {
    const { fullName, email, password, onChange, onClick } = props;
    return (
        <form className='form-group'>
            <input onChange={ onChange.bind(null, 'fullName') } value={ fullName }  name='fullName' className='form-control' placeholder='Full name'/>

            <input onChange={ onChange.bind(null, 'email') } value={ email }  name='email' className='form-control'placeholder='Email'/>
            <input onChange={ onChange.bind(null, 'password') } value={ password }  name='password' className='form-control' type='password' placeholder='Password'/>
            <button onClick={ onClick } className='btn btn-primary'>Sign up</button>
        </form>
    )
}

class SignupContainer extends Component {
    constructor() {
        super()
        this.state = { fullName: '', email: '', password: ''};
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
                <SignupForm onClick={this.onClick} onChange={this.onChange} fullName={this.state.fullName} email={this.state.email} password={this.state.password} />
            </div>
        )
    }
}


export default SignupContainer;
