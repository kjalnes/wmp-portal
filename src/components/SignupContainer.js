import React, { Component } from 'react';
import { rotate, animate, startRotation, stopRotation, panTo } from '../utils/globeAnimation';


const SignupForm = (props) => {
    const { firstName, lastName, email, password, onChange, onClick } = props;
    return (
        <div className='signup'>
        <div>
            WMP offers a Letter exchange program for students between age 9-12 years. This is a chance for students to befriend a student from another country through letter exchanges.
            <br />
            It is our aim to promote friendships across borders, enhance literacy and acceptance of diversity, to activate empathy and increase awareness of peace as a strong ideal for young people to aspire to. Each student shares life experiences, art and learn from another student through three letters, all in the name of promoting friendship and non-violent communication. The Letter program provides the participating students with a platform where they can express themselves freely while also learning about the life of a student from a different culture.
            <h3> Sign your class up here</h3>
        </div>
            <form className='form-group'>
                <input onChange={ onChange.bind(null, 'firstName') } value={ firstName }  name='firstName' className='form-control' placeholder='First name'/>
                <input onChange={ onChange.bind(null, 'lastName') } value={ lastName }  name='lastName' className='form-control' placeholder='Last name'/>
                <input onChange={ onChange.bind(null, 'email') } value={ email }  name='email' className='form-control'placeholder='Email'/>
                <input onChange={ onChange.bind(null, 'password') } value={ password }  name='password' className='form-control' type='password' placeholder='Password'/>
                <button onClick={ onClick.bind(null, 'signup') } className='btn btn-primary'>Sign up</button>
            </form>
        </div>
    )
}

const ClassForm = (props) => {
    const { firstName, onChange, onClick, schoolName, size, semester } = props;
    return (
        <div className='signup'>
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
                        <option value="fall-18">Fall</option>
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
        this.setState({[type] : ev.target.value})
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
        }
        if(action === 'register-class') {
            this.props.createClass({
                schoolName: this.state.schoolName,
                size: this.state.size,
                semester: this.state.semester,
                coordinates: this.props.location,
                userId: this.props.user.id
            })
        }
    }

    // gets called whenever state or props change
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
                        schoolName={this.schoolName}
                        size={this.size}
                        semester={this.semester} />
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
