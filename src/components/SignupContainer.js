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
            <button onClick={ onClick.bind(null, 'signup') } className='btn btn-primary'>Sign up</button>
        </form>
    )
}

const ClassForm = (props) => {
    const { firstName, onChange, onClick, schoolName, size, semester } = props;
    return (
        <div>
            <h3>Thanks for signing up, {firstName}!</h3>
            <form className='form-group'>
                <input onChange={ onChange.bind(null, 'schoolName') } value={ schoolName }  name='schoolName' className='form-control' placeholder='School name'/>
                <input onChange={ onChange.bind(null, 'size') } value={ size }  name='size' className='form-control' placeholder='Amount of students in your class'/>
                <div>
                <label> Choose what school semester your class will be participating</label>
                <select onChange={onChange.bind(null, 'semester')} className='selectpicker  form-control show-tick' data-width='350px' >
                    <optgroup label="2017">
                        <option value="spring-17">Spring</option>
                        <option value="fall-17">Fall</option>
                    </optgroup>
                    <optgroup label="2018">
                        <option value="spring-18">Spring</option>
                        <option value="fall-18" selected>Fall</option>
                    </optgroup>
                </select>
                </div>
                <button onClick={ onClick.bind(null, 'register-class') } className='btn btn-primary'>Register class</button>
            </form>
        </div>
    )
}


class SignupContainer extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            schoolName: '',
            size: null,
            semester: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(type, ev) {
        console.log('type, ev.target.value', type, ev.target.value)
        this.setState({[type] : ev.target.value})
    }


    onClick(action, ev) {
        ev.preventDefault();
        // this.setState({ earth: new WE.map('earth_div')})
        // rotate(this.state.earth, true);
        // some kind of axios
        let userInfo = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password };
        let classInfo = {schoolName: this.state.schoolName, size: this.state.size, semester: this.state.semester };
        if(action === 'signup') {
            this.props.createUser(userInfo);
            this.props.getLocation();
        }
        if(action === 'register-class') {
            // this.props.createClass(classInfo)
            console.log('register class action needed')
        }

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
        console.log('this.props', this.props)
        return (
            <div className='signup-container'>
                { this.props.user.firstName && this.props.location  ?
                    <ClassForm
                        onClick={this.onClick}
                        onChange={this.onChange}
                        firstName={this.state.firstName}
                        schoolName={this.schoolName}
                        size={this.size}
                        semeste={this.semester}
                    />
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
