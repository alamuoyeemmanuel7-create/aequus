#!/bin/bash

# Install pnpm
npm install -g pnpm@9.0.0

# Install dependencies using pnpm
pnpm install --frozen-lockfile

# Build the web app
cd apps/web && pnpm build
