require('./styles/main.scss');

import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './components/app.tsx';

ReactDom.render(<App />, document.getElementById('app'));


