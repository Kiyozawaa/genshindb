import { useState } from 'react';
import { Link } from 'react-router';

function BackButton({to, value}) {
  return (<>
      <Link className='back-button' to={to}>
        ← Back to {value}
      </Link>
  </>)
}

export default BackButton;