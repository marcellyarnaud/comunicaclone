// JavaScript Document

//Aplicar controle de digitação em componenetes de classes específicas
export var dateFormat = {
		format: 'YYYY-MM-DD',
		singleDatePicker: true,
        opens: 'left',
		drops: 'up', //Abre para cima.
		showDropdowns: true,
		timeZone: 0,
		momentMask : 'DD/MM/YYYY',
        locale: {
            applyLabel: 'Ok',
            cancelLabel: 'Cancelar',
            fromLabel: 'De',
            toLabel: 'Até',
            customRangeLabel: 'Personalizar',
            daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            monthNames: ['Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        }
};

// Validadores
export function validaCPF(campo) {
	var Ok = true;
	var texto = new String(campo).trim();

	if (texto) {
		var cpf = texto.replace(/[^0-9\s]/g, "");

		if (cpf.length == 11) {
		    var Soma;
		    var Resto;
		    Soma = 0;
		    if (cpf == "00000000000")
		    	Ok = false;
		    for (let i=1; i<=9; i++)
			Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
		    Resto = (Soma * 10) % 11;
		    if ((Resto == 10) || (Resto == 11))
			Resto = 0;
		    if (Resto != parseInt(cpf.substring(9, 10)) )
		    	Ok = false;
			Soma = 0;
		    for (let i = 1; i <= 10; i++)
		       Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
		    Resto = (Soma * 10) % 11;
		    if ((Resto == 10) || (Resto == 11))
		    	Resto = 0;
		    if (Resto != parseInt(cpf.substring(10, 11) ) )
		        Ok = false;

		} else {
			Ok = false;
		}
	}

    return Ok;
}

export function validaCNPJ(campo) {
	var Ok = true;
	var texto = new String(campo).trim();

	if (texto) {
		var cnpj = texto.replace(/[^0-9\s]/g, "");

		if (cnpj.length == 14) {
		    // Elimina CNPJs invalidos conhecidos
		    if (cnpj == "00000000000000" ||
		        cnpj == "11111111111111" ||
		        cnpj == "22222222222222" ||
		        cnpj == "33333333333333" ||
		        cnpj == "44444444444444" ||
		        cnpj == "55555555555555" ||
		        cnpj == "66666666666666" ||
		        cnpj == "77777777777777" ||
		        cnpj == "88888888888888" ||
		        cnpj == "99999999999999")
		    	Ok = false;

		    // Valida DVs
		    tamanho = cnpj.length - 2
		    numeros = cnpj.substring(0,tamanho);
		    digitos = cnpj.substring(tamanho);
		    soma = 0;
		    pos = tamanho - 7;
		    for (let i = tamanho; i >= 1; i--) {
		      soma += numeros.charAt(tamanho - i) * pos--;
		      if (pos < 2)
		            pos = 9;
		    }
		    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		    if (resultado != digitos.charAt(0))
		        Ok = false;

		    tamanho = tamanho + 1;
		    numeros = cnpj.substring(0,tamanho);
		    soma = 0;
		    pos = tamanho - 7;
		    for (let i = tamanho; i >= 1; i--) {
		      soma += numeros.charAt(tamanho - i) * pos--;
		      if (pos < 2)
		            pos = 9;
		    }
		    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		    if (resultado != digitos.charAt(1))
		          Ok = false;
		} else {
			Ok = false;
		}
	}

    return Ok;
}

export function validaTelefone(campo) {
	var Ok = true;
	var texto = new String(campo).trim();

	if (texto) {
		var telefone = texto.replace(/[^0-9]/g, "");

		if (!((telefone.length == 10) || (telefone.length == 11)))
			Ok = false;

	} else {
		Ok = false;
	}

    return Ok;
}

export function validaEmail(campo) {
	var Ok = true;
	var texto = new String(campo).trim();

	if (texto) {
	    var teste = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    Ok = teste.test(texto);
	}
	return Ok;
}

export function validaData(campo, omitirNotificacao) {
	var Ok = true;
	var input = getInput(campo);
	var texto = somenteNumeros(input.val().trim());
	var nomeCampo = input.attr('name');

	if (texto) {
	    if (texto.length == 8) {
		    var dia = texto.substring(0,2);
		    var mes = texto.substring(2,4);
		    var ano = texto.substring(4,8);

		    //Criando um objeto Date usando os valores ano, mes e dia.
		    var novaData = new Date(ano,(mes-1),dia, 11); // 11 = prevenir DLS
		    var mesmoDia = parseInt(dia,10) == parseInt(novaData.getDate());
		    var mesmoMes = parseInt(mes,10) == parseInt(novaData.getMonth())+1;
		    var mesmoAno = parseInt(ano) == parseInt(novaData.getFullYear());

		    if (!((mesmoDia) && (mesmoMes) && (mesmoAno)))
		        Ok = false;
	    } else
	    	Ok = false;

		if (!Ok && !omitirNotificacao) {
			notificaErro(campo, "ER0026", nomeCampo);
		}
	}
	return Ok;
}

export function validaIP(campo) {
	var Ok = true;
	var input = getInput(campo);
	var texto = input.val().trim();
	var nomeCampo = input.attr('name');

	if (texto) {
	    var teste = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	    Ok = teste.test(texto);

		if (!Ok) {
			notificaErro(campo, 'ER0001', nomeCampo);
		}
	}
	return Ok;
}

//Formatações
export function formataTelefone(valor) {
	if (valor) {
		if (valor.length == 10)
			return valor.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
		else if (valor.length == 11)
			return valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
		else
			return null;
	}
	else return null;
}

export function nuloEmVazio(valor) {
	var saida = null;
    /*
	if (valor && (typeof valor) == 'string') {
		saida = valor.trim();
	}
    */
    saida = (typeof valor) == 'string' ? valor.trim() : valor;
	if (saida === undefined || saida === '')
		return null; //Retorna null para valores em branco.
	else
		return saida;
}

export function zerosAEsquerda(valor, size) {
    var texto = '' + valor;
    while (texto.length < size) {
        texto = '0' + texto;
    }
    return texto;
}

export function removeZerosADireita(valor) {
	if (valor === null) return null; 
    var texto = '' + valor;
    var continuar = texto.indexOf(',') > -1;
    while (continuar && texto.length > 0) {
        var char = texto.charAt(texto.length - 1);
        continuar = char == '0';
        if (continuar || char == ',' || char == '.') {
            if (texto.length > 1)
                texto = texto.substr(0, texto.length - 1);
            else {
                continuar = false;
                texto = '0';
            }
        }
    }
    return texto;
}

//Formata um valor numérico para o formato 9,99
//Argumentos: n = número, c = casas decimais, d = separador decimal, t = separador de milhar 
export function formataNumero(n, c, d, t) {
	if (n === null) return null;
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d == undefined ? "," : d;
    t = t == undefined ? "." : t;
    var s = n < 0 ? "-" : "";
    var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    var j = (i.length) > 3 ? i.length % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

export function formataMoeda(n, r) {
	if (n !== null && n != undefined) {
		r = r == undefined ? 'R$ ' : r;
		var valor = formataNumero(n);
		return r + valor;
	} else return null;
};

 export function formataMoedaSemCifrao(n) {
        return formataMoeda(n, '');

 };
export function replaceAll(texto, de, para) {
	//String.replaceAll não é compatível com versões anteriores à 85 do Chrome.
	while (texto.indexOf(de) != -1) texto = texto.replace(de, para);
	return texto;
}

export function convertStringToReal(texto, casas) {
	if (texto) {
		texto = replaceAll(texto, '.', '');
		texto = texto.replace(',','.').replace('R$', '').trim();
		var valor = parseFloat(texto);
		if (casas === null || casas === undefined) {
			return valor
		} else {
			return convertStringToReal(formataNumero(valor, casas));
		}
	} else {
		return null;
	}
}

export function convertRealToString(realValue, casas = 3) {
	if (realValue) {
		var texto = '0';
		texto = formataNumero(realValue, casas, ',', '');
		return removeZerosADireita(texto);
	} else {
		return null;
	}
}

export function formataPercentual(n, c) {
	if (n !== null) {
		var valor = removeZerosADireita(formataNumero(n, c));
		return valor + '%';
	} else return null;
 };

export function doisDigitos(valor) {return zerosAEsquerda(valor, 2);}

export function converteDateToString(date, comHora, formato) {
	let hora = '';
	if (comHora) hora = ' ' + doisDigitos(date.getHours()) + ':' + doisDigitos(date.getMinutes());

	if (!formato) formato = dateFormat.momentMask;
	if (formato == 'DD/MM/YYYY')
		return doisDigitos(date.getDate()) + '/' + doisDigitos(date.getMonth() + 1) + '/' + date.getFullYear() + hora;
	else if (formato == 'YYYY-MM-DD')
		return date.getFullYear() + '-' + doisDigitos(date.getMonth() + 1) + '-' + doisDigitos(date.getDate()) + hora;
	else
		return date.toDateString() + hora;
}

export function getHoje(formato) {
    return converteDateToString(new Date, false, formato);
}

export function compararDatas(dataInicio, dataFim) {
	if (dataInicio && dataFim) {
		var strDataInicio = somenteNumeros(dataInicio).replace(/^(\d{2})(\d{2})(\d{4}).*/, '$3-$2-$1');
		var strDataFim = somenteNumeros(dataFim).replace(/^(\d{2})(\d{2})(\d{4}).*/, '$3-$2-$1');
		if (strDataInicio == strDataFim)
			return 0;
		else if (strDataInicio > strDataFim)
			return 1;
		else
			return -1;
	} else
		return 0;
}

export function converteDataToDate(data, formato) {
	if (data) {
		if (!formato) formato = dateFormat.momentMask;
		var split = formato.indexOf('/') > -1 ? '/' : '-';

		//Separa data e hora.
		var dataHora = [data]
		if (split == '/') dataHora = data.split('-');
		if (dataHora.length == 1) {
			dataHora = dataHora[0].trim().split(' ');
		}
		var hora = null;
		if (dataHora.length > 1) {
			//Se possui hora, extrair
			var textoHora = dataHora[1].split('.');
			hora = textoHora[0].trim().split(':');
			hora[0] = parseInt(hora[0]);
			hora[1] = parseInt(hora[1]);
			hora[2] = (!hora[2]) ? 0 : parseInt(hora[2]);
		} else {
			hora = [0, 0, 0];
		}
		var valores = dataHora[0].trim().split(split);

		var dataArray = [];
		if (formato == 'DD/MM/YYYY' || formato == 'DD-MM-YYYY'){
			//Formato BR
			dataArray[0] = parseInt(valores[2]);
			dataArray[1] = parseInt(valores[1]) - 1; //O mês vai de 0 a 11.
			dataArray[2] = parseInt(valores[0]);
		} else {
			//Outros formatos
			dataArray[0] = parseInt(valores[0]);
			dataArray[1] = parseInt(valores[1]) - 1; //O mês vai de 0 a 11.
			dataArray[2] = parseInt(valores[2]);
		}
		return new Date(dataArray[0], dataArray[1], dataArray[2], hora[0], hora[1], hora[2], 0);
	} else
		return null;
}

export function diferencaDatas(dataInicio, dataFim) {
    var inicio = converteDataToDate(dataInicio);
    var fim = converteDataToDate(dataFim);
    var diffMilissegundos = fim - inicio;
    var diffSegundos = diffMilissegundos / 1000;
    var diffMinutos = diffSegundos / 60;
    var diffHoras = diffMinutos / 60;
    var diffDias = diffHoras / 24;
    var diffMeses = diffDias / 30;
    return {
        milisegundos: Math.floor(diffMilissegundos),
        segundos: Math.floor(diffSegundos),
        minutos: Math.floor(diffMinutos),
        horas: Math.floor(diffHoras),
        dias: Math.floor(diffDias)
    }
}

export function dateStringToTimestamp(data, formato) {
    if (data)
		return converteDataToDate(data, formato).valueOf();
	else
		return null;
}

export function timestampToDateString(timestamp, formato) {
	if (timestamp) {
		const date = new Date(timestamp);
		return converteDateToString(date, false, formato).valueOf();
	} else {
		return null;
	}
}

export function timestampHoraToDateString(timestamp, formato) {
	if (timestamp) {
		const date = new Date(timestamp);
		return converteDateToString(date, true, formato).valueOf();
	} else {
		return null;
	}
}

// Dado uma data retorna o primeiro dia do mês
export function primeiroDiaMes(data) {
	if (data) {
		var nums = somenteNumeros(data);
		if (nums) return nums.replace(/^(\d{2})(\d{2})(\d{4}).*/, '01/$2/$3');
	}
	return null;
}

// Dado uma data retorna o último dia do mês
export function ultimoDiaMes(data) {
	if (data) {
		var nums = somenteNumeros(data);
		if (nums){ 
			mes = nums.substring(2,4);
			ano = nums.substring(4,8);
			date = new Date(ano, parseInt(mes), 0);
			var retorno=''
			return retorno.concat(date.getDate() + '/' +
			 zerosAEsquerda((date.getMonth()+1), 2) + '/' + 
			 date.getFullYear());
		}
	}
	return null;
}

export function formataData(data) {
	if (data) {
		//var possuiHora = (data.length > 10 && data.indexOf('00:00') == -1);
		return converteDateToString(converteDataToDate(data, 'YYYY-MM-DD'), false);
	}
	return null;
}


//formata data hora com segundos
export function formataDataHora(data) {
	if (data) {
		var nums = somenteNumeros(data);
		//console.log(nums)
		if (nums) return nums.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2}).*/, '$3/$2/$1 $4:$5:$6');
	}
	return null;
}

