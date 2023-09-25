declare module '*.svg' {
  const content
  export default content
}
declare module '*.png' {
  const content
  export default content
}

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.scss' {
  const content
  export default content
}
