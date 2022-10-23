import React, { useEffect, useState } from 'react';
import Card from './Card';
import Icon from '../components/Icon';
import { parseOfxBody } from '../services/upload';
import {useAppSelector} from '../hooks/hooks';
import {selectLoggedIn} from '../auth/authSlice';
import {useImportTransactionsMutation} from '../api/transactionApi';

const UploadFile = () => {
  const [badFile, setBadFile] = useState(false);
  const [importTransactions, importTransactionResult] = useImportTransactionsMutation();
  
  const loggedIn = useAppSelector(selectLoggedIn);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (badFile) {
      timeout = setTimeout(() => {
        setBadFile(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [badFile]);

  const handleChange = (event: any) => {
    const reader = new FileReader();

    const file: File = event.target.files[0];

    reader.onloadend = () => {
      if (reader.result) {
        sendFile(reader.result);
      } else {
        console.error('Could not send: no file');
      }
    };

    if (file && file.size < 100000 && file.name.endsWith('.ofx')) {
      reader.readAsText(file);
    } else {
      setBadFile(true);
    }
  };

  const sendFile = async (file: string | ArrayBuffer) => {
    if (typeof file !== 'string') {
      file = (file as ArrayBuffer).toString();
    }

    const body = parseOfxBody(file);

    await importTransactions(body);
    
    if (importTransactionResult.isError) {
      setBadFile(true);
    }
  };

  const uploadBar = (
    <label className="w-full h-full cursor-pointer">
      <Icon icon="upload" classes="w-20 mx-auto" />
      <input type="file" className="hidden" onChange={handleChange} />
      <p className="text-center font-semibold">Upload transactions file</p>
    </label>
  );

  const badFileBar = (
    <div className="text-red-400">
      <Icon icon="cross" classes="w-20 mx-auto animate-bounce" />
      <p className="text-center font-bold">Was not able to upload file</p>
    </div>
  );
  
  const isLoadingBar = (
    <div className="text-green-400">
      <Icon icon="upload" classes="w-20 mx-auto animate-bounce" />
      <p className="text-center font-bold">Uploading, please wait</p>
    </div>
  );

  if (!loggedIn) {
    return <Card link={false}>Log in to upload</Card>;
  }
  
  if (importTransactionResult.isLoading) {
    return <Card link={false}>{isLoadingBar}</Card>
  }

  return <Card link={true}>{badFile ? badFileBar : uploadBar}</Card>;
};

export default UploadFile;
