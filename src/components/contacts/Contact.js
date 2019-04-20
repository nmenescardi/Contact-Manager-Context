import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = async (id, token, dispatch) => {
    await axios.delete(
      `http://localhost/blackbird/wp-json/wp/v2/clients_contact/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  render() {
    const { id, name, email, phone, description } = this.props;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch, token } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={() => {
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    });
                  }}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, token, dispatch)}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '0.8rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo && (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                  <li className="list-group-item">
                    Description: {description}
                  </li>
                </ul>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};
