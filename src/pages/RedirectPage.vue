<template>
	<div>
		<section></section>
		<article>
			<div>
				<iframe id="view-container"
					style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 10px; border: none; padding: 10px;"></iframe>
			</div>
		</article>
	</div>
</template>
<script>
export default{
	name: 'RedirectPage',
	created()	{
		console.log('href = ' + document.location.href);
		const acao = this.$route.query.acao;
		console.log('acao = ' + acao);
		let url = window.location.protocol
			+ '//' + window.location.hostname
			+ (window.location.port ? ':' + window.location.port + '/' : '/')
			+ 'ComCom/diope/comcom' + acao;
			//Template.ultimaComunicacao = acao.split('lida/')[1];
		console.log('url: ' + url);
			//App.createAuthCookie();
		$('#view-container').prop('src', url);
			//Template.exibirConteudo();
	}
}
</script>
