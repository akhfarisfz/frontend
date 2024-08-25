import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Document, Page, pdfjs } from 'react-pdf';



const ContentPage = () => {
  const [sections, setSections] = useState([]);
  const [newSectionType, setNewSectionType] = useState('');

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedSections = localStorage.getItem('contentSections');
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  const handleAddSection = () => {
    if (newSectionType) {
      setSections([...sections, { type: newSectionType, content: '' }]);
      setNewSectionType('');
    }
  };

  const handleEditorChange = (index, newContent) => {
    const updatedSections = [...sections];
    updatedSections[index].content = newContent;
    setSections(updatedSections);
  };

  const handleFileChange = (index, e) => {
    const updatedSections = [...sections];
    updatedSections[index].content = e.target.files[0];
    setSections(updatedSections);
  };

  const handleSave = () => {
    // Save the sections to localStorage
    localStorage.setItem('contentSections', JSON.stringify(sections));
    alert('Content saved successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Content Page</h1>

      {/* Dropdown to add section */}
      <div className="mb-4">
        <select
          value={newSectionType}
          onChange={(e) => setNewSectionType(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Select section type</option>
          <option value="text">Editor Text</option>
          <option value="pdf">PDF File</option>
        </select>
        <button
          onClick={handleAddSection}
          className="p-2 bg-blue-500 text-white"
        >
          Add Section
        </button>
      </div>

      {/* Render and edit sections */}
      {sections.map((section, index) => (
        <div key={index} className="my-4">
          {section.type === 'text' && (
            <>
              <JoditEditor
                value={section.content}
                tabIndex={1}
                onBlur={(newContent) => handleEditorChange(index, newContent)}
              />
            </>
          )}
          {section.type === 'pdf' && (
            <>
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                className="border p-2 w-full"
              />
              {section.content && (
                <Document
                  file={URL.createObjectURL(section.content)}
                  onLoadError={console.error}
                >
                  <Page pageNumber={1} />
                </Document>
              )}
            </>
          )}
        </div>
      ))}

      <button onClick={handleSave} className="mt-4 p-2 bg-green-500 text-white">
        Save
      </button>

      {/* Display saved sections */}
      <div className="mt-8">
        <h2 className="text-lg mb-4">Saved Content</h2>
        {sections.map((section, index) => (
          <div key={index} className="my-4 p-4 border rounded">
            {section.type === 'text' && (
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            )}
            {section.type === 'pdf' && section.content && (
              <Document
                file={URL.createObjectURL(section.content)}
                onLoadError={console.error}
              >
                <Page pageNumber={1} />
              </Document>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
