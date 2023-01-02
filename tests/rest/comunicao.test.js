const Comunicacao = require("../../src/rest/comunicacao");
describe('Lista comunicacoes test', () => {
    it('consumir REST com sucesso', async () => {
        /*
        const wrapper = mount(HelloWorld);
        const { vm } = wrapper;
        wrapper.setData({
            name: 'Adam',
        });
        */
        let comunicacao = new Comunicacao();

        let o = {
            'titulo': this.titulo,
            'resumo': this.resumo
        };

        let queryParams = [];
        queryParams.push('startDate');
        queryParams.push((new Date(p.dataInicio)).getTime());
        queryParams.push('endDate');
        queryParams.push((new Date(p.dataFim)).getTime());
        queryParams.push('status');
        queryParams.push(p.estado);

        await comunicacao.list(o, undefined, queryParams).then(
            (response) => {
                expect(response.code).toBe('200');
                console.log(response.data);
            }).catch((e) => {
                console.log(e);
            });
    });
});