export function formataCNPJ(valor) {
	if (valor)
		return valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5');
	else
		return null;
}

export function formataMatricula(valor) {
	var num = zerosAEsquerda(valor, 8)
	if (num)
		return num.replace(/^(\d{7})(\d{1}).*/, '$1-$2');
	else
		return null;
}

export function formataBoolean(valor) {
	if (valor===null) {
		return null;			
	 }else if ((valor) && (valor!="false")) {
		return 'Sim';
	 }else {
		return 'N&atilde;o';	
	 }
}

export function formataCertoErrado(valor) {
	if (valor===null) {
		return null;			
	 }else if ((valor) && (valor!="false")) {
		return '<i class="fa fa-check"></i>';
	 }else {
		return '<i class="fa fa-times"></i>';	
	 }
}

export function somenteNumeros(valor) {
	var saida = null;
	if (valor) {
		saida = valor.replace(/[^0-9]/g, "");
	}
	if (saida)
		return saida;
	else
		return null; //Retorna null para valores em branco.
}

export function uppercase(valor) {
	var saida = null;
	if (valor) {
		saida = valor.trim().toUpperCase();
	}
	if (saida)
		return saida;
	else
		return null; //Retorna null para valores em branco.
}

export function random(min, max, multiple) {
	if (!multiple) multiple = 1;
    return Math.round(Math.random() * (max - min) / multiple) * multiple + min;
}

