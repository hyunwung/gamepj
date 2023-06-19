import React, { useState, useEffect } from 'react';
import { EditorState , ContentState ,convertToRaw } from 'draft-js';
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
    console.log(modi)
    const [editorState, setEditorState] = React.useState(() =>
      EditorState.createEmpty()
    );
    const navigate = useNavigate();
    const _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState);  // RawDraftContentState JSON
    const [contentState, setContentState] = useState(raw);
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
            resolve(result)
          })
          .catch((error) => {
            console.error('실패:', error);
            reject(error)
          });
        })
    }
    // const onEditorStateChange = (editorState) => {
    //   // editorState에 값 설정
    //   setEditorState(editorState);
    // };
    const postData = async () => {
      if(options[category] === "NONE"){
        Swal.fire({html:"카테고리를 선택해주세요."})
        setSubmit((prev)=>!prev)
      }else{
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
      let html = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(html);
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
          defaultContentState={contentState}
          onContentStateChange={setContentState}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            inline:{inDropdown:false},
            list:{inDropdown:false},
            textAlign:{inDropdown:false},
            link:{inDropdown:false},
            image:{uploadCallback:uploadImageCallBack, alt:{present:true,mandatory:false}}
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