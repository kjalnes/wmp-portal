import React from 'react';

const ClassForm = (props) => {
    const {
        firstName,
        onChange,
        onClick,
        schoolName,
        size,
        semester } = props;

    return (
        <div className='signup'>
            <h3>Thanks for signing up, {firstName}!</h3>
            <div className='form-group'>
                <input onChange={ onChange.bind(null, 'schoolName') } value={ schoolName }  name='schoolName' className='form-control' placeholder='School name'/>
                <input onChange={ onChange.bind(null, 'size') } value={ size }  name='size' className='form-control' placeholder='Amount of students in your class'/>
                <label> Choose what school semester your class will be participating</label>
                <select onChange={onChange.bind(null, 'semester')} className='selectpicker  form-control show-tick'>
                    <optgroup label="2017">
                        <option value="spring-17">Spring</option>
                        <option value="fall-17">Fall</option>
                    </optgroup>
                    <optgroup label="2018">
                        <option value="spring-18">Spring</option>
                        <option value="fall-18">Fall</option>
                    </optgroup>
                    <optgroup label="2019">
                        <option value="spring-19">Spring</option>
                        <option value="fall-19">Fall</option>
                    </optgroup>
                </select>
                <button onClick={ onClick.bind(null, 'register-class') } className='btn btn-primary'>Register class</button>
            </div>
        </div>
    )
}

export default ClassForm;