export function arrayStrings(value)	{
	if (!value)	{
		return null;
	}
	return value.join(', ');
}

export function dataFormat(dataType, value, maxLength, link) {
	type = dataType ? dataType.toLowerCase() : 'text'
	let result = value;
	switch (type) {
		case 'array': result = arrayStrings(value); break;
		case 'cpf': result = formataCPF(value); break;
		case 'cpf-mascarado': result = formataCPFMascarado(value); break; 
		case 'cnpj': result = formataCNPJ(value); break; 
		case 'boolean': result = formataBoolean(value); break;
		case 'certo-errado': result = formataCertoErrado(value); break;
		case 'datetime': case 'data': case 'date': result = formataData(value); break;
		case 'datetime-seconds': case 'data-hora': result = formataDataHora(value); break;
		case 'timestamp': result = timestampToDateString(value); break;
		case 'timestamp-hora': result = timestampHoraToDateString(value); break;
		case 'percent': case 'percentual': result = formataPercentual(value); break;
		case 'decimal': result = removeZerosADireita(formataNumero(value, maxLength)); break;
		case 'money': result = formataMoeda(value); break;
		case 'money-number': case 'money-sem-cifrao': result = formataMoedaSemCifrao(value); break;
		case 'code': case 'codigo': result = zerosAEsquerda(value, maxLength); break;
		case 'url': case 'link': case 'link-externo': if (!link) {result = '<a href="' + value + '" target="_blank">' + value + '</a>'}; break;
	}
	if (link) result = '<a href="' + link + '" target="_blank">' + result + '</a>';
	return result;
}

export function highlight(id) {
	const code = document.querySelector('#' + id);
	const wrapper = document.querySelector('#' + id + '-wrapper');
	code.textContent = wrapper.innerText;
	hljs.highlightElement(code);
}
