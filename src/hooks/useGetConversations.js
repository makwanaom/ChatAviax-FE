import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {

                const user = JSON.parse(localStorage.getItem("chat-user"));
				const token = user?.token;

                console.log("Token retrieved:", token);

				if (!token) {
					throw new Error("No token found");
				}



                const res = await fetch("https://chataviax.onrender.com/api/users"  , {
					headers: {
						"Authorization": `Bearer ${token}`
                    }
					});
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};
export default useGetConversations;