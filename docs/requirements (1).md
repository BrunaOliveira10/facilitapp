# Requirements — FacilitaPDFS

## 1. Visão geral

**Nome do projeto:** FacilitaPDFS  
**Tipo:** Repositório público de PDFs e documentos voltados à leitura, pesquisa e consulta.

O FacilitaPDFS tem como objetivo facilitar a localização, o acesso e a organização de documentos em PDF. A proposta surgiu da dificuldade de encontrar determinados arquivos e da falta de organização e disponibilidade de documentos em diferentes fontes, inclusive em sites oficiais.

O sistema deverá oferecer uma interface moderna e acessível, permitindo pesquisar documentos, aplicar filtros, visualizar arquivos e realizar downloads. Também estão previstas funcionalidades relacionadas ao envio de arquivos e à criação de repositórios públicos e pessoais.

## 2. Integrantes

- Bruna de Alencar Oliveira
- Laura Vitoria dos Santos Oliveira
- Samuel Bispo dos Santos
- Pedro Henrique Rocha Castro

## 3. Público-alvo e personas

### 3.1 Público-alvo

O sistema é destinado a pessoas de todas as idades que desejam localizar, consultar, organizar ou compartilhar documentos digitais. A interface deverá priorizar facilidade de uso e acessibilidade.

### 3.2 Personas registradas

**Gabriele, 19 anos — estudante de medicina**  
Procura documentos e materiais de estudo em PDF.

**Manel, 23 anos — estudante de História**  
Utiliza a pesquisa e os filtros para encontrar documentos históricos, inclusive materiais extraoficiais sobre o governo de JK.

As personas acima representam exemplos de uso descritos nos documentos de referência; não constituem uma restrição do público-alvo.

## 4. Problema e justificativa

Encontrar documentos e arquivos digitais pode ser trabalhoso devido à indisponibilidade, à dispersão e à falta de organização dos materiais. O FacilitaPDFS pretende reduzir essa dificuldade por meio de um repositório que centralize a busca e facilite a interação com os documentos.

## 5. Requisitos funcionais

Os requisitos funcionais abaixo consolidam as funcionalidades explicitamente descritas na proposta e nos cenários de uso.

| ID | Requisito |
|---|---|
| RF01 | O sistema deve permitir pesquisar documentos e arquivos em PDF por termos informados pelo usuário. |
| RF02 | O sistema deve apresentar uma lista de documentos encontrados, com título e descrição. |
| RF03 | O sistema deve permitir filtrar os resultados da pesquisa por tópicos ou categorias. |
| RF04 | O sistema deve oferecer sugestões ou autocompletar durante a digitação da pesquisa. |
| RF05 | O sistema deve permitir visualizar um documento PDF dentro do sistema. |
| RF06 | O sistema deve permitir baixar documentos encontrados. |
| RF07 | O sistema deve permitir que o usuário salve documentos como favoritos. |
| RF08 | O sistema deve disponibilizar categorias de documentos e conteúdos. |
| RF09 | O sistema deve permitir o envio de arquivos pelos usuários. |
| RF10 | O sistema deve permitir a criação de repositórios públicos próprios. |
| RF11 | O sistema deve disponibilizar um repositório pessoal para acesso e download de documentos disponibilizados. |
| RF12 | O sistema deve apresentar recomendações de conteúdos relacionados à pesquisa e, conforme descrito na proposta, aos interesses do usuário. |
| RF13 | O sistema deve disponibilizar uma página inicial com conteúdo recomendado e acesso às principais áreas. |
| RF14 | O sistema deve informar o andamento de processos e notificar o usuário sobre sua conclusão. |

**Observação:** comentários e avaliações aparecem no cenário de Dona Maria, mas não são detalhados como funcionalidade na lista principal. Por isso, ficam registrados como possibilidade a confirmar, e não como requisito obrigatório.

## 6. Requisitos de interface

Com base na descrição do protótipo, a interface deverá conter as seguintes telas:

### 6.1 Tela inicial

- Logotipo e nome FacilitaPDFS.
- Barra de pesquisa.
- Categorias de documentos.
- PDFs recomendados.
- Menu de navegação com Início, Categorias e Favoritos.

### 6.2 Tela de pesquisa

- Barra de pesquisa.
- Lista de PDFs encontrados.
- Título e descrição dos documentos.
- Filtros de pesquisa.
- Ação para visualizar cada PDF.

### 6.3 Tela de visualização

- Nome do documento.
- Área de visualização do PDF.
- Botão de download.
- Botão de favoritos.
- Botão para voltar.

## 7. Cenários de uso

### 7.1 Busca por uma receita — Dona Maria

