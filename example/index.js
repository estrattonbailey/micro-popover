import Popover from '../package/dist/index.js'

window.addEventListener('DOMContentLoaded', e => {
  const left = document.getElementById('popoverParentLeft')
  const popLeft = new Popover({
    target: left,
    popover: `
      <div class="my-popover left">
        <h5 class="mv0">Left</h5>
      </div>
    `,
    position: 'left',
    transitionSpeed: 200
  })
  left.addEventListener('click', e => {
    popLeft.toggle()
  })
  // left.addEventListener('mouseleave', e => {
  //   popLeft.unpin()
  // })

//   const right = document.getElementById('popoverParentRight')
//   const popRight = new Popover({
//     target: right,
//     popover: `
//       <div class="my-popover right">
//         <h5 class="mv0">Right</h5>
//       </div>
//     `,
//     position: 'right'
//   })
//   right.addEventListener('mouseenter', e => {
//     popRight.pin()
//   })
//   right.addEventListener('mouseleave', e => {
//     popRight.unpin()
//   })

//   const top = document.getElementById('popoverParentTop')
//   const popTop = new Popover({
//     target: top,
//     popover: `
//       <div class="my-popover top">
//         <h5 class="mv0">Top</h5>
//       </div>
//     `,
//     position: 'top'
//   })
//   top.addEventListener('mouseenter', e => {
//     popTop.pin()
//   })
//   top.addEventListener('mouseleave', e => {
//     popTop.unpin()
//   })

//   const bottom = document.getElementById('popoverParentBottom')
//   const popBottom = new Popover({
//     target: bottom,
//     popover: `
//       <div class="my-popover bottom">
//         <h5 class="mv0">Bottom</h5>
//       </div>
//     `,
//     position: 'bottom'
//   })
//   bottom.addEventListener('mouseenter', e => {
//     popBottom.pin()
//   })
//   bottom.addEventListener('mouseleave', e => {
//     popBottom.unpin()
//   })
})
