module.exports = {
    // Specify the maximum line length.
    printWidth: 80,
  
    // Specify the number of spaces per indentation-level.
    tabWidth: 2,
  
    // Use spaces instead of tabs.
    useTabs: false,
  
    // Use single quotes instead of double quotes.
    singleQuote: true,
  
    // Change when properties in objects are quoted.
    quoteProps: 'as-needed',
  
    // Set the default trailing comma to none.
    trailingComma: 'none',
  
    // Specify HTML file parser.
    parser: 'html',
  
    // Specify the global whitespace sensitivity for HTML files.
    htmlWhitespaceSensitivity: 'ignore',
  
    // Specify which file types to process.
    // Here we're including JavaScript and TypeScript files.
    // You can add other file types as needed.
    overrides: [
      {
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        options: {
          // Set the maximum line length for code.
          printWidth: 80,
  
          // Use single quotes for JSX attributes.
          jsxSingleQuote: true,
        },
      },
    ],
  };
  