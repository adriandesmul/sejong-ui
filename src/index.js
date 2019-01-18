import './style.scss';
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './dynamic/auth/auth';
import SijoEntry from './dynamic/writingEntry/sijoEntry';

// EXTRA IMAGES
import './library/logo_white_nourl.gif';

if (document.getElementById('auth')) ReactDOM.render(<Auth />, document.getElementById('auth'));
if (document.getElementById('sijo')) ReactDOM.render(<SijoEntry />, document.getElementById('sijo'));
