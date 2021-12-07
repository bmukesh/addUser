import React, { useState } from 'react';
import AllUser from './AllUser';
import AddUser from './AddUser';

const Index = () => {
  const [selectedOption, setSelectedOption] = useState('All');

  return (
    <div>
      <div className='flex justify-around'>
        <button
          className={`${
            selectedOption === 'All' ? 'text-blue-500' : 'text-gray-500'
          } font-semibold`}
          onClick={() => setSelectedOption('All')}
        >
          All User
        </button>
        <button
          className={`${
            selectedOption === 'Add' ? 'text-blue-500' : 'text-gray-500'
          } font-semibold`}
          onClick={() => setSelectedOption('Add')}
        >
          Add User
        </button>
      </div>
      {selectedOption === 'All' && <AllUser />}
      {selectedOption === 'Add' && <AddUser />}
    </div>
  );
};

export default Index;
