import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const Editor = ()=> {
const [value, setValue] = useState('');

return <ReactQuill theme="snow" value={value}  placeholder="tell your story..."/>;
}