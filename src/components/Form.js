import React, { useState, useEffect } from 'react';
import { Formik, withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, errors, touched, status }) => {
    
    const [users, setUsers] = useState([]);
    
    
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    },[status]);

    console.log('Status', status)
    
    return (
      <div>
        <Form>
          <Field name="name" type="text" placeholder="Name" />
          {touched.name && errors.name && <p>{errors.name}</p>}

          <Field name="email" type="email" placeholder="Email" />
          {touched.email && errors.email && <p>{errors.email}</p>}

          <Field name="password" type="password" placeholder="Password" />
          {touched.password && errors.password && <p>{errors.password}</p>}

          <label>
            <Field name="tos" type="checkbox" checked={values.tos} />
            Accept TOS
          </label>

          <button type="submit">Submit!</button>
        </Form>
        {users.map(user => (
           
               <div>
                   <h3>Team Member #{user.id}</h3>
                   <p>Name: {user.name}</p>
                   <p>Email: {user.email}</p>
               </div>
            
        ))}
      </div>
    );
}

const FormikLUserForm = withFormik({

    mapPropsToValues({ name, email, password, tos }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        tos: tos || false,
      };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('A username is required'),
        email: Yup.string().email('E-mail is not valid!').required('E-mail is required'),
        password: Yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
        tos: Yup.bool().required('You must accept the terms of service to continue')
    }),
  
    handleSubmit(values, { setStatus, resetForm }) {
      console.log(values)
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
            console.log(res.data);
            console.log(res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log(err.response))
      //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    }
  
})(UserForm);

export default FormikLUserForm;
