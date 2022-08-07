import axios from 'axios';
import { useState } from 'react';
import {useRouter} from 'next/router';
function Dashboard() {

    const [user,setUser] = useState({
        email: "",
        username: ""
    });
    const {push} = useRouter();

    const getProfile = async () => {
        const res = await axios.get('/api/profile');
        const user = res.data;
        setUser(user);
    }
    const logout = async () => {
        try {
            const res = await axios.post("/api/auth/logout");
            push("/login");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => getProfile()}>Get Profile</button>

      <div>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
      </div>

      <button onClick={()=>logout()}>Logout</button>
    </div>
  );
}
export default Dashboard;