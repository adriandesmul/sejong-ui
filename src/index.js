import _ from 'lodash';
//import 'froala-design-blocks';
import './style.scss';
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './dynamic/auth/auth';
import SijoEntry from './dynamic/writingEntry/sijoEntry';

if (document.getElementById('auth')) ReactDOM.render(<Auth />, document.getElementById('auth'));
if (document.getElementById('sijo')) ReactDOM.render(<SijoEntry />, document.getElementById('sijo'));
