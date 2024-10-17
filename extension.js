const vscode = require('vscode'); //импорт модуля vscode

function activate(context) { //функция активации расширения, получающая на вход выделенный текст
    let disposable = vscode.commands.registerCommand('extension88.copyWithoutComments', async () => { //регистрация команды и связка с
                                                                                                      //функцией, которую она будет выполнять
        const editor = vscode.window.activeTextEditor; //получение текущего активного редактора
        const selection = editor.selection; //получение выделения
        const selectedText = editor.document.getText(selection); //извлечение выделенного текста
        const cleanedText = removeComments(selectedText); //удаление комментариев
        await vscode.env.clipboard.writeText(cleanedText); //запись очищенного текста в буфер обмена с ожиданием завершения
    });
    context.subscriptions.push(disposable); //добавление команды в список подписок контекста
}

function removeComments(text) {
    return text.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '').trim(); //чистка кода регулярным выражением
}

function deactivate() {} //функция деактивации расширения

module.exports = { //экспорт функций
    activate,
    deactivate
};
