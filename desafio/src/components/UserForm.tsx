import React from 'react';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import * as yup from 'yup';
import {Formik, FormikProps, Form, Field, ErrorMessage} from 'formik';
import {IUser} from '../store/types';
import UserPreview from './UserPreview';
import '../styles/buttons.css';
import '../styles/forms.css';
import '../styles/dialogs.css';

interface IUserForm {
  afterSubmitRoute: string;
  user?: IUser;
  otherUserIds?: number[];
  handleUserSubmit: (user: IUser) => Promise<any>;
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

const phoneRegex = /\(\d\d\) \d{4,5}-\d{4}/;

const validationSchema = yup.object().shape({
  id: yup
    .number()
    .required('Please enter the user ID')
    .positive('The user ID must be a positive number')
    .integer('The user ID must be an integer number'),
  name: yup.string().required("Please enter the user's full name"),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  phone: yup.string().matches(phoneRegex, 'Please enter a valid phone number'),
});

const UserForm: React.FC<IUserForm> = ({
  afterSubmitRoute,
  user,
  otherUserIds,
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
    const errors: any = {};

    const userId = Number.parseInt(values.id, 10);

    if (otherUserIds) {
      const filtered = otherUserIds.filter(id => id === userId);
      if (filtered.length > 0 && !errors.id) {
        errors.id = `The user ID ${userId} already exists, please, choose an unique ID instead`;
      }
    }

    return errors;
  };

  const handleSubmit = async (values: IUserData, options: any) => {
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

    try {
      await handleUserSubmit(user);
      await swal({
        title: 'Très bien!',
        text: modalText,
        icon: 'success',
      });
      options.setSubmitting(false);
      history.push(afterSubmitRoute);
    } catch (reason) {
      console.error(reason);
      // FIXME: provide a different and helpful message in production
      await swal({
        title: 'Test/mock error',
        text:
          'This is an automatically generated error to test the app in development mode, please try again later',
        icon: 'error',
      });
    }
  };

  const handleCancel = (event: any) => {
    event.preventDefault();
    history.goBack();
  };

  const formikCallback = ({
    isSubmitting,
    values,
    errors,
    touched,
  }: FormikProps<IUserData>) => (
    <Form>
      <div className="user-form-data-container">
        <div className="user-form-contact-container">
          <label className="user-form-label-container">
            <span>Identifier:</span>
            <Field type="text" name="id" placeholder="identifier" />
            <ErrorMessage
              name="id"
              component="span"
              className="error-feedback-message"
            />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>Full name:</span>
            <Field type="text" name="name" placeholder="full name" />
            <ErrorMessage
              name="name"
              component="span"
              className="error-feedback-message"
            />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>E-mail:</span>
            <Field type="text" name="email" placeholder="email" />
            <ErrorMessage
              name="email"
              component="span"
              className="error-feedback-message"
            />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>Phone number:</span>
            <Field type="text" name="phone" placeholder="(00) 00000-0000" />
            <ErrorMessage
              name="phone"
              component="span"
              className="error-feedback-message"
            />
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
            <ErrorMessage
              name="address.street"
              component="span"
              className="error-feedback-message"
            />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>Suite:</span>
            <Field
              type="text"
              name="address.suite"
              placeholder="address suite"
            />
            <ErrorMessage
              name="address.suite"
              component="span"
              className="error-feedback-message"
            />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>City:</span>
            <Field type="text" name="address.city" placeholder="address city" />
            <ErrorMessage
              name="address.city"
              component="span"
              className="error-feedback-message"
            />
          </label>

          <br />

          <label className="user-form-label-container">
            <span>Zipcode:</span>
            <Field
              type="text"
              name="address.zipcode"
              placeholder="address zipcode"
            />
            <ErrorMessage
              name="address.zipcode"
              component="span"
              className="error-feedback-message"
            />
          </label>
        </div>

        <div className="user-form-preview-container">
          <h2 className="user-form-preview-title">Preview</h2>
          {(() => {
            const previewUser = {
              ...values,
              id: values.id ? Number.parseInt(values.id, 10) : -1,
            };
            return <UserPreview user={previewUser} />;
          })()}
        </div>
      </div>

      <div className="user-form-submit-container">
        <button
          type="submit"
          disabled={
            !!errors.id ||
            !!errors.name ||
            !!errors.email ||
            !!errors.phone ||
            isSubmitting
          }
          className="button user-form-button positive-button-color">
          {submitText}
        </button>

        <button
          type="button"
          className="button user-form-button negative-button-color"
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
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={false}>
        {formikCallback}
      </Formik>
    </div>
  );
};

export default UserForm;
