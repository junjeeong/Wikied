import { Data } from "@/containers/UserPaginationContainer";

const ProfileList = ({ data }: { data: Data[] }) => {
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <div>
            <div>{user.name} 이름</div>
            <div>
              <div>{user.city} 도시</div>
              <div>{user.job} 직업</div>
            </div>
          </div>
          <div>link</div>
        </li>
      ))}
    </ul>
  );
};

export default ProfileList;