**Situação:** Dona Maria deseja preparar um bolo de abacaxi, mas não conhece a receita.

**Objetivo:** Encontrar a receita em PDF ou conteúdo disponibilizado pelo sistema.

**Fluxo principal:**
1. A usuária abre o FacilitaPDFS.
2. Pesquisa por receitas de bolo de abacaxi.
3. O sistema apresenta resultados relacionados e sugestões durante a digitação.
4. A usuária analisa as opções e seleciona uma delas.
5. O sistema registra o assunto como interesse, conforme descrito no cenário.

**Resultado esperado:** A usuária encontra um resultado compatível com a pesquisa.

### 7.2 Busca por um jogo — Paulo

**Situação:** Paulo deseja encontrar um jogo de cartas em PDF para imprimir.

**Objetivo:** Localizar e baixar o PDF do jogo.

**Fluxo principal:**
1. O usuário acessa a pesquisa do FacilitaPDFS.
2. Pesquisa pelo jogo desejado.
3. Analisa os resultados para confirmar se correspondem ao jogo procurado.
4. Baixa o documento.
5. Utiliza o arquivo para impressão.

**Resultado esperado:** O documento correto é encontrado e pode ser baixado para impressão.

### 7.3 Busca por novos interesses — Roberto

**Situação:** Roberto procura conteúdos variados, como artigos científicos, projetos e jogos.

**Objetivo:** Encontrar conteúdos de diferentes temas em PDF.

**Fluxo principal:**
1. O usuário abre o FacilitaPDFS.
2. Pesquisa por temas ou tipos de conteúdo de seu interesse.
3. O sistema apresenta resultados relacionados, incluindo artigos científicos, projetos e jogos.

**Resultado esperado:** O usuário encontra conteúdos em PDF relacionados aos temas pesquisados.

## 8. Requisitos de usabilidade e comportamento

- O cadastro é apontado como uma etapa potencialmente mais difícil, pois deverá seguir um processo mais rigoroso para assegurar a segurança.
- O sistema deverá apresentar notificações e telas de andamento para informar o estado dos processos.
- Quando uma pesquisa não encontrar exatamente o que o usuário procura, o sistema deverá recomendar opções próximas ao conteúdo desejado, considerando a pesquisa e os interesses registrados.
- A equipe deverá realizar testes de usabilidade e pesquisas contínuas sobre acessibilidade para verificar se os cenários correspondem às necessidades dos usuários.

## 9. Organização e navegação

A navegação apresentada no protótipo contempla três áreas principais:

- **Início:** página inicial, categorias e recomendações.
- **Categorias:** exploração de documentos por assunto.
- **Favoritos:** acesso aos documentos salvos pelo usuário.

A pesquisa também deverá permitir acessar a lista de resultados e abrir a tela de visualização de um documento.

## 10. Pontos que precisam de definição

Os documentos de referência não especificam todos os detalhes necessários para implementação. Os pontos abaixo devem ser decididos pela equipe antes ou durante o detalhamento técnico:

1. Quais formatos de arquivo, além de PDF, serão aceitos?
2. Quais campos serão exigidos no cadastro e como será feita a autenticação?
3. Quais filtros estarão disponíveis (por exemplo, categoria, tipo ou data)?
4. Como será feita a moderação dos arquivos enviados e dos repositórios públicos?
5. Quais permissões cada tipo de usuário terá para enviar, editar, baixar ou publicar documentos?
6. Como serão implementados comentários e avaliações mencionados no cenário de Dona Maria?
7. Quais critérios serão utilizados para recomendações personalizadas?
8. Quais limites de tamanho e quantidade serão aplicados aos arquivos?
9. Como serão tratados direitos autorais, privacidade e segurança dos documentos?
10. O sistema terá versões para dispositivos móveis ou será inicialmente uma aplicação web responsiva?

Esses itens são questões em aberto, não funcionalidades já confirmadas.

## 11. Rastreabilidade das fontes

Este arquivo consolida o conteúdo dos dois PDFs enviados na conversa:

- **“CenariosDeUso_FacilitaPDFS (1).pdf”** — contém a descrição do projeto, público-alvo, persona Manel, funcionalidades, cenários de uso e reflexão sobre usabilidade.
- **“A situação ta complica .pdf”** — contém a persona Gabriele, funcionalidades básicas, cenários de uso, reflexão sobre usabilidade e descrição visual das telas do protótipo.

Quando os documentos apresentam níveis diferentes de detalhe, este arquivo reúne as informações compatíveis e registra divergências ou lacunas como pontos a definir, sem tratá-las como decisões já tomadas.
