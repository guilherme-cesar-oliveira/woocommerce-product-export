# Exportador de Dados de Produtos WooCommerce

Este script é utilizado para extrair dados específicos de produtos de sites WordPress que utilizam WooCommerce. Ele permite definir os atributos personalizados que deseja exportar, bem como a URL do site e o nome da planilha gerada.

## Funcionalidades

- Busca dados de produtos de um site WooCommerce através de sua API REST.
- Permite a configuração de atributos específicos que serão extraídos para cada produto.
- Exporta os dados coletados em um arquivo Excel.

## Pré-requisitos

- Node.js instalado.
- Biblioteca `xlsx` instalada.
- Biblioteca `node-fetch` instalada.

Instale as dependências com:
```bash
npm install xlsx node-fetch
```

## Configuração

1. **Defina a URL do site:**
   - No código, ajuste a variável `base_url` para o domínio do site WooCommerce.
   ```javascript
   let base_url = "https://www.exemplo.com";
   ```

2. **Especifique os atributos desejados:**
   - Liste os nomes dos atributos que deseja extrair na variável `atributos`. 
   ```javascript
   let atributos = ["EAN", "Marca", "Código da Fábrica"];
   ```

3. **Configure o nome do arquivo de saída:**
   - Altere as variáveis `sheetName` e `fileName` para o nome da aba e do arquivo Excel gerado.
   ```javascript
   let sheetName = "Produtos";
   let fileName = "Produtos_Exportados";
   ```

## Uso

1. Execute o script com Node.js:
   ```bash
   node <nome_do_script>.js
   ```

2. O script buscará os dados dos produtos na API WooCommerce e salvará os resultados no arquivo Excel especificado.

## Estrutura do Arquivo Excel

- **Colunas:**
  - `id`: ID do produto.
  - `name`: Nome do produto.
  - `sku`: SKU do produto.
  - **Atributos personalizados**: Os atributos definidos na variável `atributos`.
  - `link`: URL do produto no site.

## Observações

- Certifique-se de que a API REST do WooCommerce está habilitada no site.
- A exportação pode levar algum tempo dependendo do número de páginas de produtos.

## Contato

Se encontrar problemas ou tiver dúvidas, entre em contato!
