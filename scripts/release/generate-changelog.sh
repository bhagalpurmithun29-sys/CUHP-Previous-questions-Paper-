#!/bin/bash
set -e
VERSION=$1
echo "Generating changelog for version $VERSION..."
echo "# Release $VERSION" > CHANGELOG.md
echo "## Changes" >> CHANGELOG.md
git log $(git describe --tags --abbrev=0 2>/dev/null || echo $(git rev-list --max-parents=0 HEAD))..HEAD --oneline >> CHANGELOG.md || echo "- Initial release or no previous tags" >> CHANGELOG.md
echo "Changelog generated at CHANGELOG.md"
