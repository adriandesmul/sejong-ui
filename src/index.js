import './style.scss';
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './dynamic/auth/auth';
import SijoEntry from './dynamic/writingEntry/sijoEntry';
import WritingPM from './dynamic/videos/writingPM';
import MyDropdown from './dynamic/videos/test';

// EXTRA IMAGES
import './library/logo_white_nourl.gif';

if (document.getElementById('auth')) ReactDOM.render(<Auth />, document.getElementById('auth'));
if (document.getElementById('sijo')) ReactDOM.render(<SijoEntry />, document.getElementById('sijo'));
if (document.getElementById('writingPM')) ReactDOM.render(<WritingPM />, document.getElementById('writingPM'));
if (document.getElementById('my-dropdown-slidedown')) ReactDOM.render(<MyDropdown />, document.getElementByClass('my-dropdown-slidedown'));
