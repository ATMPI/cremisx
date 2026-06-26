import { useEffect, useState } from "react";
import api from "./api";

function Profile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage("token");
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Profile;
