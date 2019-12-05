// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { URL } from 'url';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-social-linker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

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

	context.subscriptions.push(vscode.commands.registerCommand('extension.tracking', (url: string, event: any, channel: any, alias: any) => {
		  let baseUrl = url || '';
		  if (baseUrl === ''){
			  return
		  };
	  
		  let defaultDomains = [
			/(.*\.)?microsoft\.com$/,
			/(.*\.)?msdn\.com$/,
			/(.*\.)?visualstudio\.com$/,
			/www.microsoftevents.com'/
		  ];
	  
		  const config = {
			event: event,
			channel: channel,
			alias: alias
		  };
		  
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
		}));

	  function appendTrackingInfo(config: { event: any; channel: any; alias: any;}, link: string) {
		const tracking =
		  'WT.mc_id=' + config.event + '-' + config.channel + '-' + config.alias;
		//respect or ignore currect query string
		const separator = link.indexOf('?') > 0 ? '&' : '?';
		//respect or ignore hash
		let hash = '';
		const hasHash = link.indexOf('#');
		if (hasHash != -1) {
		  hash = link.substr(hasHash);
		  link = link.replace(hash, '');
		}
		return link + separator + tracking + hash;
	  }


}

// this method is called when your extension is deactivated
export function deactivate() {}
