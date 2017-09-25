// Type definitions for skatejs@5.0.0-beta.3
// Project: https://github.com/skatejs/skatejs
// TypeScript Version: 2.5

// UMD library
export as namespace skate

// Public API
export { prop, props, link, define, emit, withComponent, withProps, withRender, withUnique } from './api'

// Public types ( Unfortunately TS doesn't has Opaqur Types like Flow )
export { ComponentProps, PropOptions, Renderer } from './types'
