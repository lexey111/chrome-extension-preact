# Preact Chrome extension

This project uses [Preact](https://preactjs.com/) and Typescript. 

## Installation

### Prerequisites: [Bun](https://bun.sh/docs/installation)

Install Bun (can be NPM with a minor changes):

`curl -fsSL https://bun.sh/install | bash`

### Dependencies

Install dependencies:

`bun i`

### Build

Build:

`bun run build`

### Dev server

1. `bun start`
2. open 'http://localhost:3000/'

### Usage

Install into Chrome:

1. Build with `bun run build` 
2. `Window → Extensions → Load unpacked`
3. Select `dist` folder

![install](install.png)