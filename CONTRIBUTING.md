# Contributing

Thanks for considering contributing to this extension!

For development, we use [DDEV](https://ddev.readthedocs.io/en/stable/). Set it up before continuing. The setup creates a database and installs TYPO3. This way you can start developing immediately.

## Preparation

```bash
# Clone repository
git clone git@github.com:maikschneider/bw_focuspoint_images.git
cd bw_focuspoint_images

# Start DDEV project
ddev start

# Install dependencies
ddev composer install
ddev npm i

# Setup TYPO3 with a prefilled database
ddev init-typo3

# Watch assets during development
ddev npm start
```

You can access the DDEV site at <https://bw-focuspoint-images.ddev.site/typo3/>.
To login you can use the username `admin` and password `Passw0rd!`.

## Code analysis and linters

```bash
# All static code analyzers
ddev composer sca

# Specific linters
ddev composer editorconfig:lint
ddev composer php:lint
ddev composer typoscript:lint
ddev composer xml:lint
ddev composer yaml:lint
ddev composer php:stan

# Fix specific issues
ddev composer php:fixer
ddev composer composer:normalize
```

## Submit a pull request

Thanks for contributing!

Once you have finished your work, please **submit a pull request** and describe
what you've done. Ideally, your PR references an issue describing the problem
you're trying to solve.

All described code quality tools are automatically executed on each pull request.
