# svelte-dotnet app template

This is what I personally derived from a lot of sources as my starter 
for dotnet+svelte apps

Consists of the default [svelte app template](https://github.com/sveltejs/template) and 
a preconfigured dotnet project, along with a matching rollup config to run.

To use, clone/degit this repo (or click "Use Template"), `npm install`, then `npm run dev`

### How to re-create this template

```
npx degit sveltejs/template <DIR>
cd <DIR>
dotnet new web --no-https
mv src svelte-app
mv public wwwroot
```

Then follow the steps [here](https://dev.to/cainux/net-core-and-svelte-f8o) to fix 
`rollup.config.js` and `Startup.cs`