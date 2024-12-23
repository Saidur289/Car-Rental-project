import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone({setImage}) {
    const onDrop = useCallback((acceptedFiles) => {
        // We assume only one file will be accepted (multiple: false)
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file)); // Create an object URL for the image
      }, []);
  const dropzoneOptions = {
    accept: "image/png, image/jpeg, image/gif", // Accept only image files
    multiple: false, // Don't allow multiple file uploads
    onDrop
  };
  const {getRootProps, getInputProps} = useDropzone(dropzoneOptions)

  return (
    <div
    {...getRootProps()}
    style={{
      border: "2px dashed #cccccc",
      padding: "20px",
      borderRadius: "10px",
      cursor: "pointer",
    }}
  >
  <input {...getInputProps()} className="input input-bordered" />
 
      <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
  )
}
export default MyDropzone