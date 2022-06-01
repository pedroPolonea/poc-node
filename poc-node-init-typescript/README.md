# Poc Node Init TypeScript
Poc baseada no mini curso:
https://www.youtube.com/watch?v=M-pNDHC25Vg&list=PLE0DHiXlN_qp251xWxdb_stPj98y1auhc

### Criar projeto 

```
    npm ini -y
```

### Abir projeto no VsCode

Acessar pasta raiz
```
    code .
```

### Baixar dependências 

```
    npm i
```

### Migration 

Instalar SqlLite e configurar plugin

https://gofordeepu.medium.com/how-to-open-sqlite3-database-in-vscode-in-ubuntu-efa6c0ea0228

Executar migração

```
  npx knex --knexfile kinexfile.ts migrate:latest
```


