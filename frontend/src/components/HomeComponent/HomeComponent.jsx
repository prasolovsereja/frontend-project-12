import ChannelsList from './ChannelsList/ChannelsList.jsx';
import MessagesBox from './MessageBox.jsx';
import AddChannelComponent from './AddChannelComponent.jsx';

const Home = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <AddChannelComponent />
        <ChannelsList />
      </div>
      <MessagesBox />
    </div>
  </div>
);

export default Home;
