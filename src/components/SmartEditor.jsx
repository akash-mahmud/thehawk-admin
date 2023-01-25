import React, { useEffect, useState } from "react";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { endpoint } from "../config/endpoinsts";
import { axiosRequest } from "../http/request";
import { toast } from "react-toastify";
import htmlToDraft from "html-to-draftjs";
export default function SmartEditor({ userInfo, setuserInfo, data }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
useEffect(() => {
  if (data) {

    setuserInfo(data)
    const Desc = htmlToDraft(data);

    let descState = ContentState.createFromBlockArray(
      Desc.contentBlocks,
      Desc.entityMap
    );

    setEditorState(EditorState.createWithContent(descState));
}
}, [data])

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
        <Editor editorClassName="h-32	"
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

