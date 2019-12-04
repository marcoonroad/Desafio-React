import React from 'react';
import {Formik, FormikProps} from 'formik';
import {View, Button, Text, Alert, TextInput, Dimensions} from 'react-native';
import * as yup from 'yup';
import {useNavigation} from 'react-navigation-hooks';
import {IUser} from '../store/types';

interface IUserForm {
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

const Form: React.FC<IUserForm> = ({user, otherUserIds, handleUserSubmit}) => {
  const {goBack} = useNavigation();
  const {width} = Dimensions.get('window');

  const styles = {
    formLabelContainer: {
      marginTop: width * 0.015,
      marginBottom: width * 0.015,
      width: width * 0.4,
      height: width * 0.25,
    },
    formGroup: {
      width: width * 0.5,
      paddingHorizontal: width * 0.05,
    },
    formTextInput: {
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1,
      borderRadius: 0,
    },
  };

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
      await Alert.alert('Très bien!', modalText);
      options.setSubmitting(false);
      goBack();
    } catch (reason) {
      console.error(reason);
      // FIXME: provide a different and helpful message in production
      await Alert.alert(
        'Test/mock error',
        'This is an automatically generated error to test the app in development mode, please try again later',
      );
    }
  };

  const handleCancel = (event: any) => {
    event.preventDefault();
    goBack();
  };

  const formikCallback = ({
    isSubmitting,
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
  }: FormikProps<IUserData>) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.05,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={styles.formGroup}>
          <View style={styles.formLabelContainer}>
            <Text>Identifier:</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="identifier"
              value={values.id}
              onChangeText={handleChange('id')}
              onBlur={handleBlur('id')}
            />
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                display: errors.id && touched.id ? 'flex' : 'none',
              }}>
              {errors.id}
            </Text>
          </View>

          <View style={styles.formLabelContainer}>
            <Text>Full name:</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="nome do usuário"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                display: errors.name && touched.name ? 'flex' : 'none',
              }}>
              {errors.name}
            </Text>
          </View>

          <View style={styles.formLabelContainer}>
            <Text>E-mail:</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                display: errors.email && touched.email ? 'flex' : 'none',
              }}>
              {errors.email}
            </Text>
          </View>

          <View style={styles.formLabelContainer}>
            <Text>Phone number:</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="(00) 00000-0000"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
            />
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                display: errors.phone && touched.phone ? 'flex' : 'none',
              }}>
              {errors.phone}
            </Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.formLabelContainer}>
            <Text>Street:</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="address street"
              value={values.address.street}
              onChangeText={handleChange('address.street')}
              onBlur={handleBlur('address.street')}
            />
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                display:
                  errors.address &&
                  errors.address.street &&
                  touched.address &&
                  touched.address.street
                    ? 'flex'
                    : 'none',
              }}>
              {errors.address && errors.address.street}
            </Text>
          </View>

          <View style={styles.formLabelContainer}>
            <Text>Suite:</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="address suite"
              value={values.address.suite}
              onChangeText={handleChange('address.suite')}
              onBlur={handleBlur('address.suite')}
            />
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                display:
                  errors.address &&
                  errors.address.suite &&
                  touched.address &&
                  touched.address.suite
                    ? 'flex'
                    : 'none',
              }}>
              {errors.address && errors.address.suite}
            </Text>
          </View>

          <View style={styles.formLabelContainer}>
            <Text>City:</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="address city"
              value={values.address.city}
              onChangeText={handleChange('address.city')}
              onBlur={handleBlur('address.city')}
            />
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                display:
                  errors.address &&
                  errors.address.city &&
                  touched.address &&
                  touched.address.city
                    ? 'flex'
                    : 'none',
              }}>
              {errors.address && errors.address.city}
            </Text>
          </View>

          <View style={styles.formLabelContainer}>
            <Text>Zipcode:</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder="address zipcode"
              value={values.address.zipcode}
              onChangeText={handleChange('address.zipcode')}
              onBlur={handleBlur('address.zipcode')}
            />
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                display:
                  errors.address &&
                  errors.address.zipcode &&
                  touched.address &&
                  touched.address.zipcode
                    ? 'flex'
                    : 'none',
              }}>
              {errors.address && errors.address.zipcode}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: width,
          backgroundColor: '#ffffff',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: width * 0.05,
          marginTop: width * 0.05,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: width * 0.3,
            marginRight: width * 0.025,
          }}>
          <Button
            title={submitText}
            onPress={handleSubmit}
            color="#4f5d73"
            disabled={
              !!errors.id ||
              !!errors.name ||
              !!errors.email ||
              !!errors.phone ||
              isSubmitting
            }
          />
        </View>

        <View
          style={{
            width: width * 0.3,
            marginLeft: width * 0.025,
          }}>
          <Button title="Cancel" onPress={handleCancel} color="#777777" />
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Formik
        initialValues={initialState}
        validate={validation}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={false}>
        {formikCallback}
      </Formik>
    </View>
  );
};

export default Form;
