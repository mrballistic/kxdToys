# kxdToys Project Memory Bank

This document serves as a comprehensive reference for the kxdToys application, documenting key aspects, implementation details, and development notes.

## Project Overview

kxdToys is a Ruby on Rails application for managing toy information. It provides a simple interface for tracking toys with attributes like name, owner, and tag.

## Technical Stack

- **Framework**: Ruby on Rails 7.1.x (Upgraded from Rails 3.0.8)
- **Database**: SQLite3 1.6.x
- **Web Server**: Puma 6.4
- **Frontend**: HTML/CSS with ERB templates, Turbo, Stimulus
- **API Formats**: HTML, XML, JSON

## Upgrade Notes

The application was upgraded from Rails 3.0.8 to Rails 7.1.x in April 2025. This upgrade included:

- Updated Ruby dependencies in the Gemfile
- Modernized configuration files (application.rb, environment.rb, etc.)
- Updated model syntax from ActiveRecord::Base to ApplicationRecord
- Switched from the deprecated :hash => value syntax to the modern key: value syntax
- Added Rails 7 secure credentials system
- Implemented the modern asset pipeline
- Added Turbo and Stimulus for improved JavaScript handling
- Updated database configuration for the latest SQLite version
- Configured Puma as the web server

## Application Structure

### Models

#### Toy Model (`app/models/toy.rb`)
- **Attributes**:
  - `name` (string, required): Name of the toy
  - `owner` (string, required): Owner of the toy
  - `tag` (string, required): Category or tag for the toy  
  - `user` (string, optional): Additional user information
- **Validations**:
  - Presence of name, owner, and tag

### Controllers

#### Toys Controller (`app/controllers/toys_controller.rb`)
- Standard RESTful actions:
  - `index`: Lists all toys
  - `show`: Shows details for a specific toy
  - `new`: Form for creating a new toy
  - `create`: Creates a new toy
  - `edit`: Form for editing an existing toy
  - `update`: Updates an existing toy
  - `destroy`: Deletes a toy
- Supports multiple response formats: HTML, XML, JSON

#### Home Controller (`app/controllers/home_controller.rb`)
- Handles the main landing page and form submissions

### Views

#### Toy Views (`app/views/toys/`)
- `index.html.erb`: Lists all toys
- `show.html.erb`: Shows details for a specific toy
- `new.html.erb`: Form for creating a new toy
- `edit.html.erb`: Form for editing an existing toy
- `_form.html.erb`: Partial containing the form used by new and edit views

#### Home Views (`app/views/home/`)
- `index.html.erb`: Main landing page
- `form.html.erb`: Form for interacting with toys

### Database

#### Migration (`db/migrate/20110610194256_create_toys.rb`)
- Creates the toys table with columns:
  - `name` (string)
  - `user` (string)
  - `owner` (string)
  - `tag` (string)
  - `timestamps`

## API Endpoints

### HTML
- `GET /toys`: List all toys
- `GET /toys/new`: Form for creating a new toy
- `POST /toys`: Create a new toy
- `GET /toys/:id`: Show a specific toy
- `GET /toys/:id/edit`: Form for editing a toy
- `PUT /toys/:id`: Update a specific toy
- `DELETE /toys/:id`: Delete a specific toy

### XML & JSON
- `GET /toys.xml` or `/toys.json`: List all toys
- `GET /toys/:id.xml` or `/toys/:id.json`: Show a specific toy
- `POST /toys.xml` or `/toys.json`: Create a new toy
- `PUT /toys/:id.xml` or `/toys/:id.json`: Update a specific toy
- `DELETE /toys/:id.xml` or `/toys/:id.json`: Delete a specific toy

## Frontend Assets

The application uses a combination of:
- Rails 7 asset pipeline in `/app/assets/`
- Legacy custom CSS in `/public/css/`
- Legacy JavaScript libraries in `/public/js/`
- jQuery UI themes in `/public/css/smoothness/` and `/public/css/ui-lightness/`

## Development Notes

### Running the Application
1. Install Ruby 3.2.2 or later
2. Run `bundle install` to install dependencies
3. Run `bin/rails db:migrate` to set up the database
4. Start the server with `bin/rails server`
5. Visit `http://localhost:3000` in your browser

### Adding New Features
1. For new attributes:
   - Create a database migration
   - Update the model
   - Update the appropriate views
   - Update controller as needed

### Testing
- Tests are located in the `test` directory
- Model tests in `test/unit/toy_test.rb`
- Controller tests in `test/functional/toys_controller_test.rb`

### Deployment
- Standard Rails deployment practices apply
- Ensure database migrations are run
- Precompile assets if needed

## Future Enhancements to Consider
- Adding image upload capabilities for toys
- Implementing user authentication
- Adding search functionality
- Creating categories for better organization
- Adding pagination for the toys list

## Troubleshooting

### Common Issues
- **Database Connection Issues**: Check `config/database.yml` settings
- **Missing Dependencies**: Run `bundle install`
- **Migration Errors**: Check migration files and DB schema

## References
- Ruby documentation: https://www.ruby-lang.org/
- Rails 7 documentation: https://guides.rubyonrails.org/
- SQLite documentation: https://www.sqlite.org/