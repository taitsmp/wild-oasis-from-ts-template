Template project with

- pnpm
- vite
- react
- typescript
- VS Code

### Adding Redux

```
pnpm add  react-redux @reduxjs/toolkit
pnpm add -D @types/react-redux
pnpm add @redux-devtools/extension # optional.  Limit this to "dev only" if desired
```

1. Follow steps here - https://redux-toolkit.js.org/tutorials/typescript
2. Hook up the `Provider` in `src/main.tsx`

```
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```



#### Redux - preferred locations

##### Redux specific stuff
* store -`src/store/index.ts`
* slices - `src/store/<entity>/slice.ts`
* selectors - `src/store/<entity>/selectors.ts`

##### General stuff

* hooks - `src/hooks.ts`
* components - `src/components`
* views (or pages) - `src/views` 
* api - `src/api`



