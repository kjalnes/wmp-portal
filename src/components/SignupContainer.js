import React, { Component } from 'react';

const SignupForm = (props) => {
    const { fullName, email, password, onChange } = props;
    return (
        <form>
            <input onChange={ onChange.bind(null, 'fullName') } value={ fullName }  name='fullName' className='form-control' placeholder='Full name'/>
            <input onChange={ onChange.bind(null, 'email') } value={ email }  name='email' className='form-control'placeholder='Email'/>
            <input onChange={ onChange.bind(null, 'password') } value={ password }  name='password' className='form-control' type='password' placeholder='Password'/>
            <button>Sign up</button>
        </form>
    )
}

class SignupContainer extends Component {
    constructor() {
        super()
        this.state = { fullName: '', email: '', password: ''}
        this.onChange = this.onChange.bind(this)
    }

    onChange(type, ev) {
        this.setState({[type] : ev.target.value})
        console.log(this.state[type])
    }

    onClick(ev) {
        ev.preventDefault();
    }

    render() {
        return (
            <div>
                <SignupForm onChange={this.onChange} fullName={this.state.fullName} email={this.state.email} password={this.state.password} />

            </div>
        )
    }
}


export default SignupContainer;
