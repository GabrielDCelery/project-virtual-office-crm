import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

const backgroundColors = {
  default: '#fff',
  active: '#eee',
  valid: '#d8e6de'
};

const borderColors = {
  default: '#aaa',
  active: '#999',
  valid: '#3E574A'
};

const DropZoneContainer = styled.div`
  width: 100%;
  height: 5em;
  background: ${props => {
    const { colorType } = props;
    return backgroundColors[colorType];
  }};
  border: 5px dashed
    ${props => {
      const { colorType } = props;
      return borderColors[colorType];
    }};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

const DropZoneInput = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const FormFileUpload = ({
  customFileName,
  handleClearFile,
  handleSetFile,
  selectedFile
}) => {
  const [colorType, setColorType] = useState('default');

  const handleDrop = acceptedFiles => {
    if (acceptedFiles) {
      handleSetFile(acceptedFiles[0]);
      setColorType('valid');
    }
  };

  const handleDragOver = event => {
    console.log(event);
    setColorType('active');
  };
  const handleDragLeave = () => {
    setColorType('default');
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {({ getRootProps, getInputProps }) => {
        return (
          <DropZoneContainer colorType={colorType}>
            <DropZoneInput {...getRootProps()} style={{ outline: 'none' }}>
              <input {...getInputProps()} />
              <div>
                {selectedFile && customFileName ? (
                  <React.Fragment>{customFileName}</React.Fragment>
                ) : (
                  <React.Fragment>
                    Drag 'n' drop some files here, or click to select files
                  </React.Fragment>
                )}
              </div>
            </DropZoneInput>
          </DropZoneContainer>
        );
      }}
    </Dropzone>
  );
};
