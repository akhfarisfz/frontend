import React, { useState, useCallback } from 'react';
import JoditEditor from 'jodit-react';

const Editor = () => {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  // Handle content change
  const handleTextChange = useCallback((content) => {
    setText(content);
  }, []);

  // Save content when SAVE button is clicked
  const handleSave = () => {
    console.log("Saved Content HTML: ", text); // Debugging: Log HTML content
    setSavedText(text);
  };

  // Editor configuration
  const editorConfig = {
    uploader: {
      insertImageAsBase64URI: true,
    },
    editor: {
      allowedContent: true,  // Allow all content including <iframe> for videos
    },
  };

  return (
    <div>
      <JoditEditor
        value={text}
        onChange={handleTextChange}
        config={editorConfig}
      />
      <div style={{ marginTop: 20 }}>
        <button onClick={handleSave}>SAVE</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <h3>Saved Content:</h3>
        <div
          style={{ border: '1px solid #ddd', padding: 10 }}
          dangerouslySetInnerHTML={{ __html: savedText }}
        />
      </div>
    </div>
  );
};

export default Editor;
