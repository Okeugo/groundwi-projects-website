#!/bin/bash
cat << 'CSS' >> src/index.css

@layer base {
  .dark {
    color-scheme: dark;
  }
  .dark body {
    background-color: #0f172a;
    color: #f8fafc;
  }
}
CSS
