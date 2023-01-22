import './App.css';
import { useFirestore } from './hooks/useFirestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCopy, faPlus } from '@fortawesome/free-solid-svg-icons';
import useWindowDimensions from './hooks/useWindowDimensions';
import { firestore, timestamp } from './firebase/config';
import { useState } from 'react';
import validator from 'validator';

function App() {
  const { docs: urls } = useFirestore('urls');
  const { width } = useWindowDimensions();
  const [short, setShort] = useState('');
  const [full, setFull] = useState('');

  const deleteUrl = (id: string) => {
    firestore.collection('urls').doc(id).delete();
  };
  const addUrl = () => {
    if (validator.isURL(full)) {
      firestore
        .collection('urls')
        .add({ short: short ? short : shortId(), full, added: timestamp() });
      setFull('');
      setShort('');
    }
  };

  const shortId = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <main className='container'>
      <div className='d-flex mt-5 mb-4 border form-group'>
        <input
          placeholder='bzf03a'
          value={short}
          className='w-25'
          onChange={(e) => setShort(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') addUrl();
          }}
        />
        <input
          placeholder='https://example.com'
          value={full}
          className='w-75'
          onChange={(e) => setFull(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') addUrl();
          }}
        />
        <button className='btn btn-dark p-2' onClick={addUrl}>
          <FontAwesomeIcon icon={faPlus} className='align-middle' />
        </button>
      </div>
      <table className='table table-striped table-dark table-bordered'>
        <tbody>
          {urls &&
            urls.map(({ id, short, full }) => (
              <tr key={id} className='d-flex justify-content-between'>
                <td className='d-flex justify-content-between w-25'>
                  <span>{short.substring(0, 10)}</span>
                  <button className='btn text-white p-0'>
                    <FontAwesomeIcon
                      icon={faCopy}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/${short}`,
                        );
                      }}
                    />
                  </button>
                </td>
                <td className='w-75 text-truncate'>
                  <span>{full}</span>
                </td>
                <td className='text-center'>
                  <button className='btn text-white p-0'>
                    <FontAwesomeIcon
                      icon={faClose}
                      className='align-middle'
                      onClick={() => {
                        deleteUrl(id);
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
