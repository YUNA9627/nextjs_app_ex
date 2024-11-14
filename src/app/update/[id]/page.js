"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Update(props) {

  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState([]);
  const [body, setBody] = useState([]);

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id)
    .then(res=>{
      return res.json(); //json->object(객체)
    })
    .then(result=>{
      setTitle(result.title);
      setBody(result.body);
    });
  },[id]) // 클라이언트 컴포넌트에서 데이터 조회

  // const response = await fetch('http://localhost:9999/topic');
  // const topic = await response.json(); 서버형 컴포넌트에서 데이터 조회

  const router = useRouter();
  
  const onSubmit = (e)=>{
    e.preventDefault();
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, body}) // 문자열로 바꿈 (object->json)
    }
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, options)
      .then(res=>res.json()) // 결과를 객체로 변환
      .then(result=>{
        console.log(result)
        router.push(`/read/${result.id}`)
        router.refresh();
      })
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" 
          name="title" 
          value={title} 
          onChange={(e)=>{
            setTitle(e.target.value);
          }}
          />
        </div>
        <div>
          <textarea name="body" 
          placeholder="content" 
          value={body} 
          onChange={(e)=>{
            setBody(e.target.value);
          }}
          ></textarea>
        </div>
        <button type="submit">전송</button>
      </form>
      <hr/>
    </div>
  );
}