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
      `http://blackbird.estudiogenba.com/wp-json/wp/v2/clients_contact/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  showMoreInfo = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
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
                <span
                  className="name-wrapper"
                  onClick={this.showMoreInfo}
                  style={{ cursor: 'pointer' }}
                >
                  {name}
                </span>{' '}
                <i
                  onClick={this.showMoreInfo}
                  className="fas fa-sort-down text-primary"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times text-primary"
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    fontSize: '24px'
                  }}
                  onClick={this.onDeleteClick.bind(this, id, token, dispatch)}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt mt-1"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'white',
                      fontSize: '18px',
                      marginRight: '1rem'
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
