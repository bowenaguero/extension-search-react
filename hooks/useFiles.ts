import { useState } from 'react';

export function useFiles() {
  const uploadFile = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  };

  return { uploadFile };
}
