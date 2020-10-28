# Análise de Issues

### GitHub API (v4) | GraphQL

#### Comparativo entre os 100 repositórios de JavaScript, Python e Java mais populares (que possuem issues).

Os dados são coletados da API do GitHub, em seguida são processados (para formatações e cálculos) e finalmente salvos em um arquivo `.csv` na pasta `data`.

- Há um arquivo `repos.csv` dentro da pasta com os resultados da mineração.

Em um segundo momento, a lista de repositórios é carregada do arquivo anterior e é realizada uma nova coleta sobre cada repositório. São coletados alguns dados de todas as issues dos repositórios em um arquivo `issues.csv`.

- Há um arquivo `issues.csv` dentro da pasta `data` com os resultados da coleta.

## Instruções

#### Para baixar as dependências do projeto utilize o comando:

```bash
$ yarn
```

ou

```bash
$ npm install
```

#### Crie um arquivo `.env` na raiz do projeto e insira um valor para a variável `ACCESS_TOKEN`.

```bash
ACCESS_TOKEN=abc123token456example
```

> **OBS:** Este deve ser o seu token de acesso pessoal gerado pelo GitHub nas configurações de desenvolvedor.

#### Para iniciar a mineração dos repositórios utilize o comando:

```bash
$ yarn repos
```

ou

```bash
$ npm run repos
```

#### Para iniciar a mineração das issues utilize o comando:

```bash
$ yarn issues
```

ou

```bash
$ npm run issues
```

### Execução manual

Executando diretamente o comando de mineração (yarn mine | npm run mine) com a flag de repositórios `--repos` ou de issues `--issues` é possível passar alguns parâmetros para cada um deles.

#### Obrigatórios:

- Nome da linguagem primária dos repositórios que serão coletados (name) `only repos`
- Quantidade de repositórios que serão coletados pela linguagem (amount) `only repos`

#### Opcionais:

- Nome do arquivo `.csv` que será criado (filename) `both`
- Quantidade de registros por página (limit) `only repos`
- Nome do arquivo que contém a lista de repositórios cujas issues serão coletadas (storage) `only issues`
- Linha da lista de repositórios de onde a coleta de issues irá começar (initial) `only issues`

#### Valores padrões:

```js
name = 'JavaScript' && 'Python' && 'Java'
amount = 100

filename = 'repos' && 'issues'
limit = 100
storage = 'repos'
initial = 2
```
