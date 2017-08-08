# micro-popover
A tiny, fast, configurable popover in 2.5kb. [Demo](http://estrattonbailey.com/micro-popover/) 🍻

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Usage
```javascript
import Popover from 'micro-popover'

const target = document.getElementById('target')

const pop = new Popover({
  target: target,
  popover: `
    <div class="my-popover">
      <h5 class="mv0">I'm a popover!</h5>
    </div>
  `,
  position: 'left',
  transitionSpeed: 200, // for css transitions
  onChange: ({ pinned }) => {...} // boolean
})

target.addEventListener('mouseenter', pop.pin)
target.addEventListener('mouseleave', pop.unpin)
```

Required CSS:
```css
.micro-popover {
  position: absolute;
  z-index: 9999;
  top: 0; left: 0;
}
```

MIT License
