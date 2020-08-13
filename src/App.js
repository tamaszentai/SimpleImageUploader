import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState();

  const onFileSelected = (event) => {
    if(event.target.files[0]){
      setFile(event.target.files[0]);
    }
  }

   // Uploading image to Cloud Storage
   const imageUploadHandler = async (event) => {
    event.preventDefault();

    try {
      if (file !== '') {
        // Creating a FormData object
        let fileData = new FormData();

        // Adding the 'image' field and the selected file as value to our FormData object
        // Changing file name to make it unique and avoid potential later overrides
        fileData.set(
          'image',
          file
          // `${Date.now()}-${file.name}`
        );

        await axios({
          method: 'post',
          url: "http://localhost:5000/api/upload",
          data: fileData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
    } catch (error) {
     
    }
  };

  return (
    <div className="App">
      <h1>Simple image uploader to Firebase</h1>
      <form onSubmit={imageUploadHandler}>
        <input type="file" onChange={onFileSelected} />
        <button>Upload</button>
      </form>
    </div>
  );
}

export default App;
