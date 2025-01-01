"use client"
import Nav from '@/app/components/profile/Nav';
import Chapter from '@/app/components/write/Chapter';
import { getStory } from '@/app/services/story';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Id = () => {
  const {id} = useParams();
  const [chapters , setChapters] = useState([]);
  const [token  , setToken] = useState('')
  useEffect(()=>{
    const token = localStorage.getItem("token");
    setToken(token);
    const content =async()=>{
      const data = await getStory(token , id);
      if(data?.Message ){
        setChapters(data.Message);
      }
      console.log(data);
    }
    content();
  },[id]);
  return (
    <div className="p-4">
      <Nav/>
        {chapters.length > 0 ? (
            <div className="space-y-4">
                {chapters.map((chapter) => (
                    <Chapter
                        key={chapter._id}
                        id={chapter.storyId}
                        number={chapter.chapterNumber}
                        name={chapter.name}
                        content={chapter.content}
                        token={token}
                    />
                ))}
            </div>
        ) : (
            <p>No chapters created</p>
        )}
    </div>
);
};

export default Id