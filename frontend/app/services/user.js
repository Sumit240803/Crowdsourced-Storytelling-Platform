

// services/user.js
export const me = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
    return null; // Return null in case of failure
};


export const createStory = async (title, synopsis, tags, collaborators, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/story`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title: title, synopsis: synopsis, tags: tags, collaborators: collaborators })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const invite = async (storyId, userIds, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/story`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ storyId: storyId, userIds: userIds })
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getInvite = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/invites`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const acceptInvite = async(id ,token)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/accept/${id}`, {
            method : "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

    if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const rejectInvite = async(id ,token)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/reject/${id}`, {
            method : "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

    if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}


export const joinedStories = async(token)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/joined-stories`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const uploadImage = async (token, file) => {
    try {
      // Create a form data object to include the image file
      const formData = new FormData();
      formData.append('image', file); // 'image' should match the key used in the backend route
  
      // Send the image file to the backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Attach the image file
      });
  
      // Handle the response
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const data = await response.json();
      return data.url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Re-throw error for the calling function to handle
    }
  };
  

export const search = async(token , name)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/find?${name}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            return await response.json();
        }
    } catch (error) {
        console.log(error);
    }
}