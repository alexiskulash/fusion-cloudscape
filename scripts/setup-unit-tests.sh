#!/bin/bash
# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

echo "Setting up unit testing dependencies for Administrative Dashboard..."

# Install required testing dependencies
npm install --save-dev \
  @testing-library/react@^14.0.0 \
  @testing-library/jest-dom@^6.1.5 \
  @testing-library/user-event@^14.5.1

echo ""
echo "✅ Testing dependencies installed!"
echo ""
echo "To run unit tests:"
echo "  npm run test:unit"
echo ""
echo "To run unit tests in watch mode:"
echo "  npm run test:unit -- --watch"
echo ""
echo "To run unit tests with coverage:"
echo "  npm run test:unit -- --coverage"
echo ""
echo "Don't forget to add this script to package.json:"
echo '  "test:unit": "jest --config jest.unit.config.js"'
echo ""
