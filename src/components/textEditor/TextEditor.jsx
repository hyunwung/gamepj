import React, { useState, useEffect } from 'react';
import { EditorState , ContentState ,convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import "./TextEditor.scss"
import axios from 'axios';

const TextEditor = () => {
    const [editorState, setEditorState] = React.useState(() =>
      EditorState.createEmpty()
    );
    const editor = React.useRef(null);
    const _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState);  // RawDraftContentState JSON
    const [contentState, setContentState] = useState(raw);


    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
      let html = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(html);
    }, [editorState]);

    const uploadImageCallBack = async (file) =>{
      return new Promise(
        (resolve,reject) => {
          const data = new FormData();
          data.append('image',file)
          
          fetch('https://api.imgur.com/3/image',{
              method:'POST',
              headers:{'Authorization':'Client-ID 85b5a4be79665d6'},
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
    const onEditorStateChange = (editorState) => {
      // editorState에 값 설정
      setEditorState(editorState);
    };
    const postData = async () => {
      try{
        await axios.post(`/`,{
          // title : title,
          // content : draftToHtml(convertToRaw(editorState.getCurrentContent())),
          // type : category,
        })
      }catch(error){
        console.log(error)
      }
    }

    const createMarkup = (html)=> {
      console.log(html)
      return {
        __html: DOMPurify.sanitize(html)
      }
    }
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