import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";


const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const user = JSON.parse(localStorage.getItem("chat-user"));
				const token = user?.token;


				console.log("Token retrieved:", token);

				if (!token) {
					throw new Error("No token found");
				}


				const res = await fetch(`https://chataviax.onrender.com/api/messages/${selectedConversation._id}`, {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				});
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;