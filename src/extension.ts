import * as vscode from "vscode";
import { encode, decode } from "./encrypt";
import { random } from "./random";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Base58" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("base58.encode", () => {
      const e = vscode.window.activeTextEditor;
      if (e) {
        const d = e?.document;
        const sel = e?.selections;
        base58Encode(e, d, sel);
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("base58.decode", () => {
      const e = vscode.window.activeTextEditor;
      if (e) {
        const d = e?.document;
        const sel = e?.selections;
        base58Decode(e, d, sel);
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("base58.random", () => {
      const e = vscode.window.activeTextEditor;
      if (e) {
        const d = e?.document;
        const sel = e?.selections;
        base58Random(e, d, sel);
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

function base58Encode(
  e: vscode.TextEditor,
  d: vscode.TextDocument,
  sel: vscode.Selection[]
) {
  e.edit((edit) => {
    sel.forEach((s) => {
      const str: string = d.getText(new vscode.Range(s.start, s.end));
      if (isNumber(str)) {
        edit.replace(s, encode(+str));
      }
    });
  });
}

function base58Decode(
  e: vscode.TextEditor,
  d: vscode.TextDocument,
  sel: vscode.Selection[]
) {
  e.edit((edit) => {
    sel.forEach((s) => {
      const str: string = d.getText(new vscode.Range(s.start, s.end));
      if (isBase58(str)) {
        edit.replace(s, `${decode(str)}`);
      }
    });
  });
}

function base58Random(
  e: vscode.TextEditor,
  d: vscode.TextDocument,
  sel: vscode.Selection[]
) {
  e.edit((edit) => {
    sel.forEach((s) => {
      edit.replace(s, random());
    });
  });
}

function isNumber(str: string): boolean {
  return !/\D/.test(str);
}

function isBase58(str: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]*$/.test(str);
}
