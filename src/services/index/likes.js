import axios from "axios";

export const likesCount = async ({ slug, token }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    await axios.put(`http://localhost:5000/api/posts/${slug}/likes`, {}, config);
};
