import React, { useState, useEffect } from 'react';
import userData from '../mocked_DB/users.json'

function UserStatus() {
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch('/api/user')
//       .then(response => response.json())
//       .then(data => setUser(data));
//   }, []);

// Temporary mocked data
useEffect(() => {
    // Вместо реального запроса мы используем мокированные данные
    setUser(userData); // Задаем данные из файла в состояние
  }, []); // Пустой массив зависимостей — загрузка данных только один раз при монтировании
// End of calling temporary data

   if (!user) {
     return <div>Loading the user data...</div>;
   }

  return (
    <div>
      <h2>User data is here:</h2>
      <p>Name: {user[0].userName}</p>
      <p>Email: {user[0].email}</p>
      <p>UserStatus: {user[0].status}</p>
      <p>Role: {user[0].role}</p>
    </div>
  );

// Returns the hole list of users
//   return (
//     <div>
//       <h2>Список пользователей</h2>
//       {users.map((user, index) => (
//         <div key={index}>
//           <p><strong>Имя:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//         </div>
//       ))}
//     </div>
//   );


}

export default UserStatus;
