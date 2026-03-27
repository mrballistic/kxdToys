# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Setup and start
bundle install
bin/rails db:migrate
bin/rails server          # runs on port 3000
./start.sh                # runs the above three commands sequentially

# Tests
bin/rails test                                          # all tests
bin/rails test test/unit/toy_test.rb                    # single file
bin/rails test test/functional/toys_controller_test.rb  # controller tests

# Utilities
bin/rails console
bin/rails db:reset        # drop, create, migrate
```

No linting tools (RuboCop, ESLint) are configured.

## Architecture

**kxdToys** is a Rails 7.1 app (Ruby 3.2.2, SQLite3) for managing toy collections. It was upgraded from Rails 3.0.8 in April 2025.

### Data model

Single `Toy` model with fields: `name` (required), `owner` (required), `tag` (required), `user` (optional), plus timestamps. No associations.

### Request flow

- `HomeController#index` → root path, renders landing page
- `ToysController` → standard 7-action REST controller; all actions respond to HTML, JSON, and XML via `respond_to` blocks
- After create/update/destroy, redirects to `root_path` with a `?success=true` query param

### Frontend

The UI is Hotwired (Turbo + Stimulus). The Stimulus controller at `app/javascript/controllers/toys_controller.js` drives the main toy listing: it fetches `/toys.json`, renders the table client-side, and handles sorting by column. Dark/light mode is implemented via CSS variables in `public/toys.css`.

### Tests

Minitest with parallel execution. Tests live under `test/unit/` (model) and `test/functional/` (controller). Fixtures in `test/fixtures/`. Capybara + Selenium are available for system tests but none are written yet.
