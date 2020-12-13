import {LitElement, html, css} from 'https://cdn.skypack.dev/lit-element'
import {toPerKWh} from './formatters.js'

customElements.define('price-graph', class extends LitElement {
  static properties = {
    prices: {type: Array},
    hour: {type: Number}
  }

  constructor() {
    super()
    this.prices = []
  }

  static styles = css`
    .day-prices {
      display: flex;
      justify-content: space-between;
      list-style: none;
      padding: 0 1em;
    }
    
    li {
      display: block;
      position: relative;
      height: 100px;
      width: 3vw;
    }
        
    .price, .bar {
      position: absolute;
      bottom: 0;
      left: 0; right: 0;
      overflow: hidden;
    }
    
    .bar {
      background: lightblue;
      z-index: -1;
    }
    
    .now .bar {
      background: lightgreen;
    }
    
    .hour {
      position: absolute;
      bottom: -1.5em;
      white-space: nowrap;
      left: 0; right: 0;
      color: gray;
      font-size: 80%;
    }
  `

  render = () => html`
    <ul class="day-prices">
      ${this.prices.map((p, h) => html`
        <li class="${h === this.hour ? 'now' : ''}">
          <div class="bar" style="height: ${p}px"></div>
          <div class="price">${toPerKWh(p)}</div>
          <div class="hour">${h}</div>
        </li>
      `)}
    </ul>
  `
})