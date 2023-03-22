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

const TextEditor = ({title,category,submit,setSubmit}) => {
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
            inline:{inDropdown:true},
            list:{inDropdown:true},
            textAlign:{inDropdown:true},
            link:{inDropdown:true},
            history:{inDropdown:true},
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