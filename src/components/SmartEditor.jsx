import React, { useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { endpoint } from "../config/endpoinsts";
import { axiosRequest } from "../http/request";
import { toast } from "react-toastify";
export default function SmartEditor({ userInfo, setuserInfo }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const uploadImageCallBack = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);


    const { data } = await axiosRequest.post(
      endpoint.media.single,
      formdata
    );


    toast.success('Uploaded')
    return { data: { link: data?.url } };
  };

  return (
    <>
      <div className="form-group">
        <label>Description</label>
        <Editor
          editorState={editorState}
          onEditorStateChange={(newState) => {
            setEditorState(newState);
            setuserInfo(
              draftToHtml(convertToRaw(newState.getCurrentContent()))
            );
          }}
          toolbar={{
            inline: { inDropdown: false },
            list: { inDropdown: false },
            code: { inDropdown: false },
            textAlign: { inDropdown: false },
            link: { inDropdown: false },
            history: { inDropdown: false },

            image: {
              previewImage: true,
              uploadCallback: (file) => uploadImageCallBack(file),
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
    </>
  );
}

