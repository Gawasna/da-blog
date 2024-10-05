import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Editor() {
	return (
    <CKEditor
      editor={ClassicEditor}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "200px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
    ></CKEditor>
  );
}

export default Editor;