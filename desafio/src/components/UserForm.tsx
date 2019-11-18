import React from 'react';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import {Formik, FormikProps, Form, Field, ErrorMessage} from 'formik';
import {IUser} from '../store/types';
import '../styles/buttons.css';
import '../styles/forms.css';
import '../styles/dialogs.css';

interface IUserForm {
  afterSubmitRoute: string;
  user?: IUser;
  handleUserSubmit: (user: IUser) => any;
}

interface IUserData {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}

const UserForm: React.FC<IUserForm> = ({
  afterSubmitRoute,
  user,
  handleUserSubmit,
}) => {
  const history = useHistory();

  const initialState: IUserData = user
    ? {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        address: {
          street: user.address.street,
          city: user.address.city,
          zipcode: user.address.zipcode,
          suite: user.address.suite,
        },
        phone: user.phone,
      }
    : {
        id: '',
        name: '',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
        },
        phone: '',
      };

  const submitText = user ? 'Save' : 'Register';
  // const titleText = user ? 'Edit user' : 'Register new user';

  // can make HTTP requests to validate unique ID, for example
  const validation = async (values: IUserData) => {
    const errors = {};

    return errors;
  };

  const handleSubmit = (values: IUserData, options: any) => {
    const user: IUser = {
      id: Number.parseInt(values.id, 10),
      name: values.name,
      email: values.email,
      address: {
        street: values.address.street,
        city: values.address.city,
        suite: values.address.suite,
        zipcode: values.address.zipcode,
      },
      phone: values.phone,
    };

    const names = user.name.split(' ');
    const firstName = names[0];
    const lastName = names[names.length - 1];
    const shortName =
      names.length === 1 ? firstName : `${firstName} ${lastName}`;

    const modalText =
      submitText === 'Save'
        ? `Updated personal info for ${shortName} with success!`
        : `Registered new user ${shortName} with success!`;

    handleUserSubmit(user);
    swal({
      title: 'Très bien!',
      text: modalText,
      icon: 'success',
    }).then(() => {
      options.setSubmitting(false);
      history.push(afterSubmitRoute);
    });
  };

  const handleCancel = (event: any) => {
    event.preventDefault();
    history.goBack();
  };

  const formikCallback = ({isSubmitting}: FormikProps<IUserData>) => (
    <Form>
      <div className="user-form-data-container">
        <div className="user-form-contact-container">
          <label className="user-form-label-container">
            <span>Identifier:</span>
            <Field type="text" name="id" placeholder="identifier" />
            <ErrorMessage name="id" component="span" />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>Full name:</span>
            <Field type="text" name="name" placeholder="full name" />
            <ErrorMessage name="name" component="span" />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>E-mail:</span>
            <Field type="email" name="email" placeholder="email" />
            <ErrorMessage name="email" component="span" />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>Phone number:</span>
            <Field type="text" name="phone" placeholder="phone number" />
            <ErrorMessage name="phone" component="span" />
          </label>
        </div>

        <br />

        <div className="user-form-address-container">
          <h2 className="user-form-address-title">Address</h2>

          <label className="user-form-label-container">
            <span>Street:</span>
            <Field
              type="text"
              name="address.street"
              placeholder="address street"
            />
            <ErrorMessage name="address.street" component="span" />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>Suite:</span>
            <Field
              type="text"
              name="address.suite"
              placeholder="address suite"
            />
            <ErrorMessage name="address.suite" component="span" />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>City:</span>
            <Field type="text" name="address.city" placeholder="address city" />
            <ErrorMessage name="address.city" component="span" />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>Zipcode:</span>
            <Field
              type="text"
              name="address.zipcode"
              placeholder="address zipcode"
            />
            <ErrorMessage name="address.zipcode" component="span" />
          </label>
        </div>
      </div>

      <div className="user-form-submit-container">
        <button
          type="submit"
          disabled={isSubmitting}
          className="button user-form-button">
          {submitText}
        </button>

        <button
          type="button"
          className="button user-form-button"
          onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </Form>
  );

  return (
    <div className="user-form-container">
      <Formik
        initialValues={initialState}
        validate={validation}
        onSubmit={handleSubmit}>
        {formikCallback}
      </Formik>
    </div>
  );
};

export default UserForm;
