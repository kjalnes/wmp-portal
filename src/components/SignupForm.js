import React from 'react';

const SignupForm = (props) => {
    const {
        firstName,
        lastName,
        email,
        password,
        onChange,
        onClick } = props;

    return (
        <div className='signup'>
            <p>WMP offers a Letter exchange program for students between age 9-12 years. This is a chance for students to befriend a student from another country through letter exchanges.</p>
            <p>It is our aim to promote friendships across borders, enhance literacy and acceptance of diversity, to activate empathy and increase awareness of peace as a strong ideal for young people to aspire to. Each student shares life experiences, art and learn from another student through three letters, all in the name of promoting friendship and non-violent communication. The Letter program provides the participating students with a platform where they can express themselves freely while also learning about the life of a student from a different culture.</p>

            <h3> Sign your class up here</h3>
            <div className='form-group'>
                <input onChange={ onChange.bind(null, 'firstName') } value={ firstName }  name='firstName' className='form-control' placeholder='First name'/>
                <input onChange={ onChange.bind(null, 'lastName') } value={ lastName }  name='lastName' className='form-control' placeholder='Last name'/>
                <input onChange={ onChange.bind(null, 'email') } value={ email }  name='email' className='form-control'placeholder='Email'/>
                <input onChange={ onChange.bind(null, 'password') } value={ password }  name='password' className='form-control' type='password' placeholder='Password'/>
                <button onClick={ onClick.bind(null, 'signup') } className='btn btn-primary'>Sign up</button>
            </div>
        </div>
    )
}

export default SignupForm;
