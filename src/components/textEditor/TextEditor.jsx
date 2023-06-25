import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import "./TextEditor.scss"
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import "../../assets/Global.scss";

const TextEditor = ({title,category,submit,setSubmit,modi,update,setUpdate,id}) => {    
    const navigate = useNavigate();
    const [editorState, setEditorState] = React.useState(() =>
      EditorState.createEmpty()
    );
    const [image,setImage] = useState(null)
    const [convertedContent, setConvertedContent] = useState(null);
    
    const options = {
      0:'NONE',
      1:'NOTICE',
      2:'EVENT',
      3:'UPDATE',
      4:'DEVELOPER_NOTES',
      5:'BUG',
      6:'GUIDE',
      7:'FAQ'
    }
    const uploadImageCallBack = async (file) =>{
      return new Promise(
        (resolve,reject) => {
          const data = new FormData();
          data.append('image',file)
          fetch('https://api.imgur.com/3/image',{
              method:'POST',
              headers:{'Authorization':process.env.REACT_APP_IMAGE_URL},
              body:data,
              credentials: 'same-origin',
              mode: 'cors',
              cache: 'no-cache', 
              redirect: 'follow',
              referrerPolicy: 'no-referrer', 
          })
          .then((response) => response.json())
          .then((result) => {
            console.log('성공:', result);
            resolve({ data: { link: result.data.link}})
            setImage(result.data.link)
          })
          .catch((error) => {
            console.error('실패:', error);
            reject(error)
          });
        })
    }

    const postData = async () => {
      if(title === null || title === undefined || title === ""){
        Swal.fire({title:"제목을 작성해주세요."})
        setSubmit((prev)=>!prev)
        return
      }
      if(options[category] === "NONE"){
        Swal.fire({title:"카테고리를 선택해주세요."})
        setSubmit((prev)=>!prev)
        return
      }
      if(convertedContent==="<p></p>"){
        Swal.fire({title:"내용을 입력하세요."})
        setSubmit((prev)=>!prev)
        return
      }
      else{
        try{
          const repo = await axios.post('/boards',{
            title : title,
            content:convertedContent,
            type : options[category],
          },{
            headers:{
              'Authorization': 'Bearer '+localStorage.getItem("accessToken")
            }
          })
          if(repo.status === 201){
            Swal.fire({title:"작성이 완료되었습니다."})
            navigate('/main')
          }
        }catch(error){
          console.log(error)
          Swal.fire({icon: 'warning', html:"작성에 실패하였습니다. <br/> 다시 로그인 해주세요."})
          localStorage.removeItem('accessToken')
          localStorage.removeItem('user')
          navigate("/login")
        }
      }
    }
    
    const updateData = async () => {
      try{
        const repo = await axios.patch(`/boards/${id}`,{
          headers:{
            'Authorization': 'Bearer '+localStorage.getItem("accessToken")
        }})
        console.log(repo)
      }catch(error){
        console.log(error)
        Swal.fire({icon: 'warning', html:"로딩에 실패하였습니다. <br/>로그인을 해주세요."})
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        navigate("/login")
      }
    }
    const createMarkup = (html)=> {
      return {
        __html: DOMPurify.sanitize(html)
      }
    }
    
    useEffect(() => {
      let html = convertToHTML({
        entityToHTML: (entity, originalText) => {
          console.log(entity)
          if (entity.type === 'IMAGE') {
            return <img src={image} alt=""></img>
          }
          if (entity.type === 'LINK') {
            return {
                start: `<a href="${entity.data.url}">`,
                end: '</a>',
            }
          }
          return originalText;
        }
      })(editorState.getCurrentContent());
      setConvertedContent(html);
      console.log(html)
    }, [editorState]);

    useEffect(()=>{  
      if(submit === true){
        postData()
      }
    },[submit])
    
    useEffect(()=>{
      if(update === true){
        updateData()
      }
    },[update])
    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            previewImage: true,
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            image:{uploadCallback:uploadImageCallBack, alt:{present:true,mandatory:false}},
          }}
        />
        <div
          className="preview"
          dangerouslySetInnerHTML={createMarkup(convertedContent)}>
        </div>
      </div>
    );
}

export default TextEditor;