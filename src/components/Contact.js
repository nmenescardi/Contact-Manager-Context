import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Contact extends Component {
  state = {
    showContactInfo: false
  };

  render() {
    const { name, email, phone } = this.props;
    const { showContactInfo } = this.state;
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
          />
        </h4>
        {showContactInfo && (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        )}
      </div>
    );
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};
