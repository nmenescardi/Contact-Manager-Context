import React, { Fragment } from 'react';

const FileUpload = ({ onChange, imageName }) => {
  return (
    <Fragment>
      <div className="custom-file mb-4">
        <input
          type="file"
          className="custom-file-input "
          id="customFile"
          onChange={onChange}
        />
        <label className="custom-file-label" htmlFor="customFile">
          {imageName ? imageName : 'Choose a Image...'}
        </label>
      </div>
    </Fragment>
  );
};

export default FileUpload;
