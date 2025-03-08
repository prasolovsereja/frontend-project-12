import { useState } from 'react';
import ChannelsList from './ChannelsList';
import MessagesBox from './MessageBox';

const Home = () => {

  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
          <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
            <b>Каналы</b>
            <button type='button' className='p-0 text-primary btn btn-group-vertical'>
              <span>+</span>
            </button>
          </div>
          <ChannelsList />
        </div>
        <MessagesBox />
      </div>
    </div>
  );
};
export default Home;