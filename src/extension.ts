// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-social-linker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('socialLinker.setAlias', async () =>{
		let aliasConfiguration = vscode.workspace.getConfiguration("socialLinker").get('alias', '');
		let alias = await vscode.window.showInputBox({
			prompt: `'Please type in your alias. Leave empty to unset. (Current: ${aliasConfiguration})'`
		});

		// if alias is undefined, it means the user ESC out of the input. Make no changes.
		if(alias === undefined) { return; }
		
		await vscode.workspace.getConfiguration('socialLinker').update('alias', alias === '' ? undefined : alias, true);
		if(alias || alias !== '') {			
			vscode.window.showInformationMessage(`'User alias set to ''${alias}'' '`);
		}
		else {
			vscode.window.showWarningMessage('Alias has been unset.');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('extension.tracking', () => {
		addTracking: (url, event, channel, alias) => {
		  let baseUrl = url || '';
		  if (baseUrl === '') return;
	  
		  const defaultDomains = [
			/(.*\.)?microsoft\.com$/,
			/(.*\.)?msdn\.com$/,
			/(.*\.)?visualstudio\.com$/,
			'www.microsoftevents.com'
		  ];
	  
		  const config = {
			event: event,
			channel: channel,
			alias: alias
		  };
		  let domains = config.domains;
		  if (domains || Array.isArray(domains)) {
			domains = domains.concat(defaultDomains);
		  } else {
			domains = defaultDomains;
		  }
		  config.domains = domains;
		  let shouldAddTrackingInfo = false;
		  if (baseUrl) {
	  
			var re = new RegExp("^(http|https)://", "i");
			if (!re.test(baseUrl)) {
			  baseUrl = `https://${baseUrl}`;
			}
	  
			const uri = new URL(baseUrl);
			for (let i = 0; i < config.domains.length; i++) {
			  let domain = config.domains[i];
			  if (uri.host.match(domain)) {
				shouldAddTrackingInfo = true;
				break;
			  }
			}
	  
			if (shouldAddTrackingInfo) {
			  //remove locale
			  const localeRegex = /^\/\w{2}-\w{2}/g;
			  uri.pathname = uri.pathname.replace(localeRegex, '');
	  
			  baseUrl = uri.toString();
			}
		  }
		  if (shouldAddTrackingInfo) {
			return appendTrackingInfo(config, baseUrl);
		  }
		  return baseUrl;
		}
	  };


}

// this method is called when your extension is deactivated
export function deactivate() {}
