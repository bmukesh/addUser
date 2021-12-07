import React, { useRef } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className='w-1/4 inline-block' htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className='shadow p-2 rounded mx-2 w-3/5' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='text-sm text-red-500'>{meta.error}</div>
      ) : null}
    </>
  );
};

const AddUser = () => {
  const formikRef = useRef();

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  function checkEmail(email) {
    const allEmail = users.map((user) => {
      return user.email;
    });
    if (allEmail.includes(email)) {
      return true;
    }
    return false;
  }

  return (
    <div className='space-y-4'>
      <p className='bg-gray-100 rounded-2xl p-4 inline-block'>
        <span className='font-bold'>Add a new User</span> <br />
      </p>
      <div>
        <Formik
          enableReinitialize={true}
          innerRef={formikRef}
          initialValues={{
            name: '',
            email: '',
            designation: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, 'Must be 2 characters or more')
              .max(100, 'Must be 100 characters or less')
              .required('Please enter a Name'),
            email: Yup.string().email().required(),
            designation: Yup.string()
              .min(2, 'Must be 2 characters or more')
              .max(100, 'Must be 100 characters or less')
              .required('Please enter a designation'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            if (checkEmail(values.email)) {
              alert('Email already exists');
            } else {
              users.push(values);
              localStorage.setItem('users', JSON.stringify(users));
              resetForm();
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className='space-y-12 bg-gray-50 p-4 rounded-xl'>
              <div className='grid grid-cols-2 gap-8'>
                <div>
                  <TextInput label='Name' name='name' placeholder='Name' />
                </div>
                <div>
                  <TextInput label='E-mail' name='email' placeholder='E-mail' />
                </div>
                <div>
                  <TextInput
                    label='Designation'
                    name='designation'
                    type='text'
                    placeholder='Designation'
                  />
                </div>
              </div>

              <div className='text-center'>
                <button
                  type='submit'
                  className='shadow bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
