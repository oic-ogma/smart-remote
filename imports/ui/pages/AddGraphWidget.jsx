import React from 'react';
import { Link } from 'react-router';

const AddGraphWidget = () => {
  return (
    <div>
      <ul className='add-button-panel-lists'>
        <li>
          <Link to={ '/my-page/add/graph-widget/temperature' }>
            { i18n.getTranslation('addGraphWidget', 'temperature') }
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AddGraphWidget;
