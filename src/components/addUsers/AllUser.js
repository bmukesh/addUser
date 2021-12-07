import React, { useState, useEffect } from 'react';

const AllUser = () => {
  const [search, setSearch] = useState('');
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const [myuser, setMyuser] = useState(users);
  const removeUser = (email) => {
    const newUser = myuser.filter((user) => {
      return user.email !== email;
    });
    localStorage.setItem('users', JSON.stringify(newUser));
    setMyuser(newUser);
  };
  useEffect(() => {
    setMyuser(users);
    if (search.length > 2) {
      const filteredUser = users.filter((user) => {
        return (
          user.name.includes(search) ||
          user.email.includes(search) ||
          user.designation.includes(search)
        );
      });
      setMyuser(filteredUser);
    }
  }, [search]);

  return (
    <div>
      <div className='m-4 ml-10'>
        <input
          className='w-1/2 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          type='text'
          onChange={(event) => setSearch(event.target.value)}
          placeholder='Search User...'
        />
      </div>
      <div className='grid grid-cols-1  md:grid-cols-2 gap-8'>
        {myuser.length > 0 &&
          myuser.map((user, index) => {
            return (
              <div key={index} className='border-2 rounded m-2 p-2'>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.designation}</p>
                <button
                  className='p-2 text-sm text-blue-600 rounded hover:bg-red-500 hover:text-white transition 300ms ease-in-out'
                  onClick={() => removeUser(user.email)}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllUser;
