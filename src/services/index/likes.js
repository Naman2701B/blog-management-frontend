import axios from "axios";

export const likesCount = async ({ slug, token }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    await axios.put(`https://blog-management-backend.vercel.app/api/posts/${slug}/likes`, {}, config);
};
