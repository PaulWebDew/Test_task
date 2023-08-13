import React from 'react';

import UsersTable from '../../components/UsersTable';
import IventsTable from '../../components/IventsTable';

function Main() {
  return (
    <div style={{ display: 'flex' }}>
      <UsersTable />
      <IventsTable />
    </div>
  );
}

export default Main;
