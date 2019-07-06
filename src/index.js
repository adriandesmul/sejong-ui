import './style.scss';
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './dynamic/auth/auth';
import DemographicsEntry from './dynamic/demographics/demographicsEntry';
import SijoEntry from './dynamic/writingEntry/sijoEntry';
import EssayEntry from './dynamic/writingEntry/essayEntry';
import WritingPM from './dynamic/videos/writingPM';
import AdminPanel from './dynamic/admin/adminPanel';
import UserDetailPanel from './dynamic/admin/userDetailPanel';
import MyDropdown from './dynamic/videos/test';
import WinnersWritingTable from './dynamic/past/winnersWriting';

// EXTRA IMAGES
import './library/logo_white_nourl.gif';

if (document.getElementById('auth')) ReactDOM.render(<Auth />, document.getElementById('auth'));
if (document.getElementById('demographics')) ReactDOM.render(<DemographicsEntry />, document.getElementById('demographics'));
if (document.getElementById('sijo')) ReactDOM.render(<SijoEntry />, document.getElementById('sijo'));
if (document.getElementById('essay')) ReactDOM.render(<EssayEntry />, document.getElementById('essay'));
if (document.getElementById('writingPM')) ReactDOM.render(<WritingPM />, document.getElementById('writingPM'));
if (document.getElementById('adminPanel')) ReactDOM.render(<AdminPanel />, document.getElementById('adminPanel'));
if (document.getElementById('userDetailPanel')) ReactDOM.render(<UserDetailPanel />, document.getElementById('userDetailPanel'));
if (document.getElementById('my-dropdown-slidedown')) ReactDOM.render(<MyDropdown />, document.getElementById('my-dropdown-slidedown'));
if (document.getElementById('winnersWritingTable')) ReactDOM.render(<WinnersWritingTable />, document.getElementById('winnersWritingTable'));
