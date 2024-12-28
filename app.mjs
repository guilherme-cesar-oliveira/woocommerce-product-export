import xlsx from 'xlsx';
import fetch from 'node-fetch';

// Script para exportação de dados de produtos de site WordPress que possuem WooCommerce

let base_url = "https://www.gb.com.br";

// Atributos personalizados que iremos exportar
let atributos = ["EAN", "Marca", "Código da Fábrica"];

let sheetName = "Estoque";
let fileName = "Todos os Produtos GB";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getproducts() {
    let promises = [];

    const requestOptions = {
      method: "GET"
    };

    for (let i = 1; i <= 189; i++) {
        // Espera 1 segundo antes de fazer a próxima requisição
        await delay(1000);

        let promise = fetch(`${base_url}/wp-json/wc/store/products?per_page=100&page=${i}`, requestOptions)
                        .then(response => response.json())
                        .catch(error => console.error(error));

        promises.push(promise);
    }

    // Espera que todas as promessas sejam resolvidas
    const results = await Promise.all(promises);

    // Achata o array de resultados
    return results.flat();
}

let a = await getproducts();
a = a.map(obj => {
    let atributosExtraidos = {};

    atributos.forEach(atributo => {
        let encontrado = obj.attributes.find(attr => attr.name === atributo);
        atributosExtraidos[atributo] = encontrado ? encontrado.terms[0].name : null;
    });

    let o = {
        id: obj.id,
        name: obj.name,
        sku: obj.sku,
        link: obj.permalink,
        ...atributosExtraidos
    };
    return o;
});
console.log(a);

/**
 * Exporta um array de objetos para um arquivo xlsx.
 * @param {Array} data - Array de objetos a ser exportado.
 * @param {string} sheetName - Nome da planilha.
 * @param {string} fileName - Nome do arquivo de saída.
 */
const exportToExcel = (data, sheetName, fileName) => {
    // Cria um novo livro de trabalho
    const workbook = xlsx.utils.book_new();
    
    // Converte o array de objetos em uma planilha
    const worksheet = xlsx.utils.json_to_sheet(data);
    
    // Adiciona a planilha ao livro de trabalho
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Escreve o livro de trabalho em um arquivo
    xlsx.writeFile(workbook, fileName);
};

// Exporta os dados para um arquivo Excel
exportToExcel(a, sheetName, `${fileName}.xlsx`);
