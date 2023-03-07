import "./NewEditor.scss";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useRef,useState,useMemo, useEffect} from "react";
import axios from "axios";


const NewEditor = () => {
    const [image,setImage] = useState()
    const [flag, setFlag] = useState(false);
    const [datas,setData] = useState()
    const imgLink = "http://localhost:5000/images/"

    const customUploadAdapter = (loader) => {
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const data = new FormData();
                     loader.file.then( (file) => {
                            data.append("name", file.name);
                            data.append("file", file);

                            axios.post('/', data)
                                .then((res) => {
                                    if(!flag){
                                        setFlag(true);
                                        setImage(res.data.filename);
                                    }
                                    resolve({
                                        default: `${imgLink}/${res.data.filename}`
                                    });
                                })
                                .catch((err)=>reject(err));
                        })
                })
            }
        }
    }

    const uploadPlugin = (editor) => {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }
    //console.log(datas)
    return(
        <CKEditor
        editor={ClassicEditor}
        config={{
            extraPlugins:[uploadPlugin],
            placeholder: '내용을 입력해 주세요.',
        }}
        data=""
        onReady={editor => {
            // console.log('Editor is ready to use!', editor);
        }}
        
        onChange={(event, editor) => {
            const data = editor.getData();
            setData(data)
            console.log(data)
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}>
        </CKEditor>
    )
}

export default NewEditor;