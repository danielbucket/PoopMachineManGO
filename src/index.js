import * as React from 'react'
import * as ReactDOM from 'react-dom/client';
import App from './App'

// Opt-in to Webpack-hot-module-replacements
if (module.hot) module.hot.accept() 

// This approach to sending the 
const element = document.createElement('div')
	element.id = 'root'

ReactDOM.createRoot(
	document.body.appendChild((element))
).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)