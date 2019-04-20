import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import FileUpload from '../layout/FileUpload';
import axios from 'axios';

export default class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    description: '',
    errors: {}
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  /*   onChangeImage = e => {
    let files = e.target.files || e.dataTransfer.files;
    console.log('files', files);
    //console.log('e.target.files[0]', e.target.files[0]);
    this.setState({
      imageName: e.target.files[0].name,
      imageFile: e.target.files[0]
    });
  };
 */
  onSubmit = async (dispatch, token, e) => {
    e.preventDefault();
    const { name, email, phone, description } = this.state;

    //Check for errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'phone is required' } });
      return;
    }

    const newContact = {
      title: name,
      status: 'publish',
      fields: {
        description,
        email,
        phone
      }
    };

    const resPost = await axios.post(
      `http://blackbird.estudiogenba.com/wp-json/wp/v2/clients_contact`,
      newContact,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('resPost', resPost);

    const res = {
      name: resPost.data.title.raw,
      id: resPost.data.id,
      description: resPost.data.acf.description,
      email: resPost.data.acf.email,
      phone: resPost.data.acf.phone
    };

    dispatch({
      type: 'ADD_CONTACT',
      payload: res
    });

    this.setState({
      name: '',
      email: '',
      phone: '',
      description: '',
      errors: {}
    });

    // Redirect to home
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, description, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch, token } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch, token)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    type="text"
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Bio"
                    name="description"
                    value={description}
                    type="description"
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    value={email}
                    type="email"
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    type="tel"
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
