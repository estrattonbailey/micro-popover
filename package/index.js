import { tack } from 'tackjs'
import { tarry, queue } from 'tarry.js'

export default class Popover {
  constructor ({
    target,
    popover = null,
    position = 'bottom',
    transitionSpeed = 0
  }) {
    this.target = target
    this.popover = this.createPopover(popover)
    this.position = position
    this.transitionSpeed = transitionSpeed

    this.state = {
      pinned: false,
      busy: false,
      requestClose: false
    }

    this.pin = this.pin.bind(this)
    this.unpin = this.unpin.bind(this)
    this.block = this.block.bind(this)
    this.unblock = this.unblock.bind(this)
    this.isExternalClick = this.isExternalClick.bind(this)
  }

  setState (state, cb) {
    this.state = {
      ...this.state,
      ...state
    }

    cb && tarry(cb, 0)()
  }

  block () {
    this.setState({
      busy: true
    })
  }

  unblock () {
    this.setState({
      busy: false
    }, () => {
      this.state.requestClose && this.unpin()
    })
  }

  toggle () {
    this.state.pinned ? this.unpin() : this.pin()
  }

  pin () {
    if (this.state.busy || this.state.pinned) return

    this.setState({
      busy: true
    })

    const render = tarry(() => document.body.appendChild(this.popover))
    const pin = tarry(() => tack(this.popover, this.target, this.position))
    const show = tarry(() => this.popover.classList.add('is-visible'))
    const done = tarry(() => this.setState({
      busy: false,
      pinned: true
    }))

    queue(render, pin, show(0), done)()

    this.popover.addEventListener('mouseenter', this.block)
    this.popover.addEventListener('mouseleave', this.unblock)
    document.addEventListener('click', this.isExternalClick)
  }

  unpin (force) {
    this.setState({
      requestClose: true
    })

    tarry(() => {
      if (!force && (this.state.busy || !this.state.pinned)) return

      this.setState({
        busy: true
      })

      this.popover.removeEventListener('mouseenter', this.block)
      this.popover.removeEventListener('mouseleave', this.unblock)
      document.removeEventListener('click', this.isExternalClick)

      const hide = tarry(() => this.popover.classList.add('is-hiding'))
      const remove = tarry(() => document.body.removeChild(this.popover))
      const done = tarry(() => {
        this.popover.classList.remove('is-hiding')
        this.popover.classList.remove('is-visible')
        this.setState({
          busy: false,
          pinned: false,
          requestClose: false
        })
      })

      queue(hide, remove(this.transitionSpeed), done)()
    }, 0)()
  }

  isExternalClick (e) {
    if (
      (e.target !== this.popover && !this.popover.contains(e.target)) &&
      (e.target !== this.target && !this.target.contains(e.target))
    ) {
      this.unpin()
    }
  }

  createPopover (pop) {
    const popover = document.createElement('div')
    popover.className = 'micro-popover'

    typeof pop === 'string' ? popover.innerHTML = pop : popover.appendChild(pop)

    return popover
  }
}
