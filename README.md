# IDE

Para rodar o projeto da IDE voc6e deve estar na versão compatível do Node.JS que pode ser a v16.13.0
Após isso rodar o comando `yarn` e para iniciar o projeto `yarn dev`.

Fique atendo no arquivo `services.ts`

```
const sourcePath =
      '<AJUSTAR>/cthulu_ide/examples/hello.ms'
const destinationPath = '<AJUSTAR>/compiler/samples/hello'

'<AJUSTAR>/compiler/src/Inputer/bin/Debug/Inputer',
```

Lembre de trocar o `sourcePath` antes do `cthulu_ide/examples/hello.ms` com o path inteiro que você deseja, por exemplo
`/Users/user/.../cthulu_ide/examples/hello.ms`

O mesmo para `destinationPath`, lembrando que este será para o compilador, então antes do `compiler/samples/hello`, trocar pelo path inteiro que deseja.

E o mesmo acontece para o último, que é a execução do arquivo `.exe`

# COMPILADOR

Estar com dotnet instalado caso queira rodar o projeto, para conseguir buildar ele e executar .dll e o .exe
Entrar dentro do diretório `Inputer` e rodar `dotnet build && dotnet run`

No projeto do compilador, entrer dentro do arquivo CompilerREPL e procurar a função `LoadSubmissions` e embaixo o `currentDirectory`

Você deverá ajustar o path também.
