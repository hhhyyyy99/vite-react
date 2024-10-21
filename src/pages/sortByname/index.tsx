import { sortByKey } from '@/utils/sortByName';
import { Header } from '../../components/Header';
import friendList from './json/friends.json'
import { FriendProfile } from './types';
export default function SortByName() {

  const sortedList = sortByKey(friendList,getName)
  console.log(sortedList);
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div className='flex flex-col gap-2'>
          {
            sortedList.map(friend=>{
              return (
                <p>{getName(friend)}</p>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

function getName(friend: FriendProfile) {
  return friend.friend_profile_remark || friend.friend_profile_user_profile.user_profile_nick_name;
}
