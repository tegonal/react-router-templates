#!/usr/bin/env bash
#
# Test that the starter templates work *standalone* — i.e. the way they are
# consumed via `create-react-router`, with no monorepo dependency hoisting to
# mask missing dependencies.
#
# For each template it scaffolds a fresh project from the LOCAL path into a temp
# directory, installs dependencies, then runs `yarn check` and `yarn build`.
# A missing/undeclared dependency that only resolved via workspace hoisting will
# fail here, the same way it would for someone running `create-react-router`.
#
# Usage:
#   scripts/test-standalone.sh                 # test both templates
#   scripts/test-standalone.sh csr-daisyui     # test a single template
#
set -eo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

if [[ "$#" -gt 0 ]]; then
  templates=("$@")
else
  templates=(csr-daisyui ssr-daisyui)
fi

failures=""

for tpl in "${templates[@]}"; do
  src="$repo_root/packages/$tpl"
  if [[ ! -d "$src" ]]; then
    echo "✗ $tpl: no template directory at $src"
    failures="$failures $tpl"
    continue
  fi

  parent=$(mktemp -d "${TMPDIR:-/tmp}/rr-standalone.XXXXXX")
  workdir="$parent/$tpl"
  echo ""
  echo "════════ $tpl → $workdir ════════"

  ok=1
  npx --yes create-react-router@latest "$workdir" \
    --template "$src" --no-install --no-git-init --yes || ok=0

  if [[ "$ok" = 1 ]]; then
    # A freshly scaffolded template has no yarn.lock yet, so the install must be
    # allowed to create one (Yarn defaults to immutable installs under CI).
    ( cd "$workdir" && yarn install --no-immutable && yarn check && yarn build ) || ok=0
  fi

  if [[ "$ok" = 1 ]]; then
    echo "✓ $tpl: standalone install + check + build OK"
    rm -rf "$parent"
  else
    echo "✗ $tpl: FAILED — left for inspection at $workdir"
    failures="$failures $tpl"
  fi
done

echo ""
if [[ -n "$failures" ]]; then
  echo "FAILED:$failures"
  exit 1
fi
echo "✓ All templates pass standalone check + build."
