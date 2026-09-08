#!/bin/bash
find src/components -name "*.tsx" -type f -exec sed -i \
  -e 's/bg-white/bg-white dark:bg-slate-900/g' \
  -e 's/bg-slate-50/bg-slate-50 dark:bg-slate-800/g' \
  -e 's/bg-slate-100/bg-slate-100 dark:bg-slate-800\/50/g' \
  -e 's/text-slate-900/text-slate-900 dark:text-white/g' \
  -e 's/text-slate-950/text-slate-950 dark:text-white/g' \
  -e 's/text-slate-800/text-slate-800 dark:text-slate-200/g' \
  -e 's/text-slate-700/text-slate-700 dark:text-slate-300/g' \
  -e 's/text-slate-600/text-slate-600 dark:text-slate-400/g' \
  -e 's/text-slate-500/text-slate-500 dark:text-slate-400/g' \
  -e 's/border-slate-200/border-slate-200 dark:border-slate-700/g' \
  -e 's/border-slate-100/border-slate-100 dark:border-slate-800/g' \
  -e 's/border-slate-300/border-slate-300 dark:border-slate-700/g' \
  -e 's/placeholder-slate-400/placeholder-slate-400 dark:placeholder-slate-500/g' \
  {} +
echo "Done"
