import { camelCase, upperFirst } from 'lodash-es';

/*
  Todos Elementos HTML que possuem interação com usuário (p.e. botões e inputs) devem ter
  id para que possam ser selecionados nos testes end-to-end.

  1. Os ids devem sempre possuir um prefixo que denote o tipo do componente e valor que
  segue o prefixo dever ser em camelCase com a primeira letra em maiúsculo: buttonSave,
  controlSearch, etc.

  2. Sempre que possível, o nome deve ser derivado automáticamente de da propriedade
  obrigatória 'field' do componente. Ver aplicação prática no componente ButtonBase.

  3. Se o componente for utilizado várias vezes com o mesmo label (por exemplo,
  botão editar na listagem de gestores), disponibilizar uma propriedade exclusiva que
  possa acompanhar o índice do loop e ser usada como sufixo do id de cada botão:
  buttonEdit0, buttonEdit1...
*/

export function genarateId (...rest) {
  return rest.map((word, i) => i === 0
    ? camelCase(word)
    : upperFirst(camelCase(word))
  ).join('');
};
