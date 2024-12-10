"use client"
import { useAuthStore } from "../store";



const Home = () => {
  const {user} = useAuthStore()
  
  return (
    <div className="py-4">
      <h1 className="text-xl text-gray-400 ">Hello</h1>
      <h1 className="text-xl ">Chef <b className="text-cream-1"> {user?.name} </b></h1>
    </div>
  );
};

export default Home;