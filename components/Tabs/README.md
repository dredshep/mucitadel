`Tabs` takes a `tabs` parameter that takes as many objects as `Tabs` will have children

Example:

```jsx
const tabs = {
  headers: ["Description", "Details"],
  activeClassName: "text-mupurple border-white",
  inactiveClassName: "text-secondary border-secondary"
}

<Tabs tabs={tabs}>
  <child1>
  <child2>
</Tabs>
```

`child1` will be assigned to `tabs.headers[0]`
There will be default `className`s that will be overriden by any passed parameter.
Also default `headers`, I guess, since I'm making this for a very specific purpose
`children` will have to be specified in the file in order to be more orderly.
