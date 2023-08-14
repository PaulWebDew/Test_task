import React from 'react';

import UsersTable from '../../components/UsersTable';
import EventsTable from '../../components/EventsTable';

function Main() {
  return (
    <div style={{ display: 'flex' }}>
      <UsersTable />
      <EventsTable />
    </div>
  );
}

export default Main;
