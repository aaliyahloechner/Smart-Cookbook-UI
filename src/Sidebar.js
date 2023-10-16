import React from 'react';

function Sidebar({ user, onClick, setCurrentScreen, displayUserContent }) {
  const handleUserClick = () => {
    // Update the current screen and display user-specific content
    setCurrentScreen(`/user/${user}`);
    displayUserContent(user);

    // Call the onClick function to handle the user click if needed
    onClick(user);
  }

  return (
    <div>
      <a onClick={handleUserClick}>USER {user}</a>
    </div>
  );
}

export default Sidebar;
