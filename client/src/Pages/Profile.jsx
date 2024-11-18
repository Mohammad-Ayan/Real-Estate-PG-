import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  // Reference to the file input element
  const fileRef = useRef(null);

  // Retrieve the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // State to store the selected file
  const [file, setFile] = useState(undefined);

  // State to track file upload progress percentage
  const [filePerc, setFilePerc] = useState(0);

  // State to track if there was an error during file upload
  const [fileUploadError, setFileUploadError] = useState(false);

  // State to store user profile form data
  const [formData, setFormData] = useState({});

  // Firebase storage rules (for your reference, not part of the actual code)
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  // Trigger file upload when a file is selected
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // Function to handle file upload to Firebase Storage
  const handleFileUpload = (file) => {
    const storage = getStorage(app); // Get Firebase storage instance
    const fileName = new Date().getTime() + file.name; // Generate a unique file name
    const storageRef = ref(storage, fileName); // Reference to the file in Firebase storage
    const uploadTask = uploadBytesResumable(storageRef, file); // Start the file upload

    // Monitor the file upload progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Calculate progress percentage
        setFilePerc(Math.round(progress)); // Update the state with the progress
      },
      (error) => {
        setFileUploadError(true); // Handle any errors during file upload
      },
      () => {
        // Get the download URL once the upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }) // Update the form data with the new avatar URL
        );
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      {/* Page Title */}
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      {/* Profile Form */}
      <form className='flex flex-col gap-4'>
        {/* Hidden file input for selecting images */}
        <input
          onChange={(e) => setFile(e.target.files[0])} // Update file state on selection
          type='file'
          ref={fileRef} // Reference to this input element
          hidden
          accept='image/*' // Restrict file types to images
        />

        {/* Profile Image */}
        <img
          onClick={() => fileRef.current.click()} // Trigger file input click on image click
          src={formData.avatar || currentUser.avatar} // Show uploaded or default avatar
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />

        {/* File Upload Status */}
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        {/* Form Fields */}
        <input
          type='text'
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
        />

        {/* Update Button */}
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          update
        </button>
      </form>

      {/* Actions Section */}
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
}