![Dharma Relayer Kit](public/dharma_relayer_banner.png)

The Dharma Relayer Kit is the definitive starting point for anyone interested in building a
business on top of [Dharma Protocol](https://dharma.io/).

The Dharma Relayer Kit allows entrepreneurs to focus on their business, not the blockchain.

The Kit is packed with features:

-   :money_with_wings: Collect real cryptocurrency through relayer fees
-   :rocket: Deployable to Heroku out of the box
-   :art: Unstyled React components that can be easily branded
-   :computer: Only one programming language required: JavaScript

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [FAQ](#faq)
    -   [What is Dharma?](#what-is-dharma)
    -   [What is a Dharma relayer?](#what-is-a-dharma-relayer)
    -   [Why start a Dharma relayer?](#why-start-a-dharma-relayer)
    -   [What is the approval process for becoming a Dharma Relayer?](#what-is-the-approval-process-for-becoming-a-dharma-relayer)
    -   [What technical skills are required to operate a Dharma Relayer?](#what-technical-skills-are-required-to-operate-a-dharma-relayer)
    -   [Do I need to conform to any specific branding when launching a Dharma relayer?](#do-i-need-to-conform-to-any-specific-branding-when-launching-a-dharma-relayer)
-   [Getting Started](#getting-started)
    -   [Clone](#clone)
    -   [Dependencies](#dependencies)
    -   [Blockchain](#blockchain)
    -   [Backend](#backend)
    -   [Frontend](#frontend)
-   [Running on Kovan](#running-on-kovan)
    -   [Backend](#backend-1)
    -   [Frontend](#frontend-1)
-   [Deployment](#deployment)
    -   [Create a new Heroku app:](#create-a-new-heroku-app)
    -   [Set which network you want to deploy to:](#set-which-network-you-want-to-deploy-to)
    -   [Overwrite the app's files with your relayer kit:](#overwrite-the-apps-files-with-your-relayer-kit)
    -   [Open your new relayer on Heroku:](#open-your-new-relayer-on-heroku)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# FAQ

## What is Dharma?

Dharma is an open, permissionless protocol that enables anyone to engage in credit-based transactions on the Ethereum blockchain. Read more <a href="https://dharma.io/" target="_blank">here</a>.

## What is a Dharma Relayer?

A Relayer is a source of liquidity on the Dharma network. It connects borrowers with lenders.

You can think of it as a bulletin board where individuals connected on the Internet can post requests to borrow money.

## Why start a Dharma Relayer?

We imagine a world in which the majority of financial transactions occur on globally accessible blockchains.

In this new world, being a Relayer is akin to an early internet entrepreneur, providing a valuable service on the frontiers of the new economy.

## What is the approval process for becoming a Dharma Relayer?

There is no approval process for launching a Dharma Relayer. You can launch whenever you want. Dharma is **live** on the Ethereum mainnet.

## What technical skills are required to operate a Dharma Relayer?

To build a Relayer, the only programming language necessary is JavaScript.

## Do I need to conform to any specific branding when launching a Dharma relayer?

In designing the Relayer Kit, we intentionally left out any opinionated branding so that you, the entrepreneur, can conceive of and implement your own brand.

We imagine there being many relayers &mdash; each differentiated by the market they serve and the brand they build.

# Getting Started

We made getting started fast, simple and fun.

## Clone

Clone the repo to your workstation:

```
git clone https://github.com/dharmaprotocol/relayer-starter-kit.git
```

## Dependencies

To run the project, you'll first need to install the dependencies:

```
yarn
```

## Blockchain

And launch a local blockchain via:

```
yarn blockchain
```

## Backend

And launch the server via:

```
yarn server
```

## Frontend

And launch the React frontend via:

```
yarn start
```

# Running on Kovan

There is no need for running a local blockchain in this state.

## Backend

And launch the server via:

    `yarn kovan-server`

## Frontend

And launch the React frontend via:

    `yarn start-kovan`

# Deployment

Everything you need to deploy to Heroku is baked into this repo.

In your command line, make sure you're logged into heroku, and then enter the following commands:

## Create a new Heroku app:

`heroku create`

## Set which network you want to deploy to:

`heroku config:set NETWORK=kovan`

## Overwrite the app's files with your relayer kit:

`git push -f heroku master`

## Open your new relayer on Heroku:

`heroku open`